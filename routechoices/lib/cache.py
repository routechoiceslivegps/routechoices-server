from django.core.cache import cache


def get(*args, **kwargs):
    try:
        return cache.get(*args, **kwargs)
    except Exception:
        return None


def set(*args, **kwargs):
    try:
        cache.set(*args, **kwargs)
    except Exception:
        pass


def delete(*args, **kwargs):
    try:
        cache.delete(*args, **kwargs)
    except Exception:
        pass


def close(*args, **kwargs):
    try:
        cache.close(*args, **kwargs)
    except Exception:
        pass
