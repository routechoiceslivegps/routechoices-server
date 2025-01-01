import json
import math
import urllib.parse
from io import BytesIO

import arrow
import cairosvg
from curl_cffi import requests
from django.core.files.base import ContentFile
from PIL import Image, ImageDraw

from routechoices.core.models import PRIVACY_SECRET, Competitor, Device, Event, Map
from routechoices.lib.helpers import initial_of_name, project, safe64encodedsha
from routechoices.lib.other_gps_services.commons import (
    EventImportError,
    MapsImportError,
    ThirdPartyTrackingSolution,
)


class Livelox(ThirdPartyTrackingSolution):
    slug = "livelox"
    name = "Livelox"
    HEADERS = {
        "content-type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    }

    def parse_init_data(self, uid):
        details = dict(urllib.parse.parse_qsl(uid))

        class_ids = []
        class_id = details.get("classId")
        if class_id:
            class_ids = [int(class_id)]

        relay_legs = []
        relay_leg = details.get("relayLeg")
        if relay_leg:
            relay_legs = [int(relay_leg)]

        post_data = json.dumps(
            {
                "classIds": class_ids,
                "courseIds": [],
                "relayLegs": relay_legs,
                "relayLegGroupIds": [],
            }
        )
        r = requests.post(
            "https://www.livelox.com/Data/ClassInfo",
            data=post_data,
            headers=self.HEADERS,
        )
        if r.status_code != 200:
            raise EventImportError(f"Can not fetch class info data {r.status_code}")
        self.init_data = r.json().get("general", {})

        post_data = json.dumps(
            {
                "classIds": class_ids,
                "courseIds": [],
                "relayLegs": relay_legs,
                "relayLegGroupIds": [],
                "includeMap": True,
                "includeCourses": True,
            }
        )
        r = requests.post(
            "https://www.livelox.com/Data/ClassBlob",
            data=post_data,
            headers=self.HEADERS,
            timeout=60,
        )
        if r.status_code != 200:
            raise EventImportError("Can not fetch class blob data")
        self.init_data["xtra"] = r.json()
        self.init_data["relay_leg"] = int(relay_leg) if relay_leg else ""
        self.init_data["class_id"] = int(class_id)
        self.uid = uid

    def get_or_create_event(self):
        event_name = (
            f"{self.init_data['class']['event']['name']} - "
            f"{self.init_data['class']['name']}"
        )
        relay_leg = self.init_data["relay_leg"]
        if relay_leg:
            name = ""
            for leg in self.init_data["class"]["relayLegs"]:
                if leg.get("leg") == relay_leg:
                    name = leg["name"]
                    break
            else:
                name = f"#{relay_leg}"
            event_name += f" - {name}"

        event_start = arrow.get(
            self.init_data["class"]["event"]["timeInterval"]["start"]
        ).datetime
        event_end = arrow.get(
            self.init_data["class"]["event"]["timeInterval"]["end"]
        ).datetime
        slug = str(self.init_data["class_id"])
        if relay_leg:
            slug += f"-{relay_leg}"
        event, _ = Event.objects.get_or_create(
            club=self.club,
            slug=slug,
            defaults={
                "name": event_name,
                "start_date": event_start,
                "end_date": event_end,
                "privacy": PRIVACY_SECRET,
            },
        )
        return event

    def get_or_create_event_maps(self, event):
        try:
            map_data = self.init_data["xtra"]["map"]
            map_bounds = map_data["boundingQuadrilateral"]["vertices"]
            map_url = map_data["url"]
            map_resolution = map_data["resolution"]
        except Exception:
            raise MapsImportError("Could not extract basic map info")
        courses = []
        # first determine the course for this leg if is relay
        relay_leg = self.init_data["relay_leg"]
        if relay_leg:
            course_ids = []
            groups = self.init_data["class"]["relayLegGroups"]
            for group in groups:
                if relay_leg in group["relayLegs"]:
                    course_ids += [c["id"] for c in group["courses"]]
            for course in self.init_data["xtra"]["courses"]:
                if course["id"] in course_ids:
                    courses.append(course)
        else:
            courses = self.init_data["xtra"]["courses"]

        map_obj = Map(
            name=event.name,
        )
        coordinates = [f"{b['latitude']},{b['longitude']}" for b in map_bounds[::-1]]
        map_obj.corners_coordinates = ",".join(coordinates)

        r = requests.get(map_url)
        if r.status_code != 200:
            raise MapsImportError("Could not download image")

        img_blob = ContentFile(r.content)
        map_obj.image.save("imported_image", img_blob, save=False)

        im = Image.open(img_blob)
        width, height = im.size
        map_obj.width = width
        map_obj.height = height

        course_maps = []
        for course in courses:
            for i, course_img_data in enumerate(course.get("courseImages")):
                course_bounds = course_img_data["boundingPolygon"]["vertices"]
                coordinates = [
                    f"{b['latitude']},{b['longitude']}" for b in course_bounds[::-1]
                ]
                course_url = course_img_data["url"]

                course_map = Map(name=f"Course {i+1}")
                course_map.corners_coordinates = ",".join(coordinates)

                r = requests.get(course_url)
                if r.status_code != 200:
                    raise MapsImportError("Could not download image")

                out = BytesIO()
                cairosvg.svg2png(
                    bytestring=r.content, write_to=out, unsafe=True, scale=4
                )

                img_blob = ContentFile(out.getbuffer())

                course_map.image.save("imported_image", img_blob, save=False)

                im = Image.open(img_blob)
                width, height = im.size
                course_map.width = width
                course_map.height = height
                course_maps.append(course_map)
            if not course.get("courseImages"):
                upscale = 4
                map_drawing = Image.new(
                    "RGBA",
                    (map_obj.width * upscale, map_obj.height * upscale),
                    (255, 255, 255, 0),
                )
                draw = ImageDraw.Draw(map_drawing)
                route = course["controls"]
                map_resolution *= route[0]["control"]["mapScale"] / 15000
                circle_size = int(40 * map_resolution) * upscale
                line_width = int(8 * map_resolution) * upscale
                line_color = (185, 42, 247, 180)
                ctrls = [
                    map_obj.wsg84_to_map_xy(
                        c["control"]["position"]["latitude"],
                        c["control"]["position"]["longitude"],
                    )
                    for c in route
                ]
                for i, ctrl in enumerate(ctrls[:-1]):
                    if ctrl[0] == ctrls[i + 1][0]:
                        ctrl[0] -= 0.0001
                    pt = ctrl
                    next_pt = ctrls[i + 1]
                    angle = math.atan2(next_pt[1] - pt[1], next_pt[0] - pt[0])
                    if i == 0:
                        # draw start triangle
                        draw.line(
                            [
                                int(pt[0] * upscale + circle_size * math.cos(angle)),
                                int(pt[1] * upscale + circle_size * math.sin(angle)),
                                int(
                                    pt[0] * upscale
                                    + circle_size * math.cos(angle + 2 * math.pi / 3)
                                ),
                                int(
                                    pt[1] * upscale
                                    + circle_size * math.sin(angle + 2 * math.pi / 3)
                                ),
                                int(
                                    pt[0] * upscale
                                    + circle_size * math.cos(angle - 2 * math.pi / 3)
                                ),
                                int(
                                    pt[1] * upscale
                                    + circle_size * math.sin(angle - 2 * math.pi / 3)
                                ),
                                int(pt[0] * upscale + circle_size * math.cos(angle)),
                                int(pt[1] * upscale + circle_size * math.sin(angle)),
                            ],
                            fill=line_color,
                            width=line_width,
                            joint="curve",
                        )
                    # draw line between controls
                    draw.line(
                        [
                            int(pt[0] * upscale + circle_size * math.cos(angle)),
                            int(pt[1] * upscale + circle_size * math.sin(angle)),
                            int(next_pt[0] * upscale - circle_size * math.cos(angle)),
                            int(next_pt[1] * upscale - circle_size * math.sin(angle)),
                        ],
                        fill=line_color,
                        width=line_width,
                    )
                    # draw controls
                    draw.ellipse(
                        [
                            int(next_pt[0] * upscale - circle_size),
                            int(next_pt[1] * upscale - circle_size),
                            int(next_pt[0] * upscale + circle_size),
                            int(next_pt[1] * upscale + circle_size),
                        ],
                        outline=line_color,
                        width=line_width,
                    )
                    # draw finish
                    if i == (len(ctrls) - 2):
                        inner_circle_size = int(30 * map_resolution) * upscale
                        draw.ellipse(
                            [
                                int(next_pt[0] * upscale - inner_circle_size),
                                int(next_pt[1] * upscale - inner_circle_size),
                                int(next_pt[0] * upscale + inner_circle_size),
                                int(next_pt[1] * upscale + inner_circle_size),
                            ],
                            outline=line_color,
                            width=line_width,
                        )
                out_buffer = BytesIO()
                params = {
                    "dpi": (72, 72),
                }
                map_drawing.save(out_buffer, "PNG", **params)
                f_new = ContentFile(out_buffer.getvalue())
                course_map = Map(name=f"Course {i+1}")
                course_map.corners_coordinates = map_obj.corners_coordinates
                course_map.image.save("imported_image", f_new, save=False)
                course_map.width = map_drawing.width
                course_map.height = map_drawing.height
                course_maps.append(course_map)
        map_obj = map_obj.merge(*course_maps)
        map_obj.club = self.club
        map_obj.save()
        return [map_obj]

    def get_or_create_event_competitors(self, event):
        participant_data = [
            d for d in self.init_data["xtra"]["participants"] if d.get("routeData")
        ]
        time_offset = 22089888e5
        map_projection = self.init_data["xtra"]["map"].get("projection")
        if map_projection:
            matrix = (
                map_projection["matrix"][0]
                + map_projection["matrix"][1]
                + map_projection["matrix"][2]
            )
        competitors = []
        for p in participant_data:
            c_name = f"{p.get('firstName')} {p.get('lastName')}"
            c_sname = initial_of_name(c_name)
            competitor, _ = Competitor.objects.get_or_create(
                name=c_name,
                short_name=c_sname,
                event=event,
            )
            pts = []
            if not p.get("routeData"):
                continue
            p_data64 = p["routeData"]
            d = LiveloxBase64Reader(p_data64)
            pts_raw = d.readWaypoints()
            for pt in pts_raw:
                if map_projection:
                    px, py = project(matrix, pt[1] / 10, pt[2] / 10)
                    latlon = event.map.map_xy_to_wsg84(px, py)
                    pts.append(
                        (int((pt[0] - time_offset) / 1e3), latlon["lat"], latlon["lon"])
                    )
                else:
                    pts.append(
                        (int((pt[0] - time_offset) / 1e3), pt[1] / 1e6, pt[2] / 1e6)
                    )
            dev_obj, created = Device.objects.get_or_create(
                aid="LLX_" + safe64encodedsha(f"{p['id']}:{self.uid}")[:8], is_gpx=True
            )
            if not created:
                dev_obj.location_series = []
            if pts:
                dev_obj.add_locations(pts)
                dev_obj.save()
                competitor.device = dev_obj
            competitor.save()
            competitors.append(competitor)
        return competitors


class LiveloxBase64Reader:
    base64util = {
        "usableBitsPerByte": 6,
        "headerBits": 8,
        "numberToLetter": (
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
        ),
        "pow2": [0] * 64,
        "bitLengthMaxValues": [0] * 65,
        "letterToNumber": {},
    }
    for i in range(64):
        base64util["pow2"][i] = 2**i
    for i in range(1, 65):
        base64util["bitLengthMaxValues"][i] = (
            base64util["bitLengthMaxValues"][i - 1] + base64util["pow2"][i - 1]
        )
    for i, letter in enumerate(base64util["numberToLetter"]):
        base64util["letterToNumber"][letter] = i
    base64util["letterToNumber"]["="] = 0

    def __init__(self, data):
        self.length = len(data)
        self.byte_array = [0] * self.length
        self.current_byte_pos = 0
        self.current_bit_pos = 0
        self.bits_read_in_current_byte = 0
        self.next_bit_position = None
        self.next_bits_read_in_current_byte = None
        self.byte = None
        self.value = None
        self.bits_left_to_read = None
        self.i = None
        self.bytes_read = None
        self.header = None

        for i in range(self.length):
            self.byte_array[i] = self.base64util["letterToNumber"][data[i]]

    def read_n_bits(self, n):
        self.value = 0
        self.bits_left_to_read = self.bits_read_in_current_byte + n
        self.bytes_read = 0
        while self.bits_left_to_read > 0:
            self.bits_left_to_read -= 6
            self.bytes_read += 1
        self.next_bit_position = self.current_bit_pos + n
        self.next_bits_read_in_current_byte = self.next_bit_position % 6
        self.i = 0
        while self.i < self.bytes_read:
            self.byte = self.byte_array[self.i + self.current_byte_pos]
            if self.i == 0:
                self.byte &= self.base64util["bitLengthMaxValues"][
                    6 - self.bits_read_in_current_byte
                ]
            if self.i < self.bytes_read - 1:
                self.value += (
                    self.base64util["pow2"][
                        (self.bytes_read - self.i - 1) * 6
                        - (
                            0
                            if self.next_bits_read_in_current_byte == 0
                            else (6 - self.next_bits_read_in_current_byte)
                        )
                    ]
                    * self.byte
                )
            else:
                if self.next_bits_read_in_current_byte > 0:
                    self.byte >>= 6 - self.next_bits_read_in_current_byte
                self.value += self.byte
            self.i += 1
        self.current_bit_pos = self.next_bit_position
        self.bits_read_in_current_byte = self.next_bits_read_in_current_byte
        self.current_byte_pos += (
            self.bytes_read
            if self.bits_read_in_current_byte == 0
            else (self.bytes_read - 1)
        )
        return self.value

    def read_value(self):
        self.header = self.read_n_bits(8)
        return (
            (-1 if (self.header & 2) else 1)
            * (1e3 if (self.header & 1) else 1)
            * self.read_n_bits(self.header >> 2)
        )

    def readWaypoints(self):
        k = self.read_value()
        pts = []
        t = 0
        lat = 0
        lng = 0
        for _ in range(k):
            t += self.read_value()
            lat += self.read_value()
            lng += self.read_value()
            pts.append((t, lat, lng))
        return pts
