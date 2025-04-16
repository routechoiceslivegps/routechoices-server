#! /usr/bin/env bash
/apps/routechoices-server/env/bin/python /apps/routechoices-server/manage.py run_tcp_server --tmt250-port=12000 --mictrack-port=12001 --queclink-port=12002 --tracktape-port=12003 --xexun-port=12004 --gt06-port=12005
