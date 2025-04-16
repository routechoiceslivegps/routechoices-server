import re

import arrow

from routechoices.lib.helpers import random_key
from routechoices.lib.tcp_protocols.commons import (
    GenericTCPServer,
    add_locations,
    get_device_by_imei,
)
from routechoices.lib.validators import validate_imei


class XexunConnection:
    def __init__(self, stream, address, logger):
        print(f"Xexun - New connection from {address}")
        self.aid = random_key()
        self.imei = None
        self.address = address
        self.stream = stream
        self.stream.set_close_callback(self._on_close)
        self.db_device = None
        self.logger = logger

    async def process_identification(self, imei):
        if self.imei:
            if imei != self.imei:
                raise Exception("Cannot change IMEI")
            else:
                return
        validate_imei(imei)
        self.db_device = await get_device_by_imei(imei)
        if not self.db_device.user_agent:
            self.db_device.user_agent = "Xexun ARM"
        if not self.db_device:
            raise Exception("Imei not registered")
        self.imei = imei
        print(f"Xexun - {self.imei} is connected")

    async def start_listening(self):
        print(f"Xexun - listening from {self.address}")
        while True:
            imei = None
            try:
                data_raw = ""
                while not data_raw:
                    data_bin = await self.stream.read_bytes(255, partial=True)
                    data_raw = data_bin.decode("ascii", "ignore")
                    data_raw = re.search(r"G[PN]RMC,.+", data_raw).group(0)
                imei = re.search(r"imei:(\d+)(,.*)?$", data_raw).group(1)
            except Exception as e:
                print(f"Xexun - Error parsing data ({e})", flush=True)
                self.stream.close()
                return

            try:
                await self.process_identification(imei)
            except Exception as e:
                print(f"Xexun - Could not identify device ({e})", flush=True)
                self.stream.close()
                return
            self.logger.info(
                f"XEXUN DATA, {self.aid}, {self.address}, {self.imei}: {data_raw}"
            )
            try:
                await self.process_data(data_raw)
            except Exception as e:
                print(f"Xexun - Could not parse data ({e})", flush=True)
                self.stream.close()
                return

    async def process_data(self, data_raw):
        data = data_raw.split(",")
        if data[2] != "A":
            return

        tim = arrow.get(f"{data[9]} {data[1][:6]}", "DDMMYY HHmmss").int_timestamp
        lat_minute = float(data[3])
        lat = lat_minute // 100 + (lat_minute % 100) / 60
        if data[4] == "S":
            lat *= -1
        lon_minute = float(data[5])
        lon = lon_minute // 100 + (lon_minute % 100) / 60
        if data[6] == "W":
            lon *= -1

        await add_locations(self.db_device, [(tim, lat, lon)])
        print(f"Xexun - {self.imei} wrote 1 locations to DB", flush=True)

    def _on_close(self):
        print("Xexun - Client quit", flush=True)


class XexunServer(GenericTCPServer):
    connection_class = XexunConnection
