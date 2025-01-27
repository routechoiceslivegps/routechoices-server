import re
from struct import pack, unpack

import arrow

from routechoices.lib.crc_itu import crc16
from routechoices.lib.helpers import random_key, safe64encode
from routechoices.lib.tcp_protocols.commons import (
    GenericTCPServer,
    add_locations,
    get_device_by_imei,
    save_device,
)
from routechoices.lib.validators import validate_imei


class GT06Connection:
    def __init__(self, stream, address, logger):
        print(f"Received a new connection from {address} on gt06 port")
        self.aid = random_key()
        self.imei = None
        self.address = address
        self.stream = stream
        self.stream.set_close_callback(self._on_close)
        self.db_device = None
        self.logger = logger

    async def start_listening(self):
        print(f"Start listening from {self.address}")

        while True:
            try:
                data_bin = b""
                while not data_bin:
                    data_bin = await self.stream.read_until(b"\r\n", 65536)
            except Exception:
                self.stream.close()
                return

            header = data_bin[:2]
            if header not in (b"\x78\x78", b"\x79\x79"):
                print(f"Unknown protocol ({header})")
                self.stream.close()
                return

            if header == b"\x79\x79":
                try:
                    await self.decode_extented(data_bin)
                except Exception:
                    print(f"Error parsing data ({self.address})", flush=True)
                    self.stream.close()
                    return
                continue

            data_type = data_bin[3]

            if data_type == 0x01:
                # IDENTIFICATION
                try:
                    await self.process_identification(data_bin)
                except Exception:
                    print(
                        f"Error parsing identification data ({self.address})",
                        flush=True,
                    )
                    self.stream.close()
                    return
            elif data_type in (0x12, 0x16):
                # LOCATION OR ALARM DATA
                try:
                    await self.process_data(data_bin)
                except Exception:
                    print(f"Error parsing data ({self.address})", flush=True)
                    self.stream.close()
                    return
            elif data_type == 0x13:
                # HEARTBEAT
                try:
                    await self.process_heartbeat(data_bin)
                except Exception:
                    print(f"Error parsing heartbeat data ({self.address})", flush=True)
                    self.stream.close()
                    return
            else:
                self.logger.info(f"Unknown data type {data_type.to_bytes()}: {safe64encode(data_bin)}")

    async def decode_extented(self, data):
        if not self.imei:
            raise Exception(f"Data from unknown device ({self.address})")
        self.logger.info(
            f"GT06 DATA, {self.aid}, {self.address}, {self.imei}: {safe64encode(data)}"
        )
        data_type = data[4]
        offset = 5

        if data_type == 0x70:
            while offset < len(data) - 6:
                pck_type = data[offset : offset + 2]
                pck_len = unpack(">H", data[offset + 2 : offset + 4])[0]
                if pck_type == b"\x00\x33":
                    pck_data = data[offset : offset + 4 + pck_len]
                    ts = unpack(">I", pck_data[4:8])[0]
                    lat_bin = pck_data[11:15]
                    lon_bin = pck_data[15:19]
                    flags = pck_data[20]
                    north = flags & 0x4
                    west = flags & 0x8

                    lat = unpack(">I", lat_bin)[0] / 60 / 30000
                    if not north:
                        lat *= -1
                    lon = unpack(">I", lon_bin)[0] / 60 / 30000
                    if west:
                        lon *= -1
                    loc_array = [(ts, lat, lon)]
                    await add_locations(self.db_device, loc_array)
                    print("1 locations wrote to DB", flush=True)

                offset += 4 + pck_len
        elif data_type in (0x32, 0x33):
            pck_data = data[offset:]
            date_bin = pck_data[0:6]
            year, month, day, hours, minutes, seconds = unpack(">BBBBBB", date_bin)
            year += 2000
            date_str = (
                f"{year}-{month:02}-{day:02}T{hours:02}:{minutes:02}:{seconds:02}Z"
            )

            serial_number = pck_data[-6:-4]
            data_to_send = b"\x00\x05" + data_type.to_bytes() + serial_number
            checksum = pack(">H", crc16(data_to_send))
            await self.stream.write(b"\x79\x79" + data_to_send + checksum + b"\r\n")
            if pck_data[6] == 0x00:
                return

            lat_bin = pck_data[8:12]
            lon_bin = pck_data[12:16]
            flags = pck_data[17]

            north = flags & 0x4
            west = flags & 0x8

            lat = unpack(">I", lat_bin)[0] / 60 / 30000
            if not north:
                lat *= -1

            lon = unpack(">I", lon_bin)[0] / 60 / 30000
            if west:
                lon *= -1
            loc_array = [(arrow.get(date_str).timestamp(), lat, lon)]
            await add_locations(self.db_device, loc_array)
            print("1 locations wrote to DB", flush=True)
        elif data_type == 0x21:
            pck_data = data[offset + 5 : -6]
            datatxt = ""
            if data[offset + 4] == 0x01:
                datatxt = pck_data.decode("ascii")
            else:
                datatxt = pck_data.decode("utf-16be")
            if locmatch := re.match(
                r"^Current position!Lat:([NS])(\d+\.\d+),Lon:([WE])(\d+\.\d+),Course:\d+\.\d+,Speed:\d+\.\d+,DateTime:(\d{4}-\d{2}-\d{2}) +(\d{2}:\d{2}:\d{2})$",
                datatxt,
            ):
                north = locmatch.group(1) == "N"
                lat = float(locmatch.group(2))
                if not north:
                    lat = -lat
                west = locmatch.group(3) == "W"
                lon = float(locmatch.group(4))
                if west:
                    lon = -lon
                date_str = f"{locmatch.group(5)}T{locmatch.group(6)}Z"
                loc_array = [(arrow.get(date_str).timestamp(), lat, lon)]
                await add_locations(self.db_device, loc_array)
                print("1 locations wrote to DB", flush=True)

    async def process_identification(self, data_bin):
        self.logger.info(
            f"GT06 CONN, {self.aid}, {self.address}: {safe64encode(data_bin)}"
        )
        imei = data_bin[4:12].hex()[1:]
        if self.imei:
            if imei != self.imei:
                raise Exception("Cannot change IMEI")
            else:
                return
        validate_imei(imei)
        self.db_device = await get_device_by_imei(imei)
        if not self.db_device:
            raise Exception("Imei not registered")
        if not self.db_device.user_agent:
            self.db_device.user_agent = "GT06"
        self.imei = imei
        print(f"{self.imei} is connected")
        serial_number = data_bin[12:14]
        data_to_send = b"\x05\x01" + serial_number
        checksum = pack(">H", crc16(data_to_send))
        await self.stream.write(b"\x78\x78" + data_to_send + checksum + b"\r\n")

    async def process_heartbeat(self, data_bin):
        if not self.imei:
            raise Exception(f"Heartbeat from unknown device ({self.address})")
        self.logger.info(
            f"GT06 DATA, {self.aid}, {self.address}, {self.imei}: {safe64encode(data_bin)}"
        )
        battery_level = int(min(100, data_bin[5] * 100 / 6))

        serial_number = data_bin[9:11]
        data_to_send = b"\x05\x13" + serial_number

        checksum = pack(">H", crc16(data_to_send))
        await self.stream.write(b"\x78\x78" + data_to_send + checksum + b"\r\n")
        self.db_device.battery_level = battery_level
        await save_device(self.db_device)

    async def process_data(self, data_bin):
        if not self.imei:
            raise Exception(f"Data from unknown device ({self.address})")
        self.logger.info(
            f"GT06 DATA, {self.aid}, {self.address}, {self.imei}: {safe64encode(data_bin)}"
        )
        date_bin = data_bin[4:10]
        lat_bin = data_bin[11:15]
        lon_bin = data_bin[15:19]
        flags = data_bin[20]

        north = flags & 0x4
        west = flags & 0x8

        year, month, day, hours, minutes, seconds = unpack(">BBBBBB", date_bin)
        year += 2000
        date_str = f"{year}-{month:02}-{day:02}T{hours:02}:{minutes:02}:{seconds:02}Z"
        lat = unpack(">I", lat_bin)[0] / 60 / 30000
        if not north:
            lat *= -1

        lon = unpack(">I", lon_bin)[0] / 60 / 30000
        if west:
            lon *= -1

        loc_array = [(arrow.get(date_str).timestamp(), lat, lon)]
        await add_locations(self.db_device, loc_array)
        print("1 locations wrote to DB", flush=True)

    def _on_close(self):
        print("Client quit", flush=True)


class GT06Server(GenericTCPServer):
    connection_class = GT06Connection
