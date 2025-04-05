from datetime import timedelta

from django.core.management.base import BaseCommand
from django.db.models import Prefetch
from django.utils.timezone import now

from routechoices.core.models import Competitor, Device


class Command(BaseCommand):
    help = (
        "Archives a device if it contains more than 1 days worth of locations"
        " before last start"
    )

    def add_arguments(self, parser):
        parser.add_argument("--force", action="store_true", default=False)

    def handle(self, *args, **options):
        force = options["force"]
        devices = Device.objects.prefetch_related(
            Prefetch(
                "competitor_set",
                queryset=Competitor.objects.select_related("event"),
            )
        ).filter(_location_count__gt=24 * 3600, is_gpx=False)

        device_archived_count = 0
        two_weeks_ago = now() - timedelta(days=14)
        for device in devices:
            archived_locations_count = 0
            archive_device = device.archive(until=two_weeks_ago, save=force)
            if archive_device:
                archived_locations_count = archive_device.location_count
            if archived_locations_count:
                device_archived_count += 1
                self.stdout.write(
                    f"Device {device.aid}, archiving {archived_locations_count} locations"
                )
        if device_archived_count == 0:
            self.stdout.write(self.style.SUCCESS("No devices to archive"))
        elif force:
            self.stdout.write(
                self.style.SUCCESS(
                    f"Successfully archived {device_archived_count} devices"
                )
            )
        else:
            self.stdout.write(f"Would archive {device_archived_count} devices")
