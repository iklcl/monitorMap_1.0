#!/usr/bin/python
#encoding:utf-8
from app import app
from datetime import timedelta
# app.config['SEND_FILE_MAX_AGE_DEFAULT'] =timedelta(seconds=1)
if __name__ == '__main__':
    # app.run(host='0.0.0.0',port=89)
    app.run(host='127.0.0.1',port=8081)