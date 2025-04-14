from defusedxml import minidom

from routechoices.lib.helpers import compute_corners_from_kml_latlonbox


class BadKMLException(Exception):
    pass


def extract_ground_overlay_info(kml):
    doc = minidom.parseString(kml)
    out = []
    main_name = name = "Untitled"
    try:
        main_name = doc.getElementsByTagName("name")[0].firstChild.nodeValue
    except Exception:
        pass
    for go in doc.getElementsByTagName("GroundOverlay"):
        try:
            name = go.getElementsByTagName("name")[0].firstChild.nodeValue
        except Exception:
            name = "Untitled"
        try:
            icon = go.getElementsByTagName("Icon")[0]
            href = icon.getElementsByTagName("href")[0].firstChild.nodeValue
            latlon_box_nodes = go.getElementsByTagName("LatLonBox")
            latlon_quad_nodes = go.getElementsByTagNameNS("*", "LatLonQuad")
            if len(latlon_box_nodes) > 0:
                latlon_box = latlon_box_nodes[0]
                north = float(
                    latlon_box.getElementsByTagName("north")[0].firstChild.nodeValue
                )
                east = float(
                    latlon_box.getElementsByTagName("east")[0].firstChild.nodeValue
                )
                south = float(
                    latlon_box.getElementsByTagName("south")[0].firstChild.nodeValue
                )
                west = float(
                    latlon_box.getElementsByTagName("west")[0].firstChild.nodeValue
                )
                rot = float(
                    latlon_box.getElementsByTagName("rotation")[0].firstChild.nodeValue
                )
                nw, ne, se, sw = compute_corners_from_kml_latlonbox(
                    north, east, south, west, rot
                )
            elif len(latlon_quad_nodes) > 0:
                latlon_quad = latlon_quad_nodes[0]
                corners_lonlat = (
                    latlon_quad.getElementsByTagName("coordinates")[0]
                    .firstChild.nodeValue.strip()
                    .split(" ")
                )
                sw, se, ne, nw = [
                    [float(x) for x in cc.split(",", 1)[::-1]] for cc in corners_lonlat
                ]
            else:
                raise Exception("Invalid GroundOverlay")
            corners_coords = ",".join(
                [f"{c[0]:.5f},{c[1]:.5f}" for c in (nw, ne, se, sw)]
            )
        except Exception:
            raise BadKMLException("Invalid GroundOverlay.")
        out.append((f"{main_name} - {name}", href, corners_coords))
    return out
