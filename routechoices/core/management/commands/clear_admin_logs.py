from django.contrib.admin.models import LogEntry
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Clear admin logs"

    def handle(self, *args, **options):
        LogEntry.objects.all().delete()
