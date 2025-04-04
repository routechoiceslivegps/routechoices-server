from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils.timezone import now

from routechoices.core.models import Device, DeviceArchiveReference
from routechoices.lib.helpers import short_random_key


class Command(BaseCommand):
    help = (
        "Archives a device if it contains more than 1 days worth of locations"
        " before last start"
    )

    def add_arguments(self, parser):
        parser.add_argument("--force", action="store_true", default=False)

    def handle(self, *args, **options):
        force = options["force"]
        devices = Device.objects.filter(_location_count__gt=3600 * 24, is_gpx=False)
        n_device_archived = 0
        two_weeks_ago = now() - timedelta(days=14)
        for device in devices:
            self.stdout.write(f"Device {(device.aid)}")
            competitors = device.competitor_set.all()
            periods_used = []
            last_start = None
            locs = device.locations
            for competitor in competitors:
                event = competitor.event
                start = event.start_date
                if competitor.start_time:
                    start = competitor.start_time
                if not last_start or last_start < competitor.start_time:
                    if competitor.start_time < two_weeks_ago:
                        last_start = competitor.start_time
                end = min(event.end_date, now())
                periods_used.append((start, end))
            archived_indexes = []
            if last_start is None:
                continue
            for idx, loc in enumerate(locs):
                timestamp = loc[0]
                archive = False
                if timestamp >= last_start.timestamp():
                    archive = False
                for p in periods_used:
                    if (
                        p[0].timestamp() <= timestamp <= p[1].timestamp()
                        and timestamp < last_start.timestamp()
                    ):
                        archive = True
                        break
                if archive:
                    archived_indexes.append(idx)
            dev_archived_loc_count = len(archived_indexes)
            if dev_archived_loc_count:
                n_device_archived += 1
                self.stdout.write(
                    f"Device {device.aid}, archiving {dev_archived_loc_count} locations"
                )
            if force and dev_archived_loc_count:
                archive_dev = Device(
                    aid=f"{short_random_key()}_ARC",
                    is_gpx=True,
                )
                archived_locs = [locs[i] for i in archived_indexes]
                archive_dev.add_locations(archived_locs)
                DeviceArchiveReference.objects.create(
                    original=device, archive=archive_dev
                )
                for competitor in competitors:
                    if competitor.start_time < last_start:
                        competitor.device = archive_dev
                        competitor.save()
        if force:
            self.stdout.write(
                self.style.SUCCESS(f"Successfully archived {n_device_archived} devices")
            )
        else:
            self.stdout.write(f"Would archive {n_device_archived} devices")
