from django.urls import include, path, re_path

from routechoices.club import views
from routechoices.club.sitemaps import DynamicViewSitemap

sitemaps = {
    "dynamic": DynamicViewSitemap,
}


urlpatterns = [
    path("", views.club_view, name="club_view"),
    path("manifest.json", views.manifest, name="manifest"),
    path("robots.txt", views.robots_txt, name="robots.txt"),
    path(
        "sitemap.xml", views.sitemap_index, {"sitemaps": sitemaps}, name="club_sitemap"
    ),
    re_path(r"^feed(\.rss)?$", views.club_live_event_feed, name="club_feed"),
    re_path(
        r"^thumbnail(\.(?P<format>png|webp|avif|jxl|jpeg))?$",
        views.club_thumbnail,
        name="club_thumbnail",
    ),
    re_path(
        r"^logo(\.(?P<format>png|webp|avif|jxl|jpeg))?$",
        views.club_logo,
        name="club_logo",
    ),
    re_path(
        r"^banner(\.(?P<format>png|webp|avif|jxl|jpeg))?$",
        views.club_banner,
        name="club_banner",
    ),
    re_path(
        r"(?P<icon_name>favicon\.ico|apple-touch-icon\.png|icon-192\.png|icon-512\.png)",
        views.club_favicon,
        name="club_favicon",
    ),
    re_path(
        r"^sitemap-(?P<section>[A-Za-z0-9-_]+).xml$",
        views.sitemap,
        {"sitemaps": sitemaps},
        name="club_sitemap_sections",
    ),
    re_path(
        r"\.well-known/acme-challenge/(?P<challenge>.+)$",
        views.acme_challenge,
        name="acme_challenge",
    ),
    re_path(
        r"(?P<slug>[0-9a-zA-Z_-]+)/",
        include(
            [
                path("", views.event_view, name="event_view"),
                re_path(
                    r"^contribute/?$",
                    views.event_contribute_view,
                    name="event_contribute_view",
                ),
                re_path(
                    r"^export/?$",
                    views.event_export_view,
                    name="event_export_view",
                ),
                re_path(
                    r"^startlist/?$",
                    views.event_startlist_view,
                    name="event_startlist_view",
                ),
                re_path(
                    r"^thumbnail$",  # TODO: Allow format selection
                    views.event_map_thumbnail,
                    name="event_map_thumbnail",
                ),
                path(
                    "zip",
                    views.event_zip_view,
                    name="event_zip_view",
                ),
                re_path(
                    r"map_?(?P<index>(?<=_)[1-9]\d*)?$",  # TODO: Allow format selection
                    views.event_map_view,
                    name="event_map_view",
                ),
                re_path(
                    r"kmz(/(?P<index>[1-9]\d*))?$",
                    views.event_kmz_view,
                    name="event_kmz_view",
                ),
            ]
        ),
    ),
]
