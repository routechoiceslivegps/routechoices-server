from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils.timezone import now

from routechoices.core.models import Device


class Command(BaseCommand):
    help = "Delete unused locations after 14 days"

    def add_arguments(self, parser):
        parser.add_argument("--force", action="store_true", default=False)
        parser.add_argument("--incremental", action="store_true", default=False)

    def handle(self, *args, **options):
        force = options["force"]
        incremental = options["incremental"]
        deleted_count = 0
        two_weeks_ago = now() - timedelta(days=14)
        devices = Device.objects.all()
        if incremental:
            two_weeks_two_days_ago = now() - timedelta(days=16)
            devices = devices.filter(modification_date__gte=two_weeks_two_days_ago)
        for device in devices:
            orig_pts_count = device.location_count
            locs = device.locations
            periods_used = []
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
            valid_indexes = []
            for idx, loc in enumerate(locs):
                timestamp = loc[0]
                is_valid = False
                if timestamp >= two_weeks_ago.timestamp():
                    is_valid = True
                if not is_valid:
                    for p in periods_used:
                        if p[0].timestamp() <= timestamp <= p[1].timestamp():
                            is_valid = True
                            break
                if is_valid:
                    valid_indexes.append(idx)
            dev_del_loc_count_total = orig_pts_count - len(valid_indexes)
            dev_del_loc_count_invalids = orig_pts_count - len(valid_indexes)
            if dev_del_loc_count_total:
                self.stdout.write(
                    f"Device {device.aid},"
                    f" extra {dev_del_loc_count_total} locations"
                )
            deleted_count += dev_del_loc_count_total
            if force and dev_del_loc_count_invalids:
                device.erase_locations()
                new_locs = [locs[i] for i in valid_indexes]
                device.add_locations(new_locs)
        if force:
            self.stdout.write(
                self.style.SUCCESS(f"Successfully removed {deleted_count} Locations")
            )
        else:
            self.stdout.write(f"Would remove {deleted_count} Locations")
