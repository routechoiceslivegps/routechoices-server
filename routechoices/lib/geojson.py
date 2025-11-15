def get_geojson_coordinates(gj):
    if gj["type"] == "Point":
        return gj["coordinates"]
    elif gj["type"] in ("LineString", "MultiPoint"):
        return gj["coordinates"][0]
    elif gj["type"] in ("Polygon", "MultiLineString"):
        return gj["coordinates"][0][0]
    elif gj["type"] == "MultiPolygon":
        return gj["coordinates"][0][0][0]
    elif gj["type"] == "Feature":
        return get_geojson_coordinates(gj["geometry"])
    elif gj["type"] == "GeometryCollection":
        return get_geojson_coordinates(gj["geometries"][0])
    elif gj["type"] == "FeatureCollection":
        return get_geojson_coordinates(gj["features"][0])
    return None
