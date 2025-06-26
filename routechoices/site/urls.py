from allauth.account import views as account_views
from django.urls import include, path, re_path
from django.views.generic import TemplateView

from routechoices.site import feeds, views

urlpatterns = [
    re_path(r"^$", views.landing_page, name="landing_page"),
    re_path(r"^live-gps-tracking/?$", views.home_page, name="landing_page_redirect"),
    re_path(r"^login/?$", views.CustomLoginView.as_view(), name="account_login"),
    re_path(r"^logout/?$", account_views.logout, name="account_logout"),
    re_path(r"^signup/?$", account_views.signup, name="account_signup"),
    re_path(r"^contact/?$", views.contact, name="contact_view"),
    re_path(r"^events/?$", views.events_view, name="events_view"),
    re_path(r"^feed(.rss)?$", feeds.live_event_feed, name="events_feed"),
    re_path(
        r"^trackers/?$",
        TemplateView.as_view(template_name="site/tracker.html"),
        name="trackers_view",
    ),
    re_path(
        r"^guide/geojson/?$",
        TemplateView.as_view(template_name="site/geojson.html"),
        name="geojson_guide_view",
    ),
    re_path(
        r"^privacy-policy/?$",
        TemplateView.as_view(template_name="site/privacy_policy.html"),
        name="privacy_policy_view",
    ),
    re_path(
        r"^tos/?$", TemplateView.as_view(template_name="site/tos.html"), name="tos_view"
    ),
    re_path(
        r"^pricing/?$",
        views.pricing_page,
        name="pricing_view",
    ),
    re_path(
        r"^proceed-payment/?$",
        views.pay_view,
        name="pay_view",
    ),
    re_path(
        r"(?P<icon_name>favicon\.ico|apple-touch-icon\.png|icon-192\.png|icon-512\.png)",
        views.site_favicon,
        name="site_favicon",
    ),
    path("robots.txt", views.robots_txt, name="robots.txt"),
    path(
        "llms.txt",
        TemplateView.as_view(template_name="llms.txt", content_type="text/plain"),
        name="llms.txt",
    ),
    re_path(
        r"^(?P<club_slug>[0-9a-zA-Z][0-9a-zA-Z-]+)/",
        include(("routechoices.club.urls", "club"), namespace="club"),
    ),
]
