[![circleci](https://circleci.com/gh/routechoiceslivegps/routechoices-server.svg?style=shield)](https://circleci.com/gh/routechoiceslivegps/routechoices-server) [![pre-commit.ci status](https://results.pre-commit.ci/badge/github/routechoiceslivegps/routechoices-server/master.svg)](https://results.pre-commit.ci/latest/github/routechoiceslivegps/routechoices-server/master) [![codecov](https://codecov.io/gh/routechoiceslivegps/routechoices-server/branch/master/graph/badge.svg?token=OZLCAY280V)](https://codecov.io/gh/routechoiceslivegps/routechoices-server)


Routechoices server
===================

Code for the server of the Routechoices Live GPS platform.

It includes:

  - The site static content.
  - A frontend server for listing and displaying live and archived events.
  - A dashboard for users to manage their events, maps, devices...
  - A REST API and its documentation.
  - A TCP server for listening to dedicated GPS trackers.
  - A WMS server for serving events maps.
  - A Tile server for serving background layers tiles.
  - An admin interface for the staff.

This project heavily rely on the Django and the Tornado Web python frameworks.

Hosted at https://www.routechoices.com
