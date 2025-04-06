import asyncio
import socket

from asgiref.sync import sync_to_async
from django.db import connection
from django.test import TransactionTestCase
from tornado.iostream import IOStream
from tornado.testing import AsyncTestCase, bind_unused_port, gen_test

from routechoices.core.models import Device, ImeiDevice
from routechoices.lib.tcp_protocols.gt06 import GT06Server
from routechoices.lib.tcp_protocols.mictrack import MicTrackServer
from routechoices.lib.tcp_protocols.queclink import QueclinkServer
from routechoices.lib.tcp_protocols.tmt250 import TMT250Server
from routechoices.lib.tcp_protocols.tracktape import TrackTapeServer
from routechoices.lib.tcp_protocols.xexun import XexunServer


@sync_to_async
def create_imei_device(imei):
    device = Device.objects.create()
    ImeiDevice.objects.create(imei=imei, device_id=device.id)
    connection.close()
    return device


@sync_to_async
def refresh_device(device):
    device.refresh_from_db()
    connection.close()
    return device


class TCPConnectionsTest(AsyncTestCase, TransactionTestCase):
    @gen_test
    async def test_gt06(self):
        init_data = bytes.fromhex("78780D010860201061588748000199990d0a")
        ack_init = bytes.fromhex("787805010001d9dc0d0a")
        heartbeat_data = bytes.fromhex("787813134402040002000199990d0a")
        ack_heartbeat = bytes.fromhex("787805130001e9f10d0a")

        gps_data_needing_ack = [
            [
                "7979004a321106170c1b180cc900a875580b7ab4f00010350901fe0a007c0009112424007c000912240081004efe2100c500100f1200000000000000000000000000000000000000000000bc7c900d0a",
                "797900053200bcedd10d0a",
            ],
        ]
        gps_data_with_pos = [
            "7878121011091c0b1b2999058508040097a89e0034520d0a",
            "78781511170103100e1f9904efe30400a97f88003410ffdd000d0a",
            "78781f120f0a140e150bc505e51e780293a9e800540000f601006e0055da00035f240d0a",
            "787821121303120b2524c70138e363085b549003d43301940057d200cd52c000006aa1ca0d0a",
            "787821161303120b2525c70138e363085b549003d43301940057d200cd52c000006aa1ca0d0a",
            "78782222120616083817c5050cc8c801a819d600152400e8011dbf003332000000004862500d0a",
            "7878251610051b0f1c34c5022515d504b5dcd20738080902d4022bdf009cba5006640201006759680d0a",
            "7878252612030C063816C3026C10540C38C9700144030901CC002866000EEE0C06040302000DA2DB0D0A",
            "78782e2416061a103600c80275298404a0a24000184602d4023a49006f060104ed01940000086508004139765000be7d640d0a",
            "7878353714080d05000ac500a886eb0b7522f000100001fe0a05ea004f1b000001002e0400002328003b0217c0003c0401020001002c468a0d0a",
            "78783c3439000000120a0902093a07031f9e690529be2e00155500000016214901a30308b70000b3fb004aa82b059401a3422100000001000000007d9370b90d0a",
            "7878471e0e03110b0511c501c664fd074db73f0218a602e003433a002fed40433a0056e14e433a0056104e433a0056fd53433a002eed55433a007e4b57433a002ee25aff00020120f6720d0a",
            "787840a2180b0f0f3407cf00602cd208354064001c6a02dc650000698100000000095674c9114100002a04000100004b31000000000863829079286793020001a22a8f0d0a",
            "797900a87000000001020035000100003300125d62bf3a0800e804b5994308814a87001d5d00340006115d62bf29000011000a012e02620000000000000001000803537601000129800002000803102608593397620003000a8901260852293397626600180002017d002b000116002c00045d6278ea0009000108000a00010b002800010b002e00040000f0c1002a00010000290004000000be0030000a000100b4000a00b402d00006c5490d0a",
            "7979007121000000000143757272656e7420706f736974696f6e214c61743a4e35342e3733393333322c4c6f6e3a4532352e3237333237302c436f757273653a3132362e35332c53706565643a302e303030302c4461746554696d653a323031372d30352d3236202031303a32373a3437000bbee30d0a",
        ]

        server = client = None
        device = await create_imei_device("860201061588748")
        sock, port = bind_unused_port()
        server = GT06Server()
        server.add_socket(sock)
        client = IOStream(socket.socket())
        await client.connect(("localhost", port))
        await client.write(init_data)
        data = await client.read_bytes(255, partial=True)
        self.assertEqual(data, ack_init)
        await client.write(heartbeat_data)
        data = await client.read_bytes(255, partial=True)
        self.assertEqual(data, ack_heartbeat)

        nb_positions = 0
        for gps_data, ack_data in gps_data_needing_ack:
            await client.write(bytes.fromhex(gps_data))
            nb_positions += 1
            await asyncio.sleep(0.05)
            data = await client.read_bytes(255, partial=True)
            self.assertEqual(data, bytes.fromhex(ack_data))
            device = await refresh_device(device)
            self.assertEqual(device.location_count, nb_positions)

        for gps_data in gps_data_with_pos:
            await client.write(bytes.fromhex(gps_data))
            nb_positions += 1
            await asyncio.sleep(0.05)
            device = await refresh_device(device)
            self.assertEqual(device.location_count, nb_positions)

        if server is not None:
            server.stop()
        if client is not None:
            client.close()

    @gen_test
    async def test_mictrack(self):
        gps_data = b"#867198059727390#MT710#0000#AUTO#1\r\n#38$GPRMC,123318.00,A,2238.8946,N,11402.0635,E,,,100124,,,A*5C\r\n##"
        gps_data2 = b"#867198059727390#MT710#0000#AUTO#1\r\n#38$GPRMC,123319.00,A,2238.8946,N,11402.0635,E,,,100124,,,A*5C\r\n##"

        server = client = None
        device = await create_imei_device("867198059727390")
        sock, port = bind_unused_port()
        server = MicTrackServer()
        server.add_socket(sock)
        client = IOStream(socket.socket())
        await client.connect(("localhost", port))
        await client.write(gps_data)
        await asyncio.sleep(0.05)
        device = await refresh_device(device)
        self.assertEqual(device.location_count, 1)
        await client.write(gps_data2)
        await asyncio.sleep(0.05)
        device = await refresh_device(device)
        self.assertEqual(device.location_count, 2)
        if server is not None:
            server.stop()
        if client is not None:
            client.close()

    @gen_test
    async def test_mictrack_alt(self):
        gps_data = b"MT;6;866425031361423;R0;10+190109091803+22.63827+114.02922+2.14+69+2+3744+113"
        gps_data2 = b"MT;6;866425031361423;R0;10+190109091804+22.63828+114.02923+2.14+69+2+3744+113"

        server = client = None
        device = await create_imei_device("866425031361423")
        sock, port = bind_unused_port()
        server = MicTrackServer()
        server.add_socket(sock)
        client = IOStream(socket.socket())
        await client.connect(("localhost", port))
        await client.write(gps_data)
        await asyncio.sleep(0.05)
        device = await refresh_device(device)
        self.assertEqual(device.location_count, 1)
        await client.write(gps_data2)
        await asyncio.sleep(0.05)
        device = await refresh_device(device)
        self.assertEqual(device.location_count, 2)
        if server is not None:
            server.stop()
        if client is not None:
            client.close()

    @gen_test
    async def test_queclink(self):
        hbt_data = b"+ACK:GTHBD,C30203,860201061588748,,20240201161532,FFFF$"
        ack_data = b"+SACK:GTHBD,C30203,FFFF$"
        gps_data = b"+BUFF:GTFRI,8020040200,860201061588748,,12194,10,1,3,0.0,0,20.1,-71.596533,-33.524718,20240201161533,0730,0001,772A,052B253E,02,0,0.0,,,,,0,420000,,,,20230926200340,1549$"
        battery_data = b"+RESP:GTINF,020102,860201061588748,,41,898600810906F8048812,16,0,0,0,,4.10,0,0,0,0,,020240201161534,69,,,+0800,0,20100214093254,11F0$"
        server = client = None
        device = await create_imei_device("860201061588748")
        sock, port = bind_unused_port()
        server = QueclinkServer()
        server.add_socket(sock)
        client = IOStream(socket.socket())
        await client.connect(("localhost", port))
        await client.write(hbt_data)
        data = await client.read_bytes(255, partial=True)
        self.assertEqual(data, ack_data)
        await client.write(gps_data)
        await asyncio.sleep(0.05)
        device = await refresh_device(device)
        self.assertEqual(device.location_count, 1)
        await client.write(battery_data)
        await asyncio.sleep(0.05)
        device = await refresh_device(device)
        self.assertEqual(device.battery_level, 69)
        if server is not None:
            server.stop()
        if client is not None:
            client.close()

    @gen_test
    async def test_teltonika(self):
        init_data = bytes.fromhex("000f333536333037303432343431303133")
        ack_data = b"\x01"
        gps_data = bytes.fromhex(
            "00000000000000FE080400000113fc208dff000f33353633303730343234343130313304030101150316030001460000015d0000000113fc17610b000f14ffe0209cc580006e00c00500010004030101150316010001460000015e0000000113fc284945000f150f00209cd200009501080400000004030101150016030001460000015d0000000113fc267c5b000f150a50209cccc0009300680400000004030101150016030001460000015b0004"
        )

        server = client = None
        device = await create_imei_device("356307042441013")
        sock, port = bind_unused_port()
        server = TMT250Server()
        server.add_socket(sock)
        client = IOStream(socket.socket())
        await client.connect(("localhost", port))
        await client.write(init_data)
        data = await client.read_bytes(255, partial=True)
        self.assertEqual(data, ack_data)
        await client.write(gps_data)
        await asyncio.sleep(0.05)
        device = await refresh_device(device)
        self.assertEqual(device.location_count, 4)
        if server is not None:
            server.stop()
        if client is not None:
            client.close()

    @gen_test
    async def test_tracktape(self):
        gps_data = b'{"id":"352022008228783","guid":"B01633000","batteryLevel":55,"inst":"start","positions":[{"timestamp":1706872596,"lat":60.455,"lon":18.567},{"timestamp":1706872597,"lat": 60.4555,"lon": 18.5675}]}\n'
        gps_data2 = b'{"id":"352022008228783","guid":"B01633000","batteryLevel":55,"inst":"start","positions":[{"timestamp":1706872598,"lat":60.455,"lon":18.567}]}\n'

        server = client = None
        device = await create_imei_device("352022008228783")
        sock, port = bind_unused_port()
        server = TrackTapeServer()
        server.add_socket(sock)
        client = IOStream(socket.socket())
        await client.connect(("localhost", port))
        await client.write(gps_data)
        await asyncio.sleep(0.05)
        device = await refresh_device(device)
        self.assertEqual(device.location_count, 2)
        await client.write(gps_data2)
        await asyncio.sleep(0.05)
        device = await refresh_device(device)
        self.assertEqual(device.location_count, 3)
        if server is not None:
            server.stop()
        if client is not None:
            client.close()

    @gen_test
    async def test_xexun(self):
        gps_data_with_pos = [
            b"0711011831,+8613145826126,GPRMC,103148.000,A,2234.0239,N,11403.0765,E,0.00,,011107,,,A*75,F,imei:352022008228783,101\x8d",
            b"GPRMC,113518.000,A,5303.4150,N,10.2368,E,60.73,207.42,260216,00,0000.0,A*74,F,,imei:352022008228783,",
            b"090805215127,+22663173122,GPRMC,215127.083,A,4717.3044,N,01135.0005,E,0.39,217.95,050809,,,A*6D,F,, imei:352022008228783,05,552.4,F:4.06V,0,141,54982,232,01,1A30,0949",
        ]

        server = client = None
        device = await create_imei_device("352022008228783")
        sock, port = bind_unused_port()
        server = XexunServer()
        server.add_socket(sock)
        client = IOStream(socket.socket())
        await client.connect(("localhost", port))

        nb_pos = 0
        for gps_data in gps_data_with_pos:
            await client.write(gps_data)
            nb_pos += 1
            await asyncio.sleep(0.05)
            device = await refresh_device(device)
            self.assertEqual(device.location_count, nb_pos)

        if server is not None:
            server.stop()
        if client is not None:
            client.close()
