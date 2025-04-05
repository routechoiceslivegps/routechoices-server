import bisect
from datetime import timedelta
from operator import itemgetter

from django.core.management.base import BaseCommand
from django.utils.timezone import now

from routechoices.core.models import Device, DeviceArchiveReference
from routechoices.lib.helpers import short_random_key, simplify_periods


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
            # TODO: Move into a Devices method
            last_start = None

            periods_used = []
            competitors = device.competitor_set.all()
            for competitor in competitors:
                event = competitor.event
                start = event.start_date
                if competitor.start_time:
                    start = competitor.start_time
                end = min(event.end_date, now())
                if not (two_weeks_ago < end):
                    periods_used.append((start, end))

            final_periods = simplify_periods(periods_used)
            if final_periods:
                last_start = final_periods[-1][0]
            final_periods_without_last_start = final_periods[:-1]

            locs = device.locations
            locs_to_archive = []
            for valid_period in final_periods_without_last_start:
                start = valid_period[0].timestamp()
                end = valid_period[1].timestamp()
                from_idx = bisect.bisect_left(locs, start, key=itemgetter(0))
                end_idx = bisect.bisect_right(locs, end, key=itemgetter(0))
                locs_to_archive += locs[from_idx:end_idx]

            device_archived_loc_count = len(locs_to_archive)
            if device_archived_loc_count:
                n_device_archived += 1
                self.stdout.write(
                    f"Device {device.aid}, archiving {device_archived_loc_count} locations"
                )

            if force and device_archived_loc_count:
                archive_dev = Device(
                    aid=f"{short_random_key()}_ARC",
                    is_gpx=True,
                )
                archive_dev.add_locations(locs_to_archive)
                DeviceArchiveReference.objects.create(
                    original=device, archive=archive_dev
                )
                for competitor in competitors:
                    if competitor.start_time < last_start:
                        competitor.device = archive_dev
                        competitor.save()

        if n_device_archived == 0:
            self.stdout.write(self.style.SUCCESS("No devices to archive"))
        elif force:
            self.stdout.write(
                self.style.SUCCESS(f"Successfully archived {n_device_archived} devices")
            )
        else:
            self.stdout.write(f"Would archive {n_device_archived} devices")
