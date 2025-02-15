"""
WSGI config for routechoices project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""

import atexit

import coverage

cov = coverage.coverage()
cov.start()

from wsgi import application  # noqa


def save_coverage():
    print("Saving coverage", flush=True)
    cov.stop()
    cov.save()


atexit.register(save_coverage)
