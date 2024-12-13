from django.test import TestCase

from routechoices.core.models import Club, Event
from routechoices.lib.other_gps_services.gpsseuranta import GpsSeurantaNet


class ImportTest(TestCase):
    def test_import_event(self):
        club = Club.objects.create(name="KeparDI", slug="kepardi")
        importer = GpsSeurantaNet()
        importer.club = club
        importer.import_event("20240911AVPR")
        self.assertTrue(Event.objects.filter(slug="20240911AVPR").exists())
