import tempfile

import arrow
from curl_cffi import requests
from django.core.files.base import ContentFile
from PIL import Image

from routechoices.core.models import PRIVACY_SECRET, Competitor, Device, Event, Map
from routechoices.lib.helpers import (
    safe64encodedsha,
    three_point_calibration_to_corners,
)
from routechoices.lib.mtb_decoder import MtbDecoder
from routechoices.lib.other_gps_services.commons import (
    CompetitorsImportError,
    EventImportError,
    MapsImportError,
    ThirdPartyTrackingSolution,
)
from routechoices.lib.tractrac_ws_decoder import TracTracWSReader


class Tractrac(ThirdPartyTrackingSolution):
    name = "TracTrac"
    slug = "tractrac"

    def parse_init_data(self, uid):
        r = requests.get(uid)
        if r.status_code != 200:
            raise EventImportError("API returned error code")
        self.init_data = r.json()

    def get_or_create_event(self, uid):
        event_name = f'{self.init_data["eventName"]} - {self.init_data["raceName"]}'
        slug = safe64encodedsha(self.init_data["raceId"])[:50]
        event, _ = Event.objects.get_or_create(
            club=self.club,
            slug=slug,
            defaults={
                "name": event_name,
                "privacy": PRIVACY_SECRET,
                "start_date": arrow.get(
                    self.init_data["raceTrackingStartTime"]
                ).datetime,
                "end_date": arrow.get(self.init_data["raceTrackingEndTime"]).datetime,
            },
        )
        return event

    def get_or_create_event_maps(self, event, uid):
        maps = []
        for map_data in self.init_data["maps"]:
            map_obj, _ = Map.objects.get_or_create(
                name=map_data.get("name"),
                club=self.club,
            )
            map_url = map_data.get("location")
            if map_url.startswith("//"):
                map_url = f"http:{map_url}"
            r = requests.get(map_url, verify=False)
            if r.status_code != 200:
                map_obj.delete()
                raise MapsImportError("API returned error code")
            try:
                map_file = ContentFile(r.content)
                with Image.open(map_file) as img:
                    width, height = img.size
                calibration_string = "|".join(
                    str(x)
                    for x in [
                        map_data["long1"],
                        map_data["lat1"],
                        map_data["x1"],
                        map_data["y1"],
                        map_data["long2"],
                        map_data["lat2"],
                        map_data["x2"],
                        map_data["y2"],
                        map_data["long3"],
                        map_data["lat3"],
                        map_data["x3"],
                        map_data["y3"],
                    ]
                )
                corners = three_point_calibration_to_corners(
                    calibration_string,
                    width,
                    height,
                )
                coordinates = ",".join([str(round(x, 5)) for x in corners])
                map_obj.image.save("imported_image", map_file, save=False)
                map_obj.width = width
                map_obj.height = height
                map_obj.corners_coordinates = coordinates
                map_obj.save()
            except Exception:
                map_obj.delete()
                raise MapsImportError("Error importing a map")
            else:
                map_obj.is_main = map_data.get("is_default_loaded")
                maps.append(map_obj)
        sorted_maps = list(sorted(maps, key=lambda obj: (not obj.is_main, obj.name)))
        return sorted_maps

    def get_or_create_event_competitors(self, event, uid):
        device_map = None
        mtb_url = self.init_data["parameters"].get("stored-uri")
        if mtb_url and isinstance(mtb_url, dict):
            mtb_url = mtb_url.get("all")
        if mtb_url and not mtb_url.startswith("tcp:") and ".mtb" in mtb_url:
            data_url = mtb_url
            if not data_url.startswith("http"):
                data_url = f"http:{data_url}"
            response = requests.get(data_url, stream=True)
            if response.status_code == 200:
                with tempfile.TemporaryFile() as lf:
                    for block in response.iter_content(1024 * 8):
                        if not block:
                            break
                        lf.write(block)
                    lf.flush()
                    lf.seek(0)
                    try:
                        device_map = MtbDecoder(lf).decode()
                    except Exception:
                        if not self.init_data["parameters"].get("ws-uri"):
                            raise CompetitorsImportError("Could not decode mtb")
        if self.init_data["parameters"].get("ws-uri") and not device_map:
            try:
                url = f'{self.init_data["parameters"].get("ws-uri")}/{self.init_data["eventType"]}?snapping=false'
                device_map = TracTracWSReader().read_data(url)
            except Exception:
                raise CompetitorsImportError("Could not decode ws data")
        if not device_map:
            raise CompetitorsImportError("Did not figure out how to get data")

        competitors = []
        for c_data in self.init_data["competitors"].values():
            st = c_data.get("startTime")
            if not st:
                st = self.init_data["raceTrackingStartTime"]
            dev_id = c_data["uuid"]
            dev_obj = None
            dev_data = device_map.get(dev_id)
            competitor, _ = Competitor.objects.get_or_create(
                name=c_data["name"],
                short_name=c_data["nameShort"],
                event=event,
            )
            competitor.start_time = arrow.get(st).datetime
            if dev_data:
                dev_obj, created = Device.objects.get_or_create(
                    aid="TRC_" + safe64encodedsha(f"{dev_id}:{uid}")[:8],
                    defaults={
                        "is_gpx": True,
                    },
                )
                if not created:
                    dev_obj.locations_series = []
                dev_obj.add_locations(dev_data)
                dev_obj.save()
                competitor.device = dev_obj
            competitor.save()
            competitors.append(competitor)
        return competitors
