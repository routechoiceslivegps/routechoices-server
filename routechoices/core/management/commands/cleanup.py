import arrow
from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Clean up"

    def handle(self, *args, **options):
        self.stdout.write("Clear expired sessions")
        call_command("clearsessions")

        self.stdout.write("\nClear expired invitation")
        call_command("clear_expired_invitations")

        self.stdout.write("\nRemove unused images")
        call_command("clean_images", force=True)

        self.stdout.write("\nArchive overloaded devices")
        call_command("archive_devices", force=True)

        self.stdout.write("\nRemove unused locations")
        call_command(
            "clean_locations",
            force=True,
            since=arrow.utcnow().shift(days=-1).format("YYYY-MM-DD"),
        )

        self.stdout.write("\nRemove unused devices")
        call_command("clean_devices", force=True)

        self.stdout.write("\nDead clubs removals")
        call_command("clean_clubs")
