#!/bin/sh
#地图矢量调用地址
#"116.77.32.197:8080"
#接口请求地址
#"116.77.32.199:8080"
 . venv/bin/activate
#echo $aip
#echo $bip
killall -9 uwsgi
uwsgi --ini uwsgi.ini 

