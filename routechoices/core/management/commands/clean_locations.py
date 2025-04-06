from datetime import timedelta

from django.core.management.base import BaseCommand
from django.db.models import Prefetch
from django.utils.timezone import now

from routechoices.core.models import Competitor, Device


class Command(BaseCommand):
    help = "Delete unused locations after 14 days"

    def add_arguments(self, parser):
        parser.add_argument("--force", action="store_true", default=False)

    def handle(self, *args, **options):
        force = options["force"]
        deleted_count = 0
        devices = Device.objects.prefetch_related(
            Prefetch(
                "competitor_set",
                queryset=Competitor.objects.select_related("event"),
            )
        ).exclude(_location_count=0)
        two_weeks_ago = now() - timedelta(days=14)
        for device in devices:
            location_count_before = device.location_count

            device.remove_unused_location(until=two_weeks_ago, save=force)

            location_count_after = device.location_count
            deleted_location_count = location_count_before - location_count_after

            if deleted_location_count:
                self.stdout.write(
                    f"Device {device.aid},"
                    f" removing {deleted_location_count} locations"
                )
                deleted_count += deleted_location_count

        if deleted_count == 0:
            self.stdout.write(self.style.SUCCESS("No locations to removed"))
        elif force:
            self.stdout.write(
                self.style.SUCCESS(f"Successfully removed {deleted_count} locations")
            )
        else:
            self.stdout.write(f"Would remove {deleted_count} locations")
