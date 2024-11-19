from struct import pack, unpack

from tornado.iostream import StreamClosedError

from routechoices.lib.helpers import random_key, safe64encode
from routechoices.lib.tcp_protocols.commons import (
    GenericTCPServer,
    add_locations,
    get_device_by_imei,
    send_sos,
)
from routechoices.lib.validators import validate_imei


class TMT250Decoder:
    def __init__(self):
        self.packet = {}
        self.battery_level = None
        self.alarm_triggered = False

    def generate_response(self, success=True):
        s = self.packet["num_data"] if success else 0
        return pack(">i", s)

    def decode_alv(self, data):
        self.packet["zeroes"] = unpack(">i", data[:4])[0]
        if self.packet["zeroes"] != 0:
            raise Exception("zeroes should be 0")
        self.packet["length"] = unpack(">i", data[4:8])[0]
        self.packet["codec"] = data[8]
        if self.packet["codec"] != 8:
            raise Exception("codec should be 8")
        self.packet["num_data"] = data[9]
        self.extract_records(data)
        return self.packet

    def extract_records(self, buffer):
        remaining_data = self.packet["num_data"]
        self.packet["records"] = []
        pointer = 10
        self.alarm_triggered = False
        while remaining_data > 0:
            timestamp = unpack(">Q", buffer[pointer : pointer + 8])[0] / 1e3
            lon = unpack(">i", buffer[pointer + 9 : pointer + 13])[0] / 1e7
            lat = unpack(">i", buffer[pointer + 13 : pointer + 17])[0] / 1e7
            n1 = buffer[pointer + 26]
            pointer += 27
            for i in range(n1):
                avl_id = buffer[pointer + i * 2]
                if avl_id == 113:
                    self.battery_level = buffer[pointer + 1 + i * 2]
                if avl_id == 236:
                    self.alarm_triggered = buffer[pointer + 1 + i * 2]
            pointer += n1 * 2

            n2 = buffer[pointer]
            pointer += 1 + 3 * n2

            n4 = buffer[pointer]
            pointer += 1 + 5 * n4

            n8 = buffer[pointer]
            pointer += 1 + 9 * n8
            self.packet["records"].append(
                {
                    "timestamp": timestamp,
                    "latlon": [lat, lon],
                }
            )
            remaining_data -= 1
        return pointer


class TMT250Connection:
    def __init__(self, stream, address, logger):
        print(f"Received a new connection from {address} on teltonika port")
        self.aid = random_key()
        self.imei = None
        self.address = address
        self.stream = stream
        self.stream.set_close_callback(self._on_close)
        self.decoder = TMT250Decoder()
        self.packet_len = 0
        self.buffer = None
        self.db_device = None
        self.logger = logger

    async def parse_imei(self, data):
        imei_len = (data[0] << 8) + data[1]
        imei = ""
        is_valid_imei = True
        try:
            imei = data[2:17].decode("ascii")
            validate_imei(imei)
            if self.imei:
                if imei != self.imei:
                    raise Exception("Cannot change IMEI")
                else:
                    return
        except Exception:
            is_valid_imei = False
        if imei_len != len(imei) or not is_valid_imei:
            print(
                f"invalid identification {self.address}, {imei}, {imei_len}", flush=True
            )
            await self.stream.write(b"\x00")
            self.stream.close()
            return

        self.db_device = await get_device_by_imei(imei)
        if not self.db_device:
            print(f"imei {imei} not registered ({self.address})", flush=True)
            await self.stream.write(b"\x00")
            self.stream.close()
            return

        self.imei = imei
        await self.stream.write(b"\x01")
        self.logger.info(
            f"TMT250 CONN, {self.aid}, {self.address}, {self.imei}: {safe64encode(bytes(data))}"
        )
        print(f"{self.imei} is connected", flush=True)

    async def start_listening(self):
        print("Start listening from", self.address)

        while True:
            try:
                data = bytearray(b"\x00" * 2048)
                data_len = await self.stream.read_into(data, partial=True)
                if self.imei:
                    print(f"{self.imei} is sending {data_len} bytes")
                    self.logger.info(
                        f"TMT250 DATA, {self.aid}, {self.address}, {self.imei}: "
                        f"{safe64encode(bytes(data[:data_len]))}"
                    )
                else:
                    print(f"{self.address} is sending {data_len} bytes")

                if data_len == 1 and data[0] == b"\xff":
                    print("heartbeat", flush=True)
                elif data_len > 2:
                    imei_len = (data[0] << 8) + data[1]
                    if imei_len > 0:
                        await self.parse_imei(data[:17])
                    else:
                        await self.decode_data(data)
            except StreamClosedError:
                break

    async def decode_data(self, data):
        if not self.imei:
            pass
        zeroes = unpack(">i", data[:4])[0]
        if zeroes != 0:
            return
        self.packet_length = unpack(">i", data[4:8])[0] + 4
        self.buffer = bytes(data)
        await self._on_full_data()

    def _on_close(self):
        print("Client quit", self.address)

    async def _on_full_data(self):
        try:
            decoded = self.decoder.decode_alv(self.buffer)
        except Exception:
            print("error decoding packet")
            await self.stream.write(self.decoder.generate_response(False))
        else:
            loc_array = []
            for r in decoded.get("records", []):
                loc_array.append((int(r["timestamp"]), r["latlon"][0], r["latlon"][1]))
            if not self.db_device.user_agent:
                self.db_device.user_agent = "Teltonika"
            if self.decoder.battery_level:
                self.db_device.battery_level = self.decoder.battery_level
            await add_locations(self.db_device, loc_array)
            print(f"{len(loc_array)} locations wrote to DB", flush=True)
            self.waiting_for_content = True
            if self.decoder.alarm_triggered:
                sos_device_aid, sos_lat, sos_lon, sos_sent_to = await send_sos(
                    self.db_device
                )
                print(
                    f"SOS triggered by device {sos_device_aid}, {sos_lat}, {sos_lon}"
                    f" email sent to {sos_sent_to}",
                    flush=True,
                )
            await self.stream.write(self.decoder.generate_response())


class TMT250Server(GenericTCPServer):
    connection_class = TMT250Connection
