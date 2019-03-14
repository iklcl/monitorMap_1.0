#encoding:utf-8
from flask import Flask
from  flask_sqlalchemy import  SQLAlchemy
USERNAME='root'
PASSWORD='123456'
HOST='127.0.0.1'
PORT='3306'
DATABASE='db_demo1'
DB_URI = "mysql://{}:{}@{}:{}/{}?charset=utf8".format(USERNAME,PASSWORD,HOST
                                              ,PORT,DATABASE)

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"]=DB_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
db = SQLAlchemy(app)
app.debug =True

from app.home import home as home_blueprint

app.register_blueprint(home_blueprint)