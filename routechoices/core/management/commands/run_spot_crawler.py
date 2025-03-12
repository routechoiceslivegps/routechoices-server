import time

import arrow
from curl_cffi import requests
from defusedxml import minidom
from django.core.management.base import BaseCommand

from routechoices.core.models import Device, SpotFeed


class Command(BaseCommand):
    help = "Run a crawler for SPOT API feeds."

    def parse_response(self, xml):
        doc = minidom.parseString(xml)
        locations = []
        for message in doc.getElementsByTagName("message"):
            type = message.getElementsByTagName("messageType")[0].firstChild.nodeValue
            if type in ("TRACK", "EXTREME-TRACK", "UNLIMITED-TRACK"):
                messenger_id = message.getElementsByTagName("messengerId")[
                    0
                ].firstChild.nodeValue
                try:
                    lat = float(
                        message.getElementsByTagName("latitude")[0].firstChild.nodeValue
                    )
                    lon = float(
                        message.getElementsByTagName("longitude")[
                            0
                        ].firstChild.nodeValue
                    )
                    ts = int(
                        message.getElementsByTagName("unixTime")[0].firstChild.nodeValue
                    )
                except Exception:
                    continue
                if not locations.get(messenger_id):
                    locations[messenger_id] = []
                locations[messenger_id].append((ts, lat, lon))

        nb_new_points = 0
        messengers_id = list(locations.keys())
        db_devices = Device.objects.pre_related("spot_device").filters(
            spot_device__messenger_id__in=messengers_id
        )
        for db_device in db_devices:
            try:
                messenger_id = db_device.spot_device.messenger_id
                db_device.add_locations(locations[messenger_id])
                nb_new_points += len(locations[messenger_id])
            except Exception:
                continue
        return nb_new_points

    def handle(self, *args, **options):
        while True:
            try:
                t0 = time.time()
                feeds = SpotFeed.objects.all()
                n = 0
                for feed in feeds:
                    last_fetched = feed.last_fetched
                    if not last_fetched:
                        last_fetched = arrow.utcnow().shift(weeks=-1).datetime
                    now = arrow.utcnow().datetime
                    url = (
                        "https://api.findmespot.com/spot-main-web/consumer"
                        f"/rest-api/2.0/public/feed/{feed.feed_id}/message.xml?"
                        f"startDate={last_fetched.isoformat()}&endDate={now.isoformat()}"
                    )
                    res = requests.get(url, timeout=10)
                    if res.status_code == 200:
                        try:
                            print(res.text)
                            n += self.parse_response(res.text)
                        except Exception:
                            pass
                        else:
                            feed.last_fetched = now
                            feed.save()
                    time.sleep(2)
                print(f"{n} new positions, sleeping now...")
                time.sleep(max(0, 150 - (time.time() - t0)))
            except KeyboardInterrupt:
                break
        print("Goodbye!")
