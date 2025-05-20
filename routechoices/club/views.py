import magic
from django.conf import settings
from django.contrib import messages
from django.contrib.sitemaps.views import (
    SitemapIndexItem,
    _get_latest_lastmod,
    x_robots_tag,
)
from django.core.cache import cache
from django.core.paginator import EmptyPage, PageNotAnInteger
from django.http import Http404, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.template.response import TemplateResponse
from django.utils.http import http_date
from django.utils.timezone import now
from django.views.decorators.cache import cache_page
from django_hosts.resolvers import reverse
from rest_framework import status

from routechoices.club import feeds
from routechoices.core.models import PRIVACY_PRIVATE, Club, Event, EventSet
from routechoices.lib.helpers import (
    get_best_image_mime,
    get_current_site,
    get_image_mime_from_request,
    int_base32,
    safe64encodedsha,
)
from routechoices.lib.other_gps_services.gpsseuranta import GpsSeurantaNet
from routechoices.lib.other_gps_services.livelox import Livelox
from routechoices.lib.other_gps_services.loggator import Loggator
from routechoices.lib.s3 import serve_image_from_s3
from routechoices.lib.streaming_response import StreamingHttpRangeResponse
from routechoices.site.forms import CompetitorUploadGPXForm, RegisterForm


def handle_legacy_request(request, view_name, club_slug=None, **kwargs):
    use_custom_domain = getattr(settings, "USE_CUSTOM_DOMAIN_PREFIX", True)

    if use_custom_domain and club_slug:
        if not Club.objects.filter(slug__iexact=club_slug).exists():
            raise Http404()
        return redirect(
            reverse(
                view_name,
                host="clubs",
                host_kwargs={"club_slug": club_slug},
                kwargs=kwargs,
            )
        )
    if not use_custom_domain and getattr(request, "club_slug", None) is not None:
        kwargs.update({"club_slug": request.club_slug})
        return redirect(
            reverse(
                f"site:club:{view_name}",
                host="www",
                kwargs=kwargs,
            )
        )
    if (
        not use_custom_domain
        and getattr(request, "club_slug", None) is None
        and club_slug
    ):
        request.club_slug = club_slug
    return False


def club_view(request, **kwargs):
    if kwargs.get("club_slug"):
        club_slug = kwargs.get("club_slug")
        if club_slug in ("api", "admin", "dashboard", "oauth"):
            return redirect(f"/{club_slug}/")

    bypass_resp = handle_legacy_request(request, "club_view", kwargs.get("club_slug"))
    if bypass_resp:
        return bypass_resp

    club_slug = request.club_slug
    club = get_object_or_404(Club, slug__iexact=club_slug)

    if club.domain and not request.use_cname:
        return redirect(club.nice_url)

    return render(
        request, "site/event_list.html", Event.extract_event_lists(request, club)
    )


def club_favicon(request, icon_name, **kwargs):
    bypass_resp = handle_legacy_request(
        request, "club_favicon", kwargs.get("club_slug"), icon_name=icon_name
    )
    if bypass_resp:
        return bypass_resp
    icon_infos = {
        "favicon.ico": {"size": 32, "format": "ICO", "mime": "image/x-icon"},
        "apple-touch-icon.png": {"size": 180, "format": "PNG", "mime": "image/png"},
        "icon-192.png": {"size": 192, "format": "PNG", "mime": "image/png"},
        "icon-512.png": {"size": 512, "format": "PNG", "mime": "image/png"},
    }
    if icon_name not in icon_infos.keys():
        raise Http404()
    icon_info = icon_infos.get(icon_name)

    club_slug = request.club_slug
    club = get_object_or_404(Club, slug__iexact=club_slug)
    if club.domain and not request.use_cname:
        return redirect(f"{club.nice_url}{icon_name}")
    if not club.logo:
        with open(f"{settings.BASE_DIR}/static_assets/{icon_name}", "rb") as fp:
            data = fp.read()
    else:
        data = club.logo_scaled(icon_info["size"], icon_info["format"])
    return StreamingHttpRangeResponse(request, data, content_type=icon_info["mime"])


def club_logo(request, **kwargs):
    bypass_resp = handle_legacy_request(request, "club_logo", kwargs.get("club_slug"))
    if bypass_resp:
        return bypass_resp

    club_slug = request.club_slug
    club = get_object_or_404(
        Club.objects.exclude(logo=""), slug__iexact=club_slug, logo__isnull=False
    )

    if club.domain and not request.use_cname:
        return redirect(club.logo_url)

    mime = get_image_mime_from_request(kwargs.get("extension"))

    return serve_image_from_s3(
        request,
        club.logo,
        f"{club.name} Logo",
        mime=mime,
        default_mime="image/webp",
    )


def club_banner(request, **kwargs):
    bypass_resp = handle_legacy_request(request, "club_banner", kwargs.get("club_slug"))
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    club = get_object_or_404(
        Club.objects.exclude(banner=""), slug__iexact=club_slug, banner__isnull=False
    )
    if club.domain and not request.use_cname:
        return redirect(club.banner_url)

    mime = get_image_mime_from_request(kwargs.get("extension"))

    return serve_image_from_s3(
        request,
        club.banner,
        f"{club.name} Banner",
        mime=mime,
        default_mime="image/jpeg",
        img_mode="RGB",
    )


def club_thumbnail(request, **kwargs):
    bypass_resp = handle_legacy_request(
        request, "event_club_thumbnail", kwargs.get("club_slug")
    )
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    club = get_object_or_404(
        Club,
        slug__iexact=club_slug,
    )
    if club.domain and not request.use_cname:
        return redirect(f"{club.nice_url}thumbnail")

    mime = get_image_mime_from_request(
        kwargs.get("extension"), get_best_image_mime(request, "image/jpeg")
    )

    data_out = club.thumbnail(mime)

    resp = StreamingHttpRangeResponse(request, data_out)
    resp["ETag"] = f'w/"{safe64encodedsha(data_out)}"'
    return resp


def club_live_event_feed(request, *args, **kwargs):
    bypass_resp = handle_legacy_request(request, "club_feed", kwargs.get("club_slug"))
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    club = get_object_or_404(Club, slug__iexact=club_slug)
    if club.domain and not request.use_cname:
        return redirect(f"{club.nice_url}feed")
    resp = feeds.club_live_event_feed(request, *args, **kwargs)
    resp["Content-Type"] = "application/rss+xml"
    return resp


@cache_page(5 if not settings.DEBUG else 0)
def event_view(request, slug, **kwargs):
    bypass_resp = handle_legacy_request(
        request, "event_view", kwargs.get("club_slug"), slug=slug
    )
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    if not club_slug:
        club_slug = request.club_slug

    if club_slug in ("gpsseuranta", "loggator", "livelox"):
        if club_slug == "gpsseuranta":
            proxy = GpsSeurantaNet()
        elif club_slug == "loggator":
            proxy = Loggator()
        elif club_slug == "livelox":
            proxy = Livelox()
        else:
            raise Http404()
        try:
            proxy.parse_init_data(slug)
        except Exception:
            raise Http404()
        event = proxy.get_event()
    else:
        event = (
            Event.objects.all()
            .select_related("club")
            .filter(
                club__slug__iexact=club_slug,
                slug__iexact=slug,
            )
            .first()
        )
    if not event:
        event_set = (
            EventSet.objects.all()
            .select_related("club")
            .prefetch_related("events")
            .filter(
                club__slug__iexact=club_slug,
                slug__iexact=slug,
            )
            .first()
        )
        if not event_set:
            club = get_object_or_404(Club, slug__iexact=club_slug)
            if club.domain and not request.use_cname:
                return redirect(f"{club.nice_url}{slug}")
            return render(
                request,
                "club/404_event.html",
                {"club": club},
                status=status.HTTP_404_NOT_FOUND,
            )
        if event_set.club.domain and not request.use_cname:
            return redirect(f"{event_set.club.nice_url}{slug}")
        return render(
            request, "site/event_list.html", event_set.extract_event_lists(request)
        )
    # If event is private, page needs to send ajax with cookies to prove identity,
    # cannot be done from custom domain
    if event.privacy == PRIVACY_PRIVATE:
        if request.use_cname:
            return redirect(
                reverse(
                    "event_view",
                    host="clubs",
                    kwargs={"slug": slug},
                    host_kwargs={"club_slug": club_slug},
                )
            )
    elif event.club.domain and not request.use_cname:
        return redirect(f"{event.club.nice_url}{event.slug}")

    event.check_user_permission(request.user)

    resp_args = {
        "event": event,
    }
    response = render(request, "club/event.html", resp_args)
    if event.privacy == PRIVACY_PRIVATE:
        response["Cache-Control"] = "private"

    # Allow embeding in external site iframe
    response.xframe_options_exempt = True

    return response


def event_startlist_view(request, slug, **kwargs):
    bypass_resp = handle_legacy_request(
        request, "event_startlist_view", kwargs.get("club_slug"), slug=slug
    )
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    event = (
        Event.objects.all()
        .select_related("club", "event_set")
        .prefetch_related("competitors")
        .filter(
            club__slug__iexact=club_slug,
            slug__iexact=slug,
        )
        .first()
    )
    if not event:
        club = get_object_or_404(Club, slug__iexact=club_slug)
        if club.domain and not request.use_cname:
            return redirect(f"{club.nice_url}{slug}/export")
        return render(
            request,
            "club/404_event.html",
            {"club": club},
            status=status.HTTP_404_NOT_FOUND,
        )
    if event.privacy == PRIVACY_PRIVATE:
        if request.use_cname:
            return redirect(
                reverse(
                    "event_startlist_view",
                    host="clubs",
                    kwargs={"slug": slug},
                    host_kwargs={"club_slug": club_slug},
                )
            )
    elif event.club.domain and not request.use_cname:
        return redirect(f"{event.club.nice_url}{event.slug}/startlist")

    response = render(
        request,
        "club/event_startlist.html",
        {
            "event": event,
        },
    )
    if event.privacy == PRIVACY_PRIVATE:
        response["Cache-Control"] = "private"
    return response


def event_export_view(request, slug, **kwargs):
    bypass_resp = handle_legacy_request(
        request, "event_export_view", kwargs.get("club_slug"), slug=slug
    )
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    event = (
        Event.objects.all()
        .select_related("club", "event_set")
        .prefetch_related("competitors")
        .filter(
            club__slug__iexact=club_slug,
            slug__iexact=slug,
        )
        .first()
    )
    if not event:
        club = get_object_or_404(Club, slug__iexact=club_slug)
        if club.domain and not request.use_cname:
            return redirect(f"{club.nice_url}{slug}/export")
        return render(
            request,
            "club/404_event.html",
            {"club": club},
            status=status.HTTP_404_NOT_FOUND,
        )
    # If event is private, page needs to be sent with cookies to prove identity,
    # cannot be done from custom domain
    if event.privacy == PRIVACY_PRIVATE:
        if request.use_cname:
            return redirect(
                reverse(
                    "event_export_view",
                    host="clubs",
                    kwargs={"slug": slug},
                    host_kwargs={"club_slug": club_slug},
                )
            )
    elif event.club.domain and not request.use_cname:
        return redirect(f"{event.club.nice_url}{event.slug}/export")

    event.check_user_permission(request.user)

    response = render(
        request,
        "club/event_export.html",
        {
            "event": event,
        },
    )
    if event.privacy == PRIVACY_PRIVATE:
        response["Cache-Control"] = "private"
    return response


def event_zip_view(request, slug, **kwargs):
    bypass_resp = handle_legacy_request(
        request, "event_zip_view", kwargs.get("club_slug"), slug=slug
    )
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    event = (
        Event.objects.all()
        .select_related("club")
        .filter(
            club__slug__iexact=club_slug,
            slug__iexact=slug,
        )
        .first()
    )
    if not event:
        club = get_object_or_404(Club, slug__iexact=club_slug)
        if club.domain and not request.use_cname:
            return redirect(f"{club.nice_url}{slug}/zip")
        return render(
            request,
            "club/404_event.html",
            {"club": club},
            status=status.HTTP_404_NOT_FOUND,
        )
    if event.club.domain and not request.use_cname:
        return redirect(f"{event.club.nice_url}{event.slug}/zip")
    return redirect(
        reverse(
            "event_zip",
            host="api",
            kwargs={"event_id": event.aid},
        )
    )


def event_map_view(request, slug, index="1", **kwargs):
    bypass_resp = handle_legacy_request(
        request, "event_map_view", kwargs.get("club_slug"), slug=slug, index=index
    )
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug

    if club_slug in ("gpsseuranta", "loggator", "livelox"):
        cache_key = f"3rd_party_map:{club_slug}:slug:{slug}"
        if data := cache.get(cache_key):
            mime_type = magic.from_buffer(data, mime=True)
            return HttpResponse(data, content_type=mime_type)
        if club_slug == "gpsseuranta":
            proxy = GpsSeurantaNet()
        elif club_slug == "loggator":
            proxy = Loggator()
        elif club_slug == "livelox":
            proxy = Livelox()
        try:
            proxy.parse_init_data(slug)
        except Exception:
            raise Http404()
        rmap = proxy.get_map_file()
        with rmap.open("rb") as fp:
            data = fp.read()
        cache.set(cache_key, data, 24 * 3600)
        mime_type = magic.from_buffer(data, mime=True)
        return HttpResponse(data, content_type=mime_type)

    event = (
        Event.objects.all()
        .select_related("club")
        .filter(
            club__slug__iexact=club_slug,
            slug__iexact=slug,
        )
        .first()
    )
    if not event:
        club = get_object_or_404(Club, slug__iexact=club_slug)
        if club.domain and not request.use_cname:
            return redirect(
                f"{club.nice_url}{slug}/map{('-' + index) if index != '1' else ''}"
            )
        return render(
            request,
            "club/404_event.html",
            {"club": club},
            status=status.HTTP_404_NOT_FOUND,
        )
    if event.club.domain and not request.use_cname:
        return redirect(
            f"{event.club.nice_url}{event.slug}/map{('-' + index) if index != '1' else ''}"
        )

    redirect_view = "event_main_map_download"
    redirect_kwargs = {"event_id": event.aid}

    if index != "1":
        redirect_view = "event_map_download"
        redirect_kwargs["index"] = index

    mime = get_image_mime_from_request(kwargs.get("extension"))

    if mime:
        redirect_view += "_with_format"
        redirect_kwargs["extension"] = mime[6:]

    return redirect(
        reverse(
            redirect_view,
            host="api",
            kwargs=redirect_kwargs,
        )
    )


def event_kmz_view(request, slug, index="1", **kwargs):
    bypass_resp = handle_legacy_request(
        request, "event_kmz_view", kwargs.get("club_slug"), slug=slug, index=index
    )
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    event = (
        Event.objects.all()
        .select_related("club")
        .filter(
            club__slug__iexact=club_slug,
            slug__iexact=slug,
        )
        .first()
    )
    if not event:
        club = get_object_or_404(Club, slug__iexact=club_slug)
        if club.domain and not request.use_cname:
            return redirect(
                f"{club.nice_url}{slug}/kmz{('-' + index) if index != '1' else ''}"
            )
        return render(
            request,
            "club/404_event.html",
            {"club": club},
            status=status.HTTP_404_NOT_FOUND,
        )
    if event.club.domain and not request.use_cname:
        return redirect(
            f"{event.club.nice_url}{event.slug}/kmz{('-' + index) if index != '1' else ''}"
        )
    return redirect(
        reverse(
            "event_kmz_download",
            host="api",
            kwargs={"event_id": event.aid, "index": index},
        )
    )


def event_geojson_view(request, slug, **kwargs):
    bypass_resp = handle_legacy_request(
        request, "event_geojson_view", kwargs.get("club_slug"), slug=slug
    )
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    event = (
        Event.objects.all()
        .select_related("club")
        .filter(
            club__slug__iexact=club_slug,
            slug__iexact=slug,
        )
        .first()
    )
    if not event:
        club = get_object_or_404(Club, slug__iexact=club_slug)
        if club.domain and not request.use_cname:
            return redirect(f"{club.nice_url}{slug}/geojson")
        return render(
            request,
            "club/404_event.html",
            {"club": club},
            status=status.HTTP_404_NOT_FOUND,
        )
    if event.club.domain and not request.use_cname:
        return redirect(f"{event.club.nice_url}{event.slug}/geojson")
    return redirect(
        reverse(
            "event_geojson_download",
            host="api",
            kwargs={"event_id": event.aid},
        )
        + f"?v={int_base32(int(event.modification_date.timestamp()))}"
    )


def event_contribute_view(request, slug, **kwargs):
    bypass_resp = handle_legacy_request(
        request, "event_contribute_view", kwargs.get("club_slug"), slug=slug
    )
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    event = (
        Event.objects.all()
        .select_related("club", "event_set")
        .filter(
            club__slug__iexact=club_slug,
            slug__iexact=slug,
        )
        .first()
    )

    if not event:
        club = get_object_or_404(Club, slug__iexact=club_slug)
        if club.domain and not request.use_cname:
            return redirect(f"{club.nice_url}{slug}/contribute")
        return render(
            request,
            "club/404_event.html",
            {"club": club},
            status=status.HTTP_404_NOT_FOUND,
        )
    if event.club.domain and request.use_cname:
        return redirect(
            reverse(
                "event_contribute_view",
                host="clubs",
                kwargs={"slug": slug},
                host_kwargs={"club_slug": club_slug},
            )
        )

    if request.GET.get("competitor-added", None):
        messages.success(request, "Competitor added!")
    if request.GET.get("route-uploaded", None):
        messages.success(request, "Data uploaded!")

    can_upload = event.allow_route_upload and (event.start_date <= now())
    can_register = event.open_registration and (event.end_date >= now() or can_upload)

    register_form = None
    if can_register:
        register_form = RegisterForm(event=event)

    upload_form = None
    if can_upload:
        upload_form = CompetitorUploadGPXForm(event=event)

    return render(
        request,
        "club/event_contribute.html",
        {
            "event": event,
            "register_form": register_form,
            "upload_form": upload_form,
            "event_ended": event.end_date < now(),
        },
    )


def event_map_thumbnail(request, slug, **kwargs):
    bypass_resp = handle_legacy_request(
        request, "event_map_thumbnail", kwargs.get("club_slug"), slug=slug
    )
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    event = get_object_or_404(
        Event.objects.select_related("club", "map"),
        club__slug__iexact=club_slug,
        slug__iexact=slug,
    )

    event.check_user_permission(request.user)

    display_logo = request.GET.get("no-logo", False) is False

    mime = get_image_mime_from_request(
        kwargs.get("extension"), get_best_image_mime(request, "image/jpeg")
    )

    data_out = event.thumbnail(display_logo, mime)
    headers = {"ETag": f'W/"{safe64encodedsha(data_out)}"'}
    if event.privacy == PRIVACY_PRIVATE:
        headers["Cache-Control"] = "Private"
    return StreamingHttpRangeResponse(request, data_out, headers=headers)


@x_robots_tag
def acme_challenge(request, challenge):
    if not request.use_cname:
        raise Http404()
    club_slug = request.club_slug
    club = get_object_or_404(Club.objects.exclude(domain=""), slug__iexact=club_slug)
    if challenge == club.acme_challenge.partition(".")[0]:
        return HttpResponse(club.acme_challenge)
    raise Http404()


def robots_txt(request, **kwargs):
    bypass_resp = handle_legacy_request(request, "robots.txt", kwargs.get("club_slug"))
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    club = get_object_or_404(Club, slug=club_slug)
    if club.domain and not request.use_cname:
        return redirect(f"{club.nice_url}robots.txt")
    return HttpResponse(
        f"Sitemap: {club.nice_url}sitemap.xml\n", content_type="text/plain"
    )


def manifest(request, **kwargs):
    bypass_resp = handle_legacy_request(request, "manifest", kwargs.get("club_slug"))
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    club = get_object_or_404(Club, slug=club_slug)
    if club.domain and not request.use_cname:
        return redirect(f"{club.nice_url}manifest.json")
    return HttpResponse(
        (
            '{"icons": ['
            f'{{"src":"/icon-192.png{club.logo_last_mod}",'
            '"type":"image/png","sizes":"192x192"},'
            f'{{"src":"/icon-512.png{club.logo_last_mod}",'
            '"type":"image/png","sizes":"512x512"}'
            "]}"
        ),
        content_type="application/json",
    )


@x_robots_tag
def sitemap_index(
    request,
    sitemaps,
    template_name="sitemap_index.xml",
    content_type="application/xml",
    sitemap_url_name="club_sitemap_sections",
    **kwargs,
):
    bypass_resp = handle_legacy_request(
        request,
        "club_sitemap",
        kwargs.get("club_slug"),
    )
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    club = get_object_or_404(Club, slug__iexact=club_slug)
    if club.domain and not request.use_cname:
        return redirect(f"{club.nice_url}sitemap.xml")
    sites = []  # all sections' sitemap URLs
    all_indexes_lastmod = True
    latest_lastmod = None
    for section, site in sitemaps.items():
        site.club_slug = club_slug
        # For each section label, add links of all pages of its sitemap
        # (usually generated by the `sitemap` view).
        if callable(site):
            site = site()
        sitemap_url = f"{club.nice_url}sitemap-{section}.xml"
        absolute_url = sitemap_url
        site_lastmod = site.get_latest_lastmod()
        if all_indexes_lastmod:
            if site_lastmod is not None:
                latest_lastmod = _get_latest_lastmod(latest_lastmod, site_lastmod)
            else:
                all_indexes_lastmod = False
        sites.append(SitemapIndexItem(absolute_url, site_lastmod))
        # Add links to all pages of the sitemap.
        for page in range(2, site.paginator.num_pages + 1):
            sites.append(SitemapIndexItem(f"{absolute_url}?p={page}", site_lastmod))
    # If lastmod is defined for all sites, set header so as
    # ConditionalGetMiddleware is able to send 304 NOT MODIFIED
    if all_indexes_lastmod and latest_lastmod:
        headers = {"Last-Modified": http_date(latest_lastmod.timestamp())}
    else:
        headers = None
    return TemplateResponse(
        request,
        template_name,
        {"sitemaps": sites},
        content_type=content_type,
        headers=headers,
    )


@x_robots_tag
def sitemap(
    request,
    sitemaps,
    section=None,
    template_name="sitemap.xml",
    content_type="application/xml",
    **kwargs,
):
    bypass_resp = handle_legacy_request(
        request, "club_sitemap_sections", kwargs.get("club_slug"), section=section
    )
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    req_protocol = request.scheme
    req_site = get_current_site()

    if section is not None:
        if section not in sitemaps:
            raise Http404(f"No sitemap available for section: {section}")
        maps = [sitemaps[section]]
    else:
        maps = sitemaps.values()
    page = request.GET.get("p", 1)
    club = get_object_or_404(Club, slug__iexact=club_slug)
    if club.domain and not request.use_cname:
        return redirect(
            f"{club.nice_url}sitemap{f'-{section}' if section else ''}.xml?p={page}"
        )
    lastmod = None
    all_sites_lastmod = True
    urls = []
    for site in maps:
        site.club_slug = club_slug
        try:
            if callable(site):
                site = site()
            urls.extend(site.get_urls(page=page, site=req_site, protocol=req_protocol))
            if all_sites_lastmod:
                site_lastmod = getattr(site, "latest_lastmod", None)
                if site_lastmod is not None:
                    lastmod = _get_latest_lastmod(lastmod, site_lastmod)
                else:
                    all_sites_lastmod = False
        except EmptyPage:
            raise Http404(f"Page {page} empty")
        except PageNotAnInteger:
            raise Http404(f"No page '{page}'")
    # If lastmod is defined for all sites, set header so as
    # ConditionalGetMiddleware is able to send 304 NOT MODIFIED
    if all_sites_lastmod:
        headers = {"Last-Modified": http_date(lastmod.timestamp())} if lastmod else None
    else:
        headers = None
    return TemplateResponse(
        request,
        template_name,
        {"urlset": urls},
        content_type=content_type,
        headers=headers,
    )


def gpsseuranta_time(request):
    import time

    return HttpResponse(time.time() - 1136073600)


def event_gpsseuranta_init_view(request, slug, **kwargs):
    bypass_resp = handle_legacy_request(
        request, "event_gpsseuranta_init_view", kwargs.get("club_slug"), slug=slug
    )
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    event = get_object_or_404(
        Event.objects.select_related("club", "map").prefetch_related("competitors"),
        club__slug__iexact=club_slug,
        slug__iexact=slug,
    )
    event.check_user_permission(request.user)

    out = f"""VERSIO:3
RACENAME:{event.name}
TIMEZONE:0
GRABINTERVAL:15
DASHLIMIT:45
LIVEBUFFER:30
MINBEFORESTART:0
NUMBEROFLOGOS:0
LIVE:{1 if event.is_live else 0}
"""
    if event.map:
        width, height = event.map.quick_size
        tl = event.map.map_xy_to_wsg84(0, 0)
        tr = event.map.map_xy_to_wsg84(width, 0)
        br = event.map.map_xy_to_wsg84(width, height)
        out += f"CALIBRATION:{tl['lon']:.5f}|{tl['lat']:.5f}|0|0|{tr['lon']:.5f}|{tr['lat']:.5f}|{width}|0|{br['lon']:.5f}|{br['lat']:.5f}|{width}|{height}\n"

    for comp in event.competitors.all():
        out += f"COMPETITOR:t{comp.aid}|{comp.start_time.strftime("%Y%m%d")}|{comp.start_time.strftime("%H%I%S")}|{comp.name}|{comp.short_name}\n"

    content_type = "text/plain; charset=utf-8"

    headers = {}
    if event.privacy == PRIVACY_PRIVATE:
        headers["Cache-Control"] = "Private"

    return HttpResponse(
        out,
        content_type=content_type,
        headers=headers,
    )


def event_gpsseuranta_data_view(request, slug, **kwargs):
    bypass_resp = handle_legacy_request(
        request, "event_gpsseuranta_data_view", kwargs.get("club_slug"), slug=slug
    )
    if bypass_resp:
        return bypass_resp
    club_slug = request.club_slug
    event = get_object_or_404(
        Event.objects.select_related("club", "map"),
        club__slug__iexact=club_slug,
        slug__iexact=slug,
    )

    event.check_user_permission(request.user)

    def encode_gps_seuranta_data(competitor, locations):

        def encode_small_number(val):
            if val < -21:
                return chr(79 + val)
            if val < 5:
                return chr(86 + val)
            return chr(92 + val)

        out = ""
        chunks = []
        nb_pt_per_line = 29
        for i in range(0, len(locations) // nb_pt_per_line):
            chunks.append(locations[i * nb_pt_per_line : (i + 1) * nb_pt_per_line])
        for chunk in chunks:
            prev_pt = None
            for pt in chunk:
                t = pt[0] - 1136073600
                lng = round(pt[2] * 5e4)
                lat = round(pt[1] * 1e5)
                if prev_pt is None:
                    out += f"t{competitor.aid}.{t}_{lng}_{lat}."
                else:
                    dt = t - prev_pt[0]
                    dlat = lat - prev_pt[1]
                    dlng = lng - prev_pt[2]
                    if abs(dt) < 31 and abs(dlat) < 31 and abs(dlng) < 31:
                        out += f"{encode_small_number(dt)}{encode_small_number(dlng)}{encode_small_number(dlat)}."
                    else:
                        out += f"{dt}_{dlng}_{dlat}."
                prev_pt = [t, lat, lng]
            out += "\n"
        return out

    total_nb_pts = 0
    result = ""
    for competitor, from_date, end_date in event.iterate_competitors():
        if competitor.device_id:
            locations, nb_pts = competitor.device.get_locations_between_dates(
                from_date, end_date
            )
            total_nb_pts += nb_pts
            result += encode_gps_seuranta_data(competitor, locations)

    content_type = "text/plain; charset=utf-8"

    headers = {}
    if event.privacy == PRIVACY_PRIVATE:
        headers["Cache-Control"] = "Private"

    return HttpResponse(
        result,
        content_type=content_type,
        headers=headers,
    )
