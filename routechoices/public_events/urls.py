from django.contrib.sitemaps import views as sitemaps_views
from django.urls import path, re_path

from routechoices.site import feeds, views
from routechoices.site.sitemaps import DynamicViewSitemap

sitemaps = {
    "default": DynamicViewSitemap,
}

urlpatterns = [
    path(r"", views.events_view, name="public_events_view"),
    re_path(
        r"(?P<icon_name>favicon\.ico|apple-touch-icon\.png|icon-192\.png|icon-512\.png)",
        views.site_favicon,
        name="public_events_favicon",
    ),
    path(
        "sitemap.xml",
        sitemaps_views.sitemap,
        {"sitemaps": sitemaps},
        name="public_events_sitemap",
    ),
    re_path(r"^feed(.rss)?$", feeds.live_event_feed, name="public_events_feed"),
]
