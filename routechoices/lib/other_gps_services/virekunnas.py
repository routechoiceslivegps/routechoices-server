from routechoices.lib.other_gps_services.gpsseuranta import GpsSeurantaNet


class GpsVirekunnasFi(GpsSeurantaNet):
    GPSSEURANTA_EVENT_URL = "https://gps.virekunnas.fi/"
    name = "GPS Seuranta"
    slug = "gpsseuranta"
