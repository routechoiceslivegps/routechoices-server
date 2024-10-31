from django.conf import settings
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from routechoices.api import views

schema_view = get_schema_view(
    openapi.Info(
        title="Routechoices.com API",
        default_version="v1",
        description="Routechoices.com API",
        terms_of_service="https://www.routechoices.com/tos/",
        contact=openapi.Contact(email="info@routechoices.com"),
        license=openapi.License(
            name="GPLv3", url="https://www.gnu.org/licenses/gpl-3.0.en.html"
        ),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
    url=f"https://www.{settings.PARENT_HOST}/",
)


urlpatterns = [
    re_path(r"^$", schema_view.with_ui("redoc", cache_timeout=0), name="api_doc"),
    re_path(r"^check-latlon/?$", views.ip_latlon, name="ip_latlon"),
    re_path(r"^device_id/?$", views.get_device_id, name="device_id_api"),  # deprecated
    re_path(r"^event-set/?$", views.event_set_creation, name="event_set"),
    re_path(r"^locations/?$", views.locations_api_gw, name="locations_api_gw"),
    re_path(
        r"^maps/(?P<map_id>[-0-9a-zA-Z_]+)/kmz$",
        views.map_kmz_download,
        name="map_kmz_download",
    ),
    re_path(r"^oauth2/", include("oauth2_provider.urls", namespace="oauth2_provider")),
    re_path(r"^time/?$", views.get_time, name="time_api"),
    re_path(r"^user/?$", views.user_view, name="user_view_api"),
    re_path(r"^version/?$", views.get_version, name="version"),
    path(
        "search/",
        include(
            [
                path("device", views.device_search, name="device_search_api"),
                path("user", views.user_search, name="user_search_api"),
            ]
        ),
    ),
    path(
        "device/",
        include(
            [
                path("", views.create_device_id, name="device_api"),
                re_path(
                    r"^(?P<device_id>[^/]+)/?$",
                    include(
                        [
                            path(
                                "",
                                views.device_info,
                                name="device_info_api",
                            ),
                            path(
                                "registrations",
                                views.device_registrations,
                                name="device_registrations_api",
                            ),
                        ]
                    ),
                ),
            ]
        ),
    ),
    path(
        "clubs/",
        include(
            [
                path(
                    "",
                    views.club_list_view,
                    name="club_list",
                ),
                re_path(
                    r"^(?P<club_slug>[0-9a-zA-Z_-]+)/devices/(?P<device_id>[^/]+)/?$",
                    views.device_ownership_api_view,
                    name="device_ownership_api_view",
                ),
            ]
        ),
    ),
    path(
        "events/",
        include(
            [
                path("", views.event_list, name="event_list"),
                re_path(
                    r"^(?P<event_id>[0-9a-zA-Z_-]+)/",
                    include(
                        [
                            path(
                                "",
                                views.event_detail,
                                name="event_detail",
                            ),
                            path(
                                "register",
                                views.event_register,
                                name="event_register",
                            ),
                            path(
                                "data",
                                views.event_data,
                                name="event_data",
                            ),
                            path(
                                "zip",
                                views.event_zip,
                                name="event_zip",
                            ),
                            path(
                                "map",
                                include(
                                    [
                                        path(
                                            "",  # TODO: Allow format selection
                                            views.event_map_download,
                                            name="event_main_map_download",
                                        ),
                                        re_path(
                                            r"^_(?P<map_index>[1-9]\d*)$",  # TODO: Allow format selection
                                            views.event_map_download,
                                            name="event_map_download",
                                        ),
                                    ]
                                ),
                            ),
                            path(
                                "kmz",
                                include(
                                    [
                                        re_path(
                                            "^$",
                                            views.event_kmz_download,
                                            name="event_main_kmz_download",
                                        ),
                                        re_path(
                                            r"^_(?P<map_index>[1-9]\d*)$",
                                            views.event_kmz_download,
                                            name="event_kmz_download",
                                        ),
                                    ]
                                ),
                            ),
                        ]
                    ),
                ),
            ]
        ),
    ),
    re_path(
        r"^competitors/(?P<competitor_id>[0-9a-zA-Z_-]+)/",
        include(
            [
                path(
                    "",
                    views.competitor_api,
                    name="competitor_api",
                ),
                path(
                    "route",
                    views.competitor_route_upload,
                    name="competitor_route_upload",
                ),
                path(
                    "gpx",
                    views.competitor_gpx_download,
                    name="competitor_gpx_download",
                ),
            ]
        ),
    ),
    path(
        "woo/",
        include(
            [
                path(
                    "race_status/get_info.json",
                    views.two_d_rerun_race_status,
                    name="2d_rerun_race_status",
                ),
                path(
                    "race_status/get_data.json",
                    views.two_d_rerun_race_data,
                    name="2d_rerun_race_data",
                ),
            ]
        ),
    ),
    re_path(
        r"^(?P<provider>gpsseuranta|loggator)/(?P<uid>[^/]+)/",
        include(
            [
                path(
                    "",
                    views.third_party_event,
                    name="third_party_event_detail",
                ),
                path(
                    "data",
                    views.third_party_event_data,
                    name="third_party_event_data",
                ),
            ]
        ),
    ),
]
