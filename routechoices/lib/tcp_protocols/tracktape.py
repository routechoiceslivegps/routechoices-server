import json

import arrow

from routechoices.lib.helpers import random_key, safe64encode
from routechoices.lib.tcp_protocols.commons import (
    GenericTCPServer,
    add_locations,
    get_device_by_imei,
)
from routechoices.lib.validators import validate_imei


class TrackTapeConnection:
    def __init__(self, stream, address, logger):
        print(f"received a new connection from {address} on tracktape port")
        self.aid = random_key()
        self.imei = None
        self.address = address
        self.stream = stream
        self.stream.set_close_callback(self._on_close)
        self.db_device = None
        self.logger = logger

    async def process_identification(self, imei):
        if self.imei and imei != self.imei:
            raise Exception("Cannot change IMEI")
        validate_imei(imei)
        self.db_device = await get_device_by_imei(imei)
        if not self.db_device.user_agent:
            self.db_device.user_agent = "TrackTape"
        if not self.db_device:
            raise Exception("Imei not registered")
        self.imei = imei
        print(f"{self.imei} is connected")

    async def start_listening(self):
        print(f"Start listening from {self.address}")
        while True:
            imei = None
            try:
                data_raw = ""
                while not data_raw:
                    data_bin = await self.stream.read_until(b"\n")
                    data_raw = data_bin.decode("ascii").strip()
                print(f"Received data ({data_raw})", flush=True)
                data = json.loads(data_raw)
                imei = data["id"]
            except Exception as e:
                print(f"Could not read data {e}", flush=True)
                self.stream.close()
                return
            try:
                await self.process_identification(imei)
            except Exception as e:
                print(f"Could not identify device {e}", flush=True)
                self.stream.close()
                return
            self.logger.info(
                f"TRCKTP DATA, {self.aid}, {self.address}, {self.imei}: {safe64encode(json.dumps(data))}"
            )
            try:
                await self.process_data(data)
            except Exception as e:
                print(f"Could not parse location {e}", flush=True)
                self.stream.close()
                return

    async def process_data(self, data):
        try:
            battery_level = int(data.get("batteryLevel"))
        except Exception:
            pass
        else:
            self.db_device.battery_level = battery_level

        locs = data.get("positions", [])
        loc_array = []
        for loc in locs:
            try:
                tim = arrow.get(loc.get("timestamp")).int_timestamp
                lon = float(loc.get("lon"))
                lat = float(loc.get("lat"))
            except Exception:
                continue
            else:
                loc_array.append((tim, lat, lon))
        if loc_array:
            await add_locations(self.db_device, loc_array)
            print(f"{len(loc_array)} locations wrote to DB", flush=True)

    def _on_close(self):
        print("Client quit", flush=True)


class TrackTapeServer(GenericTCPServer):
    connection_class = TrackTapeConnection
