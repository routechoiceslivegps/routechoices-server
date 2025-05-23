from allauth.account.models import EmailAddress
from dateutil.parser import parse
from dateutil.relativedelta import relativedelta
from django.conf import settings
from django.core.mail import EmailMessage
from django.core.management.base import BaseCommand
from django.db.models import Max
from django.utils.timezone import now

from routechoices.core.models import Club

START_PROCESS = parse("2025-05-24T00:00:00Z")


class Command(BaseCommand):
    help = "Remove club without activity"

    def send_warning(self, days, club):
        print(f"- {club.name}")
        print(f"  {days} warning")
        admins = club.admins.all().values_list("id", flat=True)
        if not admins:
            return
        to_emails = list(
            EmailAddress.objects.filter(
                user_id__in=admins, verified=True, primary=True
            ).values_list("email", flat=True)
        )
        print(f"  Sending Email to {", ".join(to_emails)}")
        print()
        msg = EmailMessage(
            f'[Routechoices.com] ACTION REQUIRED, Your club "{club.name}" may get deleted in {days}',
            f"""Hi,

We've noticed you haven't signed in to your Routechoices.com account in a while. In fact it's been more than a year! We routinely remove inactive accounts to ensure we're not storing any data you don't want us to.

This email is to let you know that in {days} time we'll be deleting your inactive Routechoices.com club "{club.name}", along with any data in your club (such as your maps and events).

It's super simple to stop this from happening. Just sign in!

https://www.routechoices.com/login
""",
            settings.DEFAULT_FROM_EMAIL,
            list(to_emails),
        )
        msg.send()

    def delete_club(self, club):
        print(f"DELETING {club.name}")
        club.delete()

    def handle(self, *args, **options):
        nyt = now().replace(hour=0, minute=0, second=0, microsecond=0)
        today = nyt.date()
        tomorrow = (nyt + relativedelta(days=1)).date()
        seven_days_from_now = (nyt + relativedelta(days=7)).date()
        thirty_days_from_now = (nyt + relativedelta(days=30)).date()

        clubs = (
            Club.objects.annotate(last_login=Max("admins__last_login"))
            .filter(
                upgraded=False,
                frontpage_featured=False,
            )
            .order_by("last_login")
        )
        for club in clubs:
            if club.last_login is None:
                club.last_login = club.creation_date
            due_deletion = max(
                START_PROCESS + relativedelta(days=30),
                club.last_login + relativedelta(years=1, days=30),
            ).date()
            if due_deletion == today:
                self.delete_club(club)
            elif due_deletion == tomorrow:
                self.send_warning("24 hours", club)
            elif due_deletion == seven_days_from_now:
                self.send_warning("7 days", club)
            elif due_deletion == thirty_days_from_now:
                self.send_warning("30 days", club)
