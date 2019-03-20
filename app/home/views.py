#!/usr/bin/python
#coding:utf8

from . import home
from flask import Flask,render_template,request,redirect,url_for
from app.models import Car,Route
from app import db
import json
import urllib2
from lxml import etree

def get_state(terminalid):
    url = "http://183.62.223.65:3380/LBSCommunicator/UserService.asmx/GetRealtimeData?userName=cld_test&password=1&terminalid=%s"%(terminalid)
    # print url
    response = urllib2.urlopen(url)
    html = response.read()

    html=etree.HTML(html)
    # build_text_list = etree.XPath("//text()")
    child = html[0][0]
    dact={}
    for i in child:
        # a=etree.tostring(i, pretty_print=True)
        dact[i.tag]=i.text
    return dact
# data = get_state(13826539847)



@home.route('/pointlat/',methods=['POST'])
def pointlat():
    terminalid=request.form.get('terminalid')
    # print terminalid
    data = get_state(terminalid)
    # data['alarm'] = "警告"
    data['coordinates'] = [float(data['longitude'])/3600000,float(data['latitude'])/3600000]
    return json.dumps(data)


@home.route("/")
def index():
    return render_template('ydsx.html')
@home.route("/test/")
def index1():
    return render_template('test.html')

@home.route('/add/',methods=['POST'])
def add():
    isAdd=request.form.get('add')
    carName = request.form.get('name')
    carId =  request.form.get('id')
    carState = request.form.get('state')

    driver = request.form.get('driver',None)
    driverphone = request.form.get('driverphone',None)

    starttime = request.form.get('starttime')
    endtime = request.form.get('endtime')
    cartype = request.form.get('cartype')
    team = request.form.get('team')
    terminalid = request.form.get('terminalid')
    company = request.form.get('company')
    if isAdd=="yes":
        car = Car.query.filter(Car.carname == carName).first()
        carterminalid = Car.query.filter(Car.terminalid == terminalid).first()

        if (car or carterminalid):
            return u'名称或终端id已存在'
        else:
            car = Car(carname=carName, carstate=carState, driver=driver,driverphone=driverphone,starttime =starttime,endtime=endtime,cartype =cartype,team=team,terminalid=terminalid,company = company)
            db.session.add(car)
            db.session.commit()
            return "成功"
    else:
        car = Car.query.filter(Car.id == carId).first()
        car.carname = carName
        car.carstate = carState
        car.driver = driver
        car.driverphone = driverphone
        car.starttime = starttime
        car.endtime = endtime
        car.cartype = cartype
        car.team = team
        car.terminalid = terminalid
        car.company = company
        db.session.commit()
        return "成功"

@home.route('/revise/',methods=['POST'])
def revise():
    carname=request.form.get('carname')
    return carname

@home.route('/delete/',methods=['POST'])
def delete():
    carname=request.form.get('carname')
    car = Car.query.filter(Car.carname == carname).first()
    db.session.delete(car)
    db.session.commit()
    return '删除成功'

@home.route('/js_get/',methods=['GET'])
def js_get():
    # carname=request.form.get('method')
    datas  = Car.query.order_by('id').all()
    list = []
    for obj in datas:
        context = {}
        context["id"]=obj.id
        context["carname"]=obj.carname
        context["carstate"] = obj.carstate
        context["driver"] = obj.driver
        context["driverphone"]= obj.driverphone
        context["steward"] = obj.steward
        context["starttime"] = obj.starttime
        context["endtime"] = obj.endtime
        context["cartype"] = obj.cartype
        context["company"] = obj.company
        context["terminalid"]= obj.terminalid
        context["team"] = obj.team
        list.append(context)
    return json.dumps(list)
    # return str(context[0].id)

@home.route('/showHistory/',methods=['POST'])
def showHistory():
    carId = request.form.get('id')
    fliterDate = request.form.get('date')
    fliterTtime1 =request.form.get('time1')
    fliterTtime2 =request.form.get('time2')
    if fliterTtime1=='':
        fliterTtime1 = '0:0:0'
    if fliterTtime2 == '':
        fliterTtime2='23:59:59'
    mintime = fliterDate + ' ' + fliterTtime1
    maxtime = fliterDate + ' ' + fliterTtime2
    # print mintime,maxtime
    data_list = Route.query.filter(Route.terminalid==carId).filter(Route.create_time >= mintime).filter( Route.create_time <= maxtime).order_by(Route.create_time.desc()).all()
    list = []
    for obj in data_list:
        context = {}
        context["id"] = obj.id
        context["terminalid"]=obj.terminalid
        context["create_time"] = obj.create_time.strftime('%Y-%m-%d %H:%M').split(" ")[1]
        context["finish_time"] = obj.finish_time.strftime('%Y-%m-%d %H:%M').split(" ")[1]
        context["linejson"] = json.loads(obj.linejson)["listData"]
        list.append(context)
    return json.dumps(list)