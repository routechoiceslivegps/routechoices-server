import bisect
from datetime import timedelta
from operator import itemgetter

from django.core.management.base import BaseCommand
from django.utils.timezone import now

from routechoices.core.models import Device
from routechoices.lib.helpers import simplify_periods


class Command(BaseCommand):
    help = "Delete unused locations after 14 days"

    def add_arguments(self, parser):
        parser.add_argument("--force", action="store_true", default=False)

    def handle(self, *args, **options):
        force = options["force"]
        deleted_count = 0
        two_weeks_ago = now() - timedelta(days=14)
        devices = Device.objects.all()
        for device in devices:
            orig_pts_count = device.location_count
            locs = device.locations
            periods_used = [(now() - timedelta(days=16), now() + timedelta(weeks=5200))]
            competitors = device.competitor_set.all()
            for competitor in competitors:
                event = competitor.event
                start = event.start_date
                if competitor.start_time:
                    start = competitor.start_time
                end = None
                end = min(event.end_date, two_weeks_ago)
                if start < end:
                    periods_used.append((start, end))
            final_periods = simplify_periods(periods_used)

            valid_locs = []
            for valid_period in final_periods:
                start = valid_period[0].timestamp()
                end = valid_period[1].timestamp()
                from_idx = bisect.bisect_left(locs, start, key=itemgetter(0))
                end_idx = bisect.bisect_right(locs, end, key=itemgetter(0))
                valid_locs += locs[from_idx:end_idx]
            deleted_device_loc_count = orig_pts_count - len(valid_locs)
            if deleted_device_loc_count:
                self.stdout.write(
                    f"Device {device.aid},"
                    f" extra {deleted_device_loc_count} locations"
                )
            deleted_count += deleted_device_loc_count
            if force and deleted_device_loc_count:
                device.erase_locations()
                device.add_locations(valid_locs)
        if force:
            self.stdout.write(
                self.style.SUCCESS(f"Successfully removed {deleted_count} locations")
            )
        else:
            self.stdout.write(f"Would remove {deleted_count} locations")
