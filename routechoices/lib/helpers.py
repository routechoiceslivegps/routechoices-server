import base64
import hashlib
import math
import os
import os.path
import re
import secrets
import struct
import time
import urllib
import urllib.request
import zoneinfo
from datetime import datetime
from math import cos, pi, sin, sqrt

from curl_cffi import requests
from django.conf import settings
from django.http.response import Http404
from django.utils.dateparse import parse_datetime
from django.utils.timezone import is_naive, make_aware
from PIL import Image, ImageFile
from user_sessions.templatetags.user_sessions import device as device_name

from routechoices.lib.globalmaptiles import GlobalMercator
from routechoices.lib.random_strings import generate_random_string
from routechoices.lib.validators import validate_nice_slug

UTC_TZ = zoneinfo.ZoneInfo("UTC")


def simplify_periods(ps):
    idx = 0
    ps = sorted(ps)
    while idx <= len(ps) - 2:
        start_a, end_a = ps[idx]
        start_b, end_b = ps[idx + 1]
        if start_b <= end_a:
            ps_o = ps[0:idx]
            ps_o.append((start_a, max(end_a, end_b)))
            ps_o += ps[idx + 2 :]
            ps = ps_o
        else:
            idx += 1
    return ps


def get_remote_image_sizes(uri):
    # Get file size *and* image size (None if not known)
    if not re.match("^https?://", uri.lower()):
        raise Exception("Invalid Protocol")
    with urllib.request.urlopen(uri) as file:
        size = file.headers.get("content-length")
        if size:
            size = int(size)
        p = ImageFile.Parser()
        while 1:
            data = file.read(1024)
            if not data:
                break
            p.feed(data)
            if p.image:
                return size, p.image.size
        return size, None


class MySite:
    domain = settings.RELYING_PARTY_ID
    name = settings.RELYING_PARTY_NAME


def avg_angles(a, b):
    d = ((b - a + 180) % 360) - 180
    return (a + d / 2) % 360


def get_current_site():
    return MySite()


def get_image_mime_from_request(requested_extension=None, default_mime=None):
    mime = default_mime
    if requested_extension:
        if requested_extension not in ("png", "webp", "avif", "jxl", "jpeg"):
            raise Http404()
        mime = f"image/{requested_extension}"
    return mime


def get_best_image_mime(request, default=None):
    accepted_mimes = request.COOKIES.get("accept-image", "").split(",")
    accepted_mimes += request.META.get("HTTP_ACCEPT", "").split(",")
    for mime in (
        "image/webp",
        "image/avif",
        "image/jxl",
    ):
        if mime in accepted_mimes:
            return mime
    return default


def git_master_hash():
    try:
        with open(os.path.join(settings.BASE_DIR, ".git", "HEAD")) as fp:
            rev = fp.read().strip()
        if ":" not in rev:
            return rev[:8]
        with open(os.path.join(settings.BASE_DIR, ".git", rev[5:])) as fp:
            return fp.read().strip()[:8]
    except Exception:
        return "dev"


def epoch_to_datetime(t):
    return datetime.utcfromtimestamp(int(t)).replace(tzinfo=UTC_TZ)


def set_content_disposition(filename, dl=True):
    prefix = "attachment; " if dl else ""
    return f"{prefix}filename*=UTF-8''{urllib.parse.quote(filename, safe='')}"


def safe64encode(b):
    if isinstance(b, str):
        b = b.encode("utf-8")
    return base64.urlsafe_b64encode(b).decode().rstrip("=")


def safe64encodedsha(txt):
    if isinstance(txt, str):
        txt = txt.encode("utf-8")
    h = hashlib.sha256()
    h.update(txt)
    return safe64encode(h.digest())


def shortsafe64encodedsha(txt):
    return safe64encodedsha(txt)[:8]


# def safe64decode(b):
#     return base64.urlsafe_b64decode(b.encode() + b"==")


def int_base32(i):
    b = struct.pack(">Q", i)
    while b.startswith(b"\x00"):
        b = b[1:]
    return base64.b32encode(b).decode().rstrip("=")


def time_base32():
    t = int(time.time())
    return int_base32(t)


def deg2rad(deg):
    return deg * pi / 180


def get_device_name(ua):
    if ua.startswith("Routechoices-ios-tracker"):
        return "iOS"
    if ua.startswith("Routechoices%20Watch%20Tracker%20Watch%20App/"):
        return "Apple Watch"
    if ua.startswith("Dalvik"):
        return "Android"
    if ua.startswith("ConnectMobile"):
        return "Garmin"
    if ua.startswith("Traccar"):
        return "Traccar"
    if name := device_name(ua):
        return name
    return ua


def get_aware_datetime(date_str):
    ret = parse_datetime(date_str)
    if is_naive(ret):
        ret = make_aware(ret)
    return ret


def random_key():
    rand_bytes = bytes(struct.pack("Q", secrets.randbits(64)))
    b64 = safe64encode(rand_bytes)
    b64 = b64[:11]
    try:
        validate_nice_slug(b64)
    except Exception:
        return random_key()
    return b64


def short_random_key():
    alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    return generate_random_string(alphabet, 6)


def random_device_id():
    alphabet = "0123456789"
    start = generate_random_string(alphabet[1:], 1)
    return f"{start}{generate_random_string(alphabet, 7)}"


def short_random_slug():
    alphabet = "23456789abcdefghijkmnpqrstuvwxyz"
    return generate_random_string(alphabet, 6)


def solve_affine_matrix(r1, s1, t1, r2, s2, t2, r3, s3, t3):
    a = (((t2 - t3) * (s1 - s2)) - ((t1 - t2) * (s2 - s3))) / (
        ((r2 - r3) * (s1 - s2)) - ((r1 - r2) * (s2 - s3))
    )
    b = (((t2 - t3) * (r1 - r2)) - ((t1 - t2) * (r2 - r3))) / (
        ((s2 - s3) * (r1 - r2)) - ((s1 - s2) * (r2 - r3))
    )
    c = t1 - (r1 * a) - (s1 * b)
    return [a, b, c]


def derive_affine_transform(a1, b1, c1, a0, b0, c0):
    e = 1e-15
    a0["x"] -= e
    a0["y"] += e
    b0["x"] += e
    b0["y"] -= e
    a1["x"] += e
    a1["y"] += e
    b1["x"] -= e
    b1["y"] -= e
    x = solve_affine_matrix(
        a0["x"], a0["y"], a1["x"], b0["x"], b0["y"], b1["x"], c0["x"], c0["y"], c1["x"]
    )
    y = solve_affine_matrix(
        a0["x"], a0["y"], a1["y"], b0["x"], b0["y"], b1["y"], c0["x"], c0["y"], c1["y"]
    )
    return tuple(x + y)


def three_point_calibration_to_corners(calibration_string, width, height):
    cal_pts_raw = calibration_string.split("|")
    cal_pts = [
        {
            "lon": float(cal_pts_raw[0]),
            "lat": float(cal_pts_raw[1]),
            "x": float(cal_pts_raw[2]),
            "y": float(cal_pts_raw[3]),
        },
        {
            "lon": float(cal_pts_raw[4]),
            "lat": float(cal_pts_raw[5]),
            "x": float(cal_pts_raw[6]),
            "y": float(cal_pts_raw[7]),
        },
        {
            "lon": float(cal_pts_raw[8]),
            "lat": float(cal_pts_raw[9]),
            "x": float(cal_pts_raw[10]),
            "y": float(cal_pts_raw[11]),
        },
    ]
    proj = GlobalMercator()
    cal_pts_meter = [
        proj.latlon_to_meters(cal_pts[0]),
        proj.latlon_to_meters(cal_pts[1]),
        proj.latlon_to_meters(cal_pts[2]),
    ]
    xy_to_coords_coeffs = derive_affine_transform(*cal_pts_meter, *cal_pts)

    def map_xy_to_latlon(xy):
        x = (
            xy["x"] * xy_to_coords_coeffs[0]
            + xy["y"] * xy_to_coords_coeffs[1]
            + xy_to_coords_coeffs[2]
        )
        y = (
            xy["x"] * xy_to_coords_coeffs[3]
            + xy["y"] * xy_to_coords_coeffs[4]
            + xy_to_coords_coeffs[5]
        )
        return proj.meters_to_latlon({"x": x, "y": y})

    corners = [
        map_xy_to_latlon({"x": 0, "y": 0}),
        map_xy_to_latlon({"x": width, "y": 0}),
        map_xy_to_latlon({"x": width, "y": height}),
        map_xy_to_latlon({"x": 0, "y": height}),
    ]
    return [
        round(corners[0]["lat"], 5),
        round(corners[0]["lon"], 5),
        round(corners[1]["lat"], 5),
        round(corners[1]["lon"], 5),
        round(corners[2]["lat"], 5),
        round(corners[2]["lon"], 5),
        round(corners[3]["lat"], 5),
        round(corners[3]["lon"], 5),
    ]


def adjugate_matrix(m):
    return [
        m[4] * m[8] - m[5] * m[7],
        m[2] * m[7] - m[1] * m[8],
        m[1] * m[5] - m[2] * m[4],
        m[5] * m[6] - m[3] * m[8],
        m[0] * m[8] - m[2] * m[6],
        m[2] * m[3] - m[0] * m[5],
        m[3] * m[7] - m[4] * m[6],
        m[1] * m[6] - m[0] * m[7],
        m[0] * m[4] - m[1] * m[3],
    ]


def multiply_matrices(a, b):
    c = [0] * 9
    for i in range(3):
        for j in range(3):
            for k in range(3):
                c[3 * i + j] += a[3 * i + k] * b[3 * k + j]
    return c


def multiply_matrix_vector(m, v):
    return [
        m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
        m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
        m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
    ]


def basis_to_points(a, b, c, d):
    m = [a.x, b.x, c.x, a.y, b.y, c.y, 1, 1, 1]
    v = multiply_matrix_vector(adjugate_matrix(m), [d.x, d.y, 1])
    return multiply_matrices(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]])


def general_2d_projection(a1, a2, a3, a4, b1, b2, b3, b4):
    s = basis_to_points(a1, a2, a3, a4)
    d = basis_to_points(b1, b2, b3, b4)
    return multiply_matrices(d, adjugate_matrix(s))


def project(m, x, y):
    v = multiply_matrix_vector(m, [x, y, 1])
    if v[2] == 0:
        v[2] = 0.000000001
    return v[0] / v[2], v[1] / v[2]


def compute_corners_from_kml_latlonbox(n, e, s, w, rot):
    a = (e + w) / 2
    b = (n + s) / 2
    squish = cos(deg2rad(b))
    x = squish * (e - w) / 2
    y = (n - s) / 2

    ne = (
        b + x * sin(deg2rad(rot)) + y * cos(deg2rad(rot)),
        a + (x * cos(deg2rad(rot)) - y * sin(deg2rad(rot))) / squish,
    )
    nw = (
        b - x * sin(deg2rad(rot)) + y * cos(deg2rad(rot)),
        a - (x * cos(deg2rad(rot)) + y * sin(deg2rad(rot))) / squish,
    )
    sw = (
        b - x * sin(deg2rad(rot)) - y * cos(deg2rad(rot)),
        a - (x * cos(deg2rad(rot)) - y * sin(deg2rad(rot))) / squish,
    )
    se = (
        b + x * sin(deg2rad(rot)) - y * cos(deg2rad(rot)),
        a + (x * cos(deg2rad(rot)) + y * sin(deg2rad(rot))) / squish,
    )
    return nw, ne, se, sw


def initial_of_name(name):
    """Converts a name to initials and surname.

    Ensures all initials are capitalised, even if the
    first names aren't.

    Examples:

      >>> initial_of_name('Ram Chandra Giri')
      'R.C.Giri'
      >>> initial_of_name('Ram chandra Giri')
      'R.C.Giri'

    """
    parts = name.split()
    initials = [part[0].upper() for part in parts[:-1]]
    return ".".join(initials + [parts[-1]])


def check_cname_record(domain):
    try:
        resp = requests.get(
            f"https://one.one.one.one/dns-query?type=CNAME&name={urllib.parse.quote(domain)}",
            headers={"accept": "application/dns-json"},
            timeout=10,
        )
        resp.raise_for_status()
    except Exception:
        return False

    data = resp.json()

    if data.get("Status") != 0:
        return False

    answer = data.get("Answer", [])
    for ans in answer:
        if ans.get("data") == "cname.routechoices.com." and ans.get("type") == 5:
            return True
    return False


def check_a_record(domain):
    try:
        resp = requests.get(
            f"https://one.one.one.one/dns-query?type=A&name={urllib.parse.quote(domain)}",
            headers={"accept": "application/dns-json"},
            timeout=10,
        )
        resp.raise_for_status()
    except Exception:
        return False

    data = resp.json()

    if data.get("Status") != 0:
        return False

    answer = data.get("Answer", [])
    for ans in answer:
        # TODO: Use env variable for setting IP address
        if ans.get("data") == "95.217.207.162" and ans.get("type") == 1:
            return True
    return False


def check_dns_records(domain):
    return check_cname_record(domain) or check_a_record(domain)


def is_valid_pil_image(data):
    try:
        with Image.open(data) as img:
            img.verify()
            return True
    except (IOError, SyntaxError):
        return False


def delete_domain(domain):
    ngx_conf = os.path.join(
        settings.BASE_DIR, "nginx", "custom_domains", f"{domain}.conf"
    )
    crt_file = os.path.join(settings.BASE_DIR, "nginx", "certs", f"{domain}.crt")
    key_file = os.path.join(settings.BASE_DIR, "nginx", "certs", f"{domain}.key")
    act_file = os.path.join(
        settings.BASE_DIR, "nginx", "certs", "accounts", f"{domain}.key"
    )
    for file in (ngx_conf, crt_file, key_file, act_file):
        if os.path.exists(file):
            os.remove(file)


def distance_xy(ax, ay, bx, by):
    return math.sqrt((ax - bx) ** 2 + (ay - by) ** 2)


def distance_latlon(a, b):
    R = 6371009  # https://en.wikipedia.org/wiki/Great-circle_distance
    lat1 = math.radians(a["lat"])
    lon1 = math.radians(a["lon"])
    lat2 = math.radians(b["lat"])
    lon2 = math.radians(b["lon"])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


def simplify_line(points, tolerance=11):
    if not points:
        return points
    new_coords = [points[0]]
    for p in points[1:-1]:
        last = new_coords[-1]
        dist = sqrt(pow(last[0] - p[0], 2) + pow(last[1] - p[1], 2))
        if dist > tolerance:
            new_coords.append(p)
    new_coords.append(points[-1])
    return new_coords


def gpsseuranta_encode_small_number(val):
    if val < -21:
        return chr(79 + val)
    if val < 5:
        return chr(86 + val)
    return chr(92 + val)


def gpsseuranta_encode_data(competitor_id, locations):
    out = ""
    chunks = []
    nb_pt_per_line = 29
    for i in range(len(locations) // nb_pt_per_line + 1):
        chunks.append(locations[i * nb_pt_per_line : (i + 1) * nb_pt_per_line])
    for chunk in chunks:
        prev_pt = None
        for pt in chunk:
            t = pt[0] - 1136073600
            lng = round(pt[2] * 5e4)
            lat = round(pt[1] * 1e5)
            if prev_pt is None:
                out += f"{competitor_id}.{t}_{lng}_{lat}."
            else:
                dt = t - prev_pt[0]
                dlat = lat - prev_pt[1]
                dlng = lng - prev_pt[2]
                if abs(dt) < 31 and abs(dlat) < 31 and abs(dlng) < 31:
                    out += gpsseuranta_encode_small_number(dt)
                    out += gpsseuranta_encode_small_number(dlng)
                    out += gpsseuranta_encode_small_number(dlat)
                    out += "."
                else:
                    out += f"{dt}_{dlng}_{dlat}."
            prev_pt = [t, lat, lng]
        out += "\n"
    return out
