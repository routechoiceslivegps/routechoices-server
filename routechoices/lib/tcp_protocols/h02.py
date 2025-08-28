import re

import arrow

from routechoices.lib import luhn
from routechoices.lib.helpers import random_key, safe64encode
from routechoices.lib.tcp_protocols.commons import (
    GenericConnection,
    GenericTCPServer,
    add_locations,
    save_device,
)

BINARY_PROTOCOL = "$"
TEXT_PROTOCOL = "*"
# Regex based on Traccar's pattern to handle various message formats
# It captures key groups for different message types (V1, NBR, HTBT etc.)
H02_STR_PATTERN = re.compile(
    r"^\*..,"  # Manufacturer
    r"(\d+?),"  # IMEI (Group 1)
    r"([^,]+?),"  # Command (Group 2)
    r"(.*)"  # Rest of the data (Group 3)
    r"#?$"  # Optional terminator
)


def parse_h02_latlon(
    lat_raw: str, lon_raw: str, ns: str, ew: str
) -> tuple[float, float]:
    """
    Parse H02 latitude and longitude format to decimal degrees.

    The H02 protocol provides coordinates in DDMM.MMMM (latitude) and
    DDDMM.MMMM (longitude) format. This function converts them to standard
    decimal degree representation.

    Args:
        lat_raw: The raw latitude string (e.g., "5213.1234").
        lon_raw: The raw longitude string (e.g., "02100.5678").
        ns: The north/south indicator ("N" or "S").
        ew: The east/west indicator ("E" or "W").

    Returns:
        A tuple containing the latitude and longitude as floats.
    """
    """ TODO: Handle all the date format possible in H02 format
    -(d+)-(d+.d+),([NS]),
    (d+)(dd.d+),([NS]),
    (d+)(dd)(d{4}),([NS]),
    """

    lat_deg = int(float(lat_raw) / 100)
    lat_min = float(lat_raw) % 100
    lat = lat_deg + (lat_min / 60)
    if ns == "S":
        lat *= -1

    lon_deg = int(float(lon_raw) / 100)
    lon_min = float(lon_raw) % 100
    lon = lon_deg + (lon_min / 60)
    if ew == "W":
        lon *= -1

    return lat, lon


class H02Connection(GenericConnection):
    """
    Handles a single device connection using the H02 protocol.

    Each instance of this class manages the lifecycle of a TCP connection
    from a GPS device, including reading data, parsing packets, and
    updating the database.
    """

    protocol_name = "H02"

    def __init__(self, stream, address, logger):
        """
        Initialize the H02 connection handler.
        """
        print(f"H02 - New connection from {address}")
        self.aid = random_key()
        self.imei = None
        self.address = address
        self.stream = stream
        self.stream.set_close_callback(self._on_close)
        self.db_device = None
        self.logger = logger

    async def _parse_v1_packet(self, imei, data):
        """Parses the main location packet (V1 command)."""
        parts = data.split(",")
        # Standard location packets have a specific length
        if len(parts) < 12:
            return

        time_raw = parts[0]
        gps_status = parts[1]
        lat_raw, ns = parts[2], parts[3]
        lon_raw, ew = parts[4], parts[5]
        # speed_raw = parts[6]
        # course_raw = parts[7]
        date_raw = parts[8]

        if gps_status != "A":
            print(
                f"H02 - {self.imei} sent data with invalid GPS fix. Location not saved.",
                flush=True,
            )
            return

        if not self.imei:
            raise Exception(f"Data from unknown device ({self.address})")

        # Handle battery level if present (often the last field)
        if len(parts) >= 15:
            try:
                battery_level = min(max(0, int(parts[14])), 100)
                self.db_device.battery_level = battery_level
                await save_device(self.db_device)
            except (ValueError, IndexError):
                pass  # Ignore if battery level is not valid

        date_str = f"20{date_raw[4:6]}-{date_raw[2:4]}-{date_raw[0:2]}T{time_raw[0:2]}:{time_raw[2:4]}:{time_raw[4:6]}Z"
        lat, lon = parse_h02_latlon(lat_raw, lon_raw, ns, ew)

        loc_array = [(arrow.get(date_str).timestamp(), lat, lon)]
        await add_locations(self.db_device, loc_array)
        print(f"H02 - {self.imei} wrote 1 locations to DB", flush=True)

    async def _parse_heartbeat_packet(self, imei, data):
        """Parses a heartbeat packet (HTBT command)."""
        # Example: *HQ,IMEI,HTBT,97#
        parts = data.split(",")
        if not self.imei:
            await self.process_identification(imei)
            if not self.db_device:
                return

        try:
            battery_level = min(max(0, int(parts[0])), 100)
            self.db_device.battery_level = battery_level
            await save_device(self.db_device)
            print(f"H02 - HEARTBEAT from {imei}, Battery: {battery_level}%")
        except (ValueError, IndexError):
            print("H02 - Could not parse battery from heartbeat")

    async def start_listening(self):
        """
        Start the main loop to listen for and process incoming data.
        """
        print(f"H02 - Listening from {self.address}")

        while True:
            try:
                data_bin = await self.stream.read_bytes(1)
                protocol = data_bin.decode("ascii", errors="ignore").strip()
                if protocol == BINARY_PROTOCOL:
                    continue
                elif protocol == TEXT_PROTOCOL:
                    data_bin += await self.stream.read_until(b"#")
                else:
                    raise Exception("Invalid protocol")
            except Exception:
                self.stream.close()
                return

            if not data_bin:
                continue

            if protocol == TEXT_PROTOCOL:
                # Text Protocol
                try:
                    data_str = data_bin.decode("ascii", errors="ignore").strip()
                except UnicodeDecodeError:
                    print(
                        f"H02 - Could not decode data from {self.address}", flush=True
                    )
                    continue
                match = H02_STR_PATTERN.match(data_str)
                if not match:
                    print(f"H02 - Unrecognized packet format: {data_str}")
                    continue

                imei, command, data = match.groups()
                try:
                    if len(imei) == 10:
                        imei = luhn.append(f"{imei:0<14}")
                    await self.process_identification(imei)
                except Exception:
                    print(
                        f"H02 - Error parsing identification data ({self.address})",
                        flush=True,
                    )
                    self.stream.close()
                    return

                self.logger.info(
                    f"H02 CONN, {self.aid}, {self.address}: {safe64encode(data_bin)}"
                )

                try:
                    if (
                        command.startswith("V")
                        and command[1:].isdigit()
                        and command[1:] != "3"
                    ):
                        await self._parse_v1_packet(imei, data)
                        # TODO: Send response
                    elif command in ("V0", "HTBT"):
                        await self._parse_heartbeat_packet(imei, data)
                        # TODO: Send response
                    # TODO: Handle VP1
                    else:
                        print(
                            f"H02 - Received unhandled command '{command}' from {imei}"
                        )
                except Exception as e:
                    print(f"H02 - Error parsing data ({self.address}): {e}", flush=True)
            else:
                # Binary Protocol
                ...


class H02Server(GenericTCPServer):
    """
    A TCP server for handling H02 protocol connections.
    """

    connection_class = H02Connection
