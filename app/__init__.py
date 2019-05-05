#!/usr/bin/python
#encoding:utf-8
import sys,os
sys.path.append("..")
from flask import Flask
from  flask_sqlalchemy import  SQLAlchemy
USERNAME='root'
PASSWORD='123456'
HOST='localhost'
PORT='3306'
DATABASE='db_demo1'
DB_URI = "mysql://{}:{}@{}:{}/{}?charset=utf8".format(USERNAME,PASSWORD,HOST
                                              ,PORT,DATABASE)

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"]=DB_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config['SECRET_KEY'] =os.urandom(24)
db = SQLAlchemy(app)
app.debug =True

from app.home import home as home_blueprint

app.register_blueprint(home_blueprint)