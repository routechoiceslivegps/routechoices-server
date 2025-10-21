import asyncio
import socket

from asgiref.sync import sync_to_async
from django.db import connection
from django.test import TransactionTestCase
from tornado.iostream import IOStream
from tornado.testing import AsyncTestCase, bind_unused_port, gen_test

from routechoices.core.models import Device, ImeiDevice
from routechoices.lib.tcp_protocols.gt06 import GT06Server
from routechoices.lib.tcp_protocols.h02 import H02Server
from routechoices.lib.tcp_protocols.mictrack import MicTrackServer
from routechoices.lib.tcp_protocols.queclink import QueclinkServer
from routechoices.lib.tcp_protocols.tmt250 import TMT250Server
from routechoices.lib.tcp_protocols.tracktape import TrackTapeServer
from routechoices.lib.tcp_protocols.xexun import XexunServer
from routechoices.lib.tcp_protocols.xexun2 import Xexun2Server


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
    async def test_mictrack_v1(self):
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
    async def test_mictrack_v2(self):
        gps_data = b"MT;6;866425031361423;R0;10+190109091803+22.63823+114.02923+2.14+69+2+3744+113"
        gps_data2 = b"MT;6;866425031361423;R0;10+190109091802+22.63822+114.02922+2.14+69+2+3744+113"

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

    @gen_test
    async def test_xexun2(self):
        gps_data_with_pos = [
            "faaf00140a5a3520220082287830005ed8e101005b64622880401b001482060864cc2296f840daa22aa884f008c87483c291efddc4f09fc2f49db3c058ef68005a9abe1ae8299d6449bac4e984e0c1d6baa8469d265ff2b60100cc00080000fb2e0013572a3600000002000000000000faaf",
            "FAAF00140004352022008228783000AFB7D203003800380038F9608A7B801E0060820205788A205DF523D97844FDB90443D37844FDB90465CFB4FBF946B0E8CEF639095803F8CC00000002350000004000FA608A7BA81E0060820205788A205DF523D97844FDB90443D2F639095803F8CFB4FBF946B0E8CE7844FDB90465CD00000002350000004000FB608A7BD01E0060820205788A205DF523D97844FDB90443D2F639095803F8CFB4FBF946B0E8CE7844FDB90465CD00000002350000004000FAAF",
            "faaf0014000235202200822878300032f2b001002f4260b0d6a0008019104a3378323130333135317c323130333132303100704020308715758089502023015648643670faaf",
            "FAAF0014000435202200822878300035E6D2010032FC60EC264D00002003000000020205444E6DD72699D674427F7712CBC3BCF2AFD910BAC1C6FBE474CFC7A9B4FBE474CFC7A6FAAF",
            "FAAF00140CF13520220082287830002BF2DD0200130013D360EFD7F514006402010D46322C4A450BA026D460EFD7FA14006402010D46322C4A450BA026FAAF",
            "FAAF0014000C3520220082287830002DF3A001002A0062D9047400005E0280001E47001B400D4BA732DF505E40B4153AAF78FEF00109000000000042B36666FAAF",
        ]
        nb_new_pos_expected = [0, 0, 0, 0, 2, 1]

        server = client = None
        device = await create_imei_device("352022008228783")
        sock, port = bind_unused_port()
        server = Xexun2Server()
        server.add_socket(sock)
        client = IOStream(socket.socket())
        await client.connect(("localhost", port))

        nb_pos = 0
        for gps_data, nb_new_pos in zip(gps_data_with_pos, nb_new_pos_expected):
            await client.write(bytes.fromhex(gps_data))
            await asyncio.sleep(0.05)
            nb_pos += nb_new_pos
            device = await refresh_device(device)
            self.assertEqual(device.location_count, nb_pos)

        if server is not None:
            server.stop()
        if client is not None:
            client.close()

    @gen_test
    async def test_h02_binary(self):
        gps_data_with_pos = [
            "2435248308410000901047591808172627335900074412294E024138FEFFFFFFFF01120064BA73005ECC",
            "24352483084121532131081504419390060740418306000000fffffbfdff0015060000002c02dc0c000000001f",
            "2435248308410850240512192350143206090249758e000001ffffbbff00bdf0900000000001d60161cc4b9a35",
            "2435248308412059572807175137358006000183640e000000fffffbfdff001f080000000000ea1e0000000021",
            "2435248308410127171003170520046500100286297e003085ffffdfffff03440069129344006400001151415a20",
            "2435248308411245431311165035313006004318210e000000fffffbffff0024",
            "2435248308412133391406135002584900014337822e000000ffffffffff0000",
            "2435248308412134091406135002584900014337822e000000ffffffffff0000",
            "24352483084101234020031910125482600612695044000000ffffbbff000000000000000001760d04e2c9934d",
            "2435248308410503162209022212874500113466574C014028fffffbffff0000",
            "2435248308410831250401145047888000008554650e000000fffff9ffff001006000000000106020299109c01",
            "24352483084120321418041423307879000463213792000056fffff9ffff0000",
            "2435248308411222470112142233983006114026520E000000FFFFFBFFFF0014060000000001CC00262B0F170A",
            "24352483084105201916101533335008000073206976000000effffbffff000252776566060000000000000000000049",
        ]
        nb_new_pos_expected = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]

        server = client = None
        device = await create_imei_device("352483084100009")
        sock, port = bind_unused_port()
        server = H02Server()
        server.add_socket(sock)
        client = IOStream(socket.socket())
        await client.connect(("localhost", port))

        nb_pos = 0
        for gps_data, nb_new_pos in zip(gps_data_with_pos, nb_new_pos_expected):
            await client.write(bytes.fromhex(gps_data))
            await asyncio.sleep(0.05)
            nb_pos += nb_new_pos
            device = await refresh_device(device)
            self.assertEqual(device.location_count, nb_pos)

        if server is not None:
            server.stop()
        if client is not None:
            client.close()

    @gen_test
    async def test_h02_text(self):
        gps_data_with_pos = [
            "*HQ,3524830841,V6,002926,V,3514.4088,N,9733.2842,W,0.00,0.00,151222,FFF7FBFF,310,260,32936,13641,8944501311217563382F,#",
            "*HQ,3524830841,V1,105759,A,37573392,S,145037022,E,000.00,173,280122,FF7FFBFF,,,9059e2c,8232,4#",
            "*HQ,3524830841,V1,104000,A,2235.1777,N,11357.8913,E,000.27,235,130721,FFFFFBFF,460,11,d18e105,7752,6#",
            "*HQ,352483084100009,HTBT,100#",
            "*HQ,3524830841,V5,091233,V,2348.8912,N,09021.3302,E,000.00,000,051219,FFFFBBFF,470,01,21019,2033,2921283#",
            "*HQ,352483084100009,HTBT#",
            "*HQ,352483084100009,V1,132926,A,1935.3933,N,07920.4134,E,  3.34,342,280519,FFFFFFFF#",
            "*hq,352483084100009,VP1,V,470,002,92,3565,0Y92,19433,30Y92,1340,29#",
            "*HQ,352483084100009,V2,100220,0,5238.26259,N,00507.33983,E,0.25,0,280917,FFFFFFFF,cc,28,  db,d75b#",
            "*HQ,,V1,173212,A,2225.78879,S,02829.19021,E,0.00,0,290418,FFFFFBFF#",
            "*HQ,352483084100009,VI1,075146,0,5238.25900,N,00507.33429,E,0.54,0,250917,FFFFFFFF,cc,28,  db,d75b#",
            "*HQ,352483084100009,V1,,V,,N,,E,0.00,0,,FFFFF7FF,f0,a,11a0,c0c6#",
            "*hq,352483084100009,VP1,A,2702.7245,S,15251.9311,E,0.48,0.0000,080917#",
            "*HQ,3524830841,V19,214452,A,5201.0178,N,01830.5029,E,000.00,000,200417,,195.63.13.195,89480610500392633029,BFFFFBFF#",
            "*HQ,352483084100009,XT,1,100#",
            "*HQ,352483084100009,V3,044855,28403,01,001450,011473,158,-62,0292,0,X,030817,FFFFFBFF#",
            "*HQ,3524830841,#",
            "*HQ,3524830841,V1,104000,A,-22-35.1777,N,-113-57.8913,E,000.27,235,130722,FFFFFBFF,460,11,d18e105,7752,6#",
        ]
        nb_new_pos_expected = [0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1]
        need_to_read = [0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1]
        server = client = None
        device = await create_imei_device("352483084100009")
        sock, port = bind_unused_port()
        server = H02Server()
        server.add_socket(sock)
        client = IOStream(socket.socket())
        await client.connect(("localhost", port))

        nb_pos = 0
        for gps_data, nb_new_pos, reading in zip(
            gps_data_with_pos, nb_new_pos_expected, need_to_read
        ):
            await client.write(gps_data.encode())
            await asyncio.sleep(0.05)
            nb_pos += nb_new_pos
            device = await refresh_device(device)
            self.assertEqual(device.location_count, nb_pos)
            if reading:
                client.read_bytes(255, partial=True)

        if server is not None:
            server.stop()
        if client is not None:
            client.close()
