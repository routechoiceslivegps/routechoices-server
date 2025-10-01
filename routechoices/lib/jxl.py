from PIL import Image
from pillow_jxl import Encoder

_VALID_JXL_MODES = {"RGB", "RGBA", "L", "LA"}
JXL_FORMAT = "JXL"


def _save(im, fp, filename, save_all=False):
    info = im.encoderinfo.copy()

    # default quality is 90
    lossless = info.get("lossless", False)
    quality = 100 if lossless else info.get("quality", 90)

    decoding_speed = info.get("decoding_speed", 0)
    effort = info.get("effort", 7)
    use_container = info.get("use_container", False)
    use_original_profile = info.get("use_original_profile", False)

    enc = Encoder(
        mode=im.mode,
        lossless=lossless,
        quality=quality,
        decoding_speed=decoding_speed,
        effort=effort,
        use_container=use_container,
        use_original_profile=use_original_profile,
        num_threads=-1,
    )
    metadata = {
        "exif": None,
        "jumb": None,
        "xmp": None,
    }
    data = enc(im.tobytes(), im.width, im.height, jpeg_encode=False, **metadata)
    fp.write(data)


def register_jxl_opener():
    Image.register_save(JXL_FORMAT, _save)
    Image.register_mime(JXL_FORMAT, "image/jxl")
    Image.register_extension(JXL_FORMAT, ".jxl")
