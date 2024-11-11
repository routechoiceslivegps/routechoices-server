from unittest.mock import Mock, patch

from django.test import TestCase, override_settings

from . import plausible
from .helpers import (
    check_cname_record,
    compute_corners_from_kml_latlonbox,
    three_point_calibration_to_corners,
)
from .kmz import extract_ground_overlay_info
from .mtb_decoder import MtbDecoder
from .slippy_tiles import latlon_to_tile_xy, tile_xy_to_north_west_latlon


@override_settings(ANALYTICS_API_KEY=True)
class PlausibleTestCase(TestCase):
    @patch("curl_cffi.requests.get")
    def test_domain_setup(self, mock_get):
        mock_response = Mock()
        expected_dict = {}
        mock_response.json.return_value = expected_dict
        mock_response.status_code = 200
        mock_get.return_value = mock_response
        self.assertTrue(plausible.is_domain_setup("example.com"))
        mock_response.status_code = 404
        mock_get.return_value = mock_response
        self.assertFalse(plausible.is_domain_setup("example.com"))

    @patch("curl_cffi.requests.post")
    def test_create_domain(self, mock_post):
        mock_response = Mock()
        expected_dict = {}
        mock_response.json.return_value = expected_dict
        mock_response.status_code = 200
        mock_post.return_value = mock_response
        self.assertTrue(plausible.create_domain("gps.example.com"))
        mock_response.status_code = 404
        mock_post.return_value = mock_response
        self.assertFalse(plausible.create_domain("gps.example.com"))

    @patch("curl_cffi.requests.put")
    def test_change_domain(self, mock_put):
        mock_response = Mock()
        expected_dict = {}
        mock_response.json.return_value = expected_dict
        mock_response.status_code = 200
        mock_put.return_value = mock_response
        self.assertTrue(plausible.change_domain("olddomain.com", "gps.example.com"))
        mock_response.status_code = 400
        mock_put.return_value = mock_response
        self.assertFalse(plausible.change_domain("olddomain.com", "gps.example.com"))

    @patch("curl_cffi.requests.delete")
    def test_delete_domain(self, mock_delete):
        mock_response = Mock()
        expected_dict = {}
        mock_response.json.return_value = expected_dict
        mock_response.status_code = 200
        mock_delete.return_value = mock_response
        self.assertTrue(plausible.delete_domain("gps.example.com"))
        mock_response.status_code = 400
        mock_delete.return_value = mock_response
        self.assertFalse(plausible.delete_domain("gps.example.com"))

    @patch("routechoices.lib.plausible.is_domain_setup")
    @patch("curl_cffi.requests.put")
    def test_create_link(self, mock_put, mock_is_domain_setup):
        mock_is_domain_setup_return = Mock()
        mock_is_domain_setup_return.return_value = True
        mock_is_domain_setup.return_value = mock_is_domain_setup_return

        mock_response = Mock()
        expected_dict = {"url": "https://plausible.example.com/abc123"}
        mock_response.json.return_value = expected_dict
        mock_response.status_code = 200
        mock_put.return_value = mock_response

        link, created = plausible.create_shared_link("gps.example.com", "Hello")
        self.assertTrue(created)
        self.assertEqual(link, "https://plausible.example.com/abc123")
        mock_response.status_code = 400
        mock_put.return_value = mock_response
        _, created = plausible.create_shared_link("gps.example.com", "Hello")
        self.assertFalse(created)


class HelperTestCase(TestCase):
    def test_calibration_conversion(self):
        cal = three_point_calibration_to_corners(
            "9.5480564597566|46.701263850274|1|1|9.5617738453051|46.701010852567|4961|1|9.5475331306949|46.687915214433|1|7016",
            4961,
            7016,
        )
        self.assertEqual(
            cal,
            [
                46.70127,
                9.54805,
                46.70101,
                9.56177,
                46.68766,
                9.56125,
                46.68792,
                9.54753,
            ],
        )

    def test_kml_cal(self):
        cal = compute_corners_from_kml_latlonbox(
            63.35268625254615,
            63.325978161823549,
            12.55481008348568,
            12.470815025221196,
            -5.6769774354892242,
        )
        self.assertEqual(
            cal,
            (
                (65.21144277090194, 15.781876945283638),
                (61.24478638169717, 66.38761575963139),
                (10.696053565129883, 60.0149162417611),
                (14.662709954334655, 9.409177427413347),
            ),
        )

    def test_check_dns(self):
        self.assertTrue(check_cname_record("live.kiilat.com"))

    def test_slippy_map(self):
        xy = latlon_to_tile_xy(60, 20, 10)
        self.assertEqual(xy, (568, 297))
        lat_lon = tile_xy_to_north_west_latlon(xy[0], xy[1], 10)
        self.assertEqual(lat_lon, (60.064840460104506, 19.6875))

    def test_import_kml(self):
        kml = '<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Folder><name>Ground Overlays</name><description>Examples of ground overlays</description><GroundOverlay><name>Large-scale overlay on terrain</name><description>Overlay shows Mount Etna erupting on July 13th, 2001.</description><Icon><href>https://developers.google.com/kml/documentation/images/etna.jpg</href></Icon><LatLonBox><north>37.91904192681665</north><south>37.46543388598137</south><east>15.35832653742206</east><west>14.60128369746704</west><rotation>-0.1556640799496235</rotation></LatLonBox></GroundOverlay></Folder></kml>'
        name, url, coordinates = extract_ground_overlay_info(kml)[0]
        self.assertEqual(name, "Ground Overlays - Large-scale overlay on terrain")
        self.assertEqual(
            url, "https://developers.google.com/kml/documentation/images/etna.jpg"
        )
        self.assertEqual(
            coordinates,
            "37.91985,14.60206,37.91823,15.35910,37.46462,15.35755,37.46625,14.60051",
        )


class MtbDecoderTestCase(TestCase):
    def test_decode(self):
        with open("cypress/fixtures/tractrac.mtb", "rb") as lf:
            device_map = MtbDecoder(lf).decode()
        self.assertEqual(len(device_map), 11)
