#!/usr/bin/python
#encoding:utf-8

from app import db
from datetime import datetime
import os
from sqlalchemy.dialects.mysql import LONGTEXT



# DEBUG=False
# SECRET_KEY = os.urandom(24)
# #项目文件存放目录
# projPath = '/home/careland/spiderManagementPlatform/flask/data'

class Car(db.Model):
    __tablename__ = 'car'
    id = db.Column(db.INTEGER,primary_key=True)
    carname = db.Column(db.String(500),nullable=False)#车牌号
    terminalid = db.Column(db.String(50),nullable=False)#终端号
    carstate = db.Column(db.String(50),nullable=False)#是否运行
    driver = db.Column(db.String(100))#司机
    driverphone =db.Column(db.String(100))#司机电话
    steward =db.Column(db.String(100))#乘务员
    starttime=db.Column(db.String(100))#始发车时间
    endtime=db.Column(db.String(100))#末班车时间
    cartype=db.Column(db.String(100))#车型
    company=db.Column(db.String(100))#运营单位
    team=db.Column(db.String(100))#车队
    captain=db.Column(db.String(100))#车队长

class Route(db.Model):
    __tablename__ = 'route'
    id = db.Column(db.INTEGER,primary_key=True)
    linejson = db.Column(LONGTEXT)#线路信息
    finish_time = db.Column(db.DateTime, default=datetime.now)  #路线结束时间
    create_time = db.Column(db.DateTime)# 路线开始时间
    terminalid = db.Column(db.String(50), nullable=False)  # 终端号
    # car_id = db.Column(db.INTEGER,db.ForeignKey('car.id'))#所属行车
    # acc = db.relationship('Car', backref=db.backref('route'))  # 行车路线外键关系

if __name__ == "__main__":
    db.create_all()



