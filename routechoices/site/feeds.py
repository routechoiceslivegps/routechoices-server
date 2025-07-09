from django.contrib.syndication.views import Feed
from django.utils.timezone import now
from django_hosts.resolvers import reverse

from routechoices.club.feeds import RssXslFeed
from routechoices.core.models import PRIVACY_PUBLIC, Event
from routechoices.lib.helpers import get_current_site


class SiteRssFeed(RssXslFeed):
    xsl_path = "/static/xsl/site-feed.xsl"


class LiveEventsFeed(Feed):
    feed_type = SiteRssFeed

    def title(self):
        site = get_current_site()
        return f"Last 50 events on {site.name}"

    def description(self):
        site = get_current_site()
        return f"Watch live or later the events on {site.name}"

    def link(self):
        return reverse("site:public_events_view", host="www")

    def items(self):
        return (
            Event.objects.select_related("club")
            .filter(
                privacy=PRIVACY_PUBLIC,
                on_events_page=True,
            )
            .filter(start_date__lte=now())[:50]
        )

    def item_title(self, item):
        return item.name

    def item_description(self, item):
        return f"Live GPS Tracking for {item.name} by {item.club}"

    def item_pubdate(self, item):
        return item.start_date


live_event_feed = LiveEventsFeed()
