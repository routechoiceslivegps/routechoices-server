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
            try:
                name = go.getElementsByTagName("name")[0].firstChild.nodeValue
            except Exception:
                pass
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
                corners_coords = corners_coords = (
                    f"{round(float(nw[0]), 5)},{round(float(nw[1]), 5)},{round(float(ne[0]), 5)},{round(float(ne[1]), 5)},{round(float(se[0]), 5)},{round(float(se[1]), 5)},{round(float(sw[0]), 5)},{round(float(sw[1]), 5)}"
                )
            elif len(latlon_quad_nodes) > 0:
                latlon_quad = latlon_quad_nodes[0]
                sw, se, ne, nw = (
                    latlon_quad.getElementsByTagName("coordinates")[0]
                    .firstChild.nodeValue.strip()
                    .split(" ")
                )
                nw = nw.split(",")[::-1]
                ne = ne.split(",")[::-1]
                se = se.split(",")[::-1]
                sw = sw.split(",")[::-1]
                corners_coords = f"{round(float(nw[0]), 5)},{round(float(nw[1]), 5)},{round(float(ne[0]), 5)},{round(float(ne[1]), 5)},{round(float(se[0]), 5)},{round(float(se[1]), 5)},{round(float(sw[0]), 5)},{round(float(sw[1]), 5)}"
            else:
                raise Exception("Invalid GroundOverlay")
        except Exception:
            raise BadKMLException("Could not find proper GroundOverlay.")
        out.append((f"{main_name} - {name}", href, corners_coords))
    return out
