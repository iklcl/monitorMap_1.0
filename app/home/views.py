#!/usr/bin/python
#coding:utf8
import sys
sys.path.append("..")
from . import home
from flask import render_template,request,abort,make_response, send_from_directory,url_for,redirect,session
from app.models import Car,Route,User
from functools import  wraps
from app import db
import json
import urllib2,urllib
from lxml import etree
import codecs,os,datetime,csv

ALLOWED_EXTENSIONS = set(['db', 'csv', 'py','jpg','rar','txt','xls','doc','zip','pdf','png','xlsx','docx',''])
path1=os.path.join(os.getcwd(),'data')


#登入限制装饰器
def login_required(func):
    @wraps(func)
    def wrapper(*args,**kwargs):
        if session.get('user_id'):
            return func(*args,**kwargs)
        else:
            return redirect(url_for('home.login'))
    return wrapper
#登入页面
@home.route('/login/',methods=['GET','POST'])
def login():
    argsdata = request.args.get('q_code')
    if request.method =='GET':

        context={
                'erro':argsdata
            }
        return  render_template('login.html',**context)
    else:
        username= request.form.get('telephone')
        password = request.form.get('password')
        user =User.query.filter(User.username==username,User.password==password).first()
        if user:
            session['user_id']=user.id
            session.permanent = True
            return  redirect(url_for('home.index'))
        else:
            return redirect(url_for('home.login',q_code='密码错误！'))
#注册登入
@home.route('/regist/',methods=['GET','POST'])
def regist():
    if request.method == 'GET':
        return render_template('regist.html')
    else:
        telephone = request.form.get('telephone')
        username = request.form.get('username')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')
        user =User.query.filter(User.telephone ==telephone).first()
        if user:
            return 'no'
        else:
            if password1!=password2:
                return 'no'
            else:
                user=User(telephone=telephone,username=username,password=password1)
                db.session.add(user)
                db.session.commit()
                return  redirect(url_for('home.login'))

 # 密码修改
@home.route('/revisepassworld/', methods=['GET', 'POST'])
def revisepassworld():
    if request.method == 'GET':
        return render_template('revise.html')
    else:
        username = request.form.get('username')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')
        user = User.query.filter(User.username == username).first()
        context={}
        if user:
            if password1 != password2:
                context['data']= u'两次输入密码不相同'
            else:
                user.password = password1
                db.session.commit()
                context['data'] = u'修改成功！'
        else:
            context['data'] = u'用户不存在'
        return render_template('revise.html', **context)


#注销
@home.route('/logout/',methods=['GET'])
def logout():
    session.clear()
    return redirect(url_for('home.index'))



#全局收索session_id
@home.context_processor
def my_context_processor():
    user_id=session.get('user_id')
    if user_id:
        user=User.query.filter(User.id==user_id).first()
        if user:
            return {'user':user}
    return {}

def get_state(terminalid):
    "接口请求数据"
    # url="http://116.77.32.199:8080/UserService.asmx/GetRealtimeData"
    url="http://{0}/UserService.asmx/GetRealtimeData".format(time_x('reload.sh')[4][0].replace('"','').replace('#',''))
    data1 = {
        'userName': 'cld_test',
        'password': '1',
        'terminalid': terminalid
    }
    data = urllib.urlencode(data1)
    req = urllib2.Request(url, data,{'Content-Type': 'application/x-www-form-urlencoded'})
    try:
        response = urllib2.urlopen(req)
    except Exception as e:
        return {}
    html = response.read()
    response.close()
    html=etree.HTML(html)
    # build_text_list = etree.XPath("//text()")
    child = html[0][0]
    dact={}
    for i in child:
        # a=etree.tostring(i, pretty_print=True)
        dact[i.tag]=i.text
    # print dact
    return dact
def time_x(filename):
        "读取数据"
        datas = []
        with codecs.open(filename, 'r') as f:
            for i in f.readlines():
                datas.append(i.replace('\n','').replace('\r','').split(','))
        return datas

@home.route("/")
@login_required
def index():
    "主页面"
    if os.path.isfile("count.csv")!=True:
        with codecs.open('count.csv', 'wb') as f:
            w = csv.writer(f)
            w.writerow(['日期','车辆总数','上线数','上线率'])
    read_data = time_x('count.csv')
    datas = Car.query.order_by('id').all()
    SX=0
    for obj in datas:
        if obj.carstate==u'在线':
            SX+=1
    if len(datas)==0:
        SXL='0%'
    else:
        SXL = str(float(SX) / float(len(datas))*float(100))+'%'
    line = [datetime.datetime.now().strftime('%Y-%m-%d'), len(datas),SX,SXL]
    if read_data[-1][0] == datetime.datetime.now().strftime('%Y-%m-%d'):
        read_data.remove(read_data[-1])
        read_data.append(line)
        with codecs.open('count.csv', 'wb') as f:
            w = csv.writer(f)
            for il in read_data:
                w.writerow(il)
    else:
        with codecs.open('count.csv', 'ab') as f:
            w = csv.writer(f)
            w.writerow(line)
    context = {
        'ip':time_x('reload.sh')[2][0].replace('"','').replace('#',''),
        'dataOrder': Car.query.order_by('id').all()
    }
    return render_template('ydsx.html',**context)


@home.route('/pointlat/',methods=['POST'])
def pointlat():
    "调用接口，响应位置ajax"
    terminalid=request.form.get('terminalid')
    data = get_state(terminalid)
    if data=={}:
        return json.dumps(data)
    i = request.form.get('i',0)
    data['coordinates'] = [float(data['longitude'])/3600000,float(data['latitude'])/3600000]
    data['state']=''
    route = Route.query.filter(Route.terminalid == terminalid).order_by(Route.finish_time.desc()).first()
    route2 = Route.query.filter(Route.terminalid == terminalid).order_by(Route.finish_time.desc())
    # print route.create_time,len(json.loads(route.linejson)["listData"])
    try:
        if len(json.loads(route.linejson)["listData"])==0:
            route=route2[1]
    except Exception as e:
        route == None
    if route==None:
        datas = {"listData": [data]}
        routeadd =Route(linejson=json.dumps(datas), terminalid=terminalid)
        db.session.add(routeadd)
        db.session.commit()
        data['state'] = '在线'
    else:
        if route.finish_time-route.create_time<datetime.timedelta(minutes=30) and datetime.datetime.now()-route.create_time<=datetime.timedelta(minutes=30):
            secondData = json.loads(route.linejson)["listData"]
            if data not in secondData:
                route = Route.query.filter(Route.terminalid == terminalid).order_by(Route.finish_time.desc()).first()
                secondData.append(data)
                datas = {"listData": secondData}
                route.linejson = json.dumps(datas)
                route.finish_time = datetime.datetime.now()
                db.session.commit()
                data['state'] = '在线'
            else:
                # print terminalid
                st = secondData[-1]['timew'].replace("T", ' ').split('.')[0]
                dateSt = datetime.datetime.strptime(st, "%Y-%m-%d %H:%M:%S")
                if datetime.datetime.now() -route.finish_time>datetime.timedelta(seconds=90):
                    route = Route.query.filter(Route.terminalid == terminalid).order_by(Route.finish_time.desc()).first()
                    if len(json.loads(route.linejson)["listData"])!=0:
                        datas = {"listData": []}
                        routeadd = Route(linejson=json.dumps(datas), terminalid=terminalid)
                        db.session.add(routeadd)
                        db.session.commit()
                    data['state'] = '离线'
        else:
            if  datetime.datetime.now() - route.create_time <= datetime.timedelta(minutes=31):
                lastData = json.loads(route.linejson)["listData"][-1]
            else:
                lastData={}
            datas = {"listData": [lastData,data]}
            routeadd = Route(linejson=json.dumps(datas), terminalid=terminalid)
            db.session.add(routeadd)
            db.session.commit()
            data['state'] = '在线'
    data['speed'] = int(data['speed']) / 10
    if data['devicecount']=="4":
        data['devicecount']="RTK FIX"
    elif data['devicecount']=="1":
        data['devicecount'] = "单点定位"
    elif data['devicecount'] == "2":
        data['devicecount'] = "差分定位"
    elif data['devicecount']=="5":
        data['devicecount'] = "RTK FLOAT"
    elif data['devicecount']=="6":
        data['devicecount'] = "惯导"
    else:
        data['devicecount'] = "无效"
    return json.dumps(data)


@home.route('/add/',methods=['POST'])
@login_required
def add():
    '''添加修改数据'''
    isAdd=request.form.get('add')
    carName = request.form.get('name')
    carId =  request.form.get('id')
    carState = request.form.get('state','在线')
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
            return u'失败,名称或终端id已存在'
        else:
            car = Car(carname=carName, carstate=carState, driver=driver,driverphone=driverphone,starttime =starttime,endtime=endtime,cartype =cartype,team=team,terminalid=terminalid,company = company)
            db.session.add(car)
            db.session.commit()
            return u'成功'
    else:
        print carId
        car = Car.query.filter(Car.id == carId).first()
        # carname = Car.query.filter(Car.carname == carName).first()
        # carterminalid = Car.query.filter(Car.terminalid == terminalid).first()
        # if (carname and car!=carname) or (carterminalid and car!=carterminalid):
        #     return u'失败,名称或终端id已存在'
        # else:
        car.carname = carName
        # car.carstate = carState
        car.driver = driver
        car.driverphone = driverphone
        car.starttime = starttime
        car.endtime = endtime
        car.cartype = cartype
        car.team = team
        car.terminalid = terminalid
        car.company = company
        db.session.commit()
        return '成功'

@home.route('/revise/',methods=['POST'])
def revise():
    terminalid = request.form.get('terminalid')
    carState=request.form.get('status')
    car = Car.query.filter(Car.terminalid == terminalid).first()
    car.carstate = carState
    db.session.commit()
    return '修改状态'


@home.route('/delete/',methods=['POST'])
@login_required
def delete():
    '''删除'''
    carname=request.form.get('carname')
    car = Car.query.filter(Car.carname == carname).first()
    db.session.delete(car)
    db.session.commit()
    return '删除成功'

@home.route('/detail/',methods=['GET'])
@login_required
def detail():
    '''管理页面'''
    context = {
        'data': Car.query.order_by('id').all()
    }
    return render_template('detail.html',**context)

@home.route('/write/',methods=['POST'])
@login_required
def write():
    '''添加页面'''
    car_id =  request.form.get('terminalid')

    car_target=Car.query.filter(Car.terminalid == int(car_id)).first()

    context = {}
    context["id"] = car_target.id
    context["carname"] = car_target.carname
    context["carstate"] = car_target.carstate
    context["driver"] = car_target.driver
    context["driverphone"] = car_target.driverphone
    context["steward"] = car_target.steward
    context["starttime"] = car_target.starttime
    context["endtime"] = car_target.endtime
    context["cartype"] = car_target.cartype
    context["company"] = car_target.company
    context["terminalid"] = car_target.terminalid
    context["team"] = car_target.team
    return json.dumps(context)


@home.route('/js_get/',methods=['GET'])
def js_get():
    '''获取'''
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


@home.route('/showHistory/',methods=['POST'])
def showHistory():
    '''历史轨迹查询'''
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
    data_list = Route.query.filter(Route.terminalid==carId).filter(Route.create_time >= mintime).filter( Route.create_time <= maxtime).order_by(Route.create_time.desc()).all()
    list = []
    for obj in data_list:
        context = {}
        context["id"] = obj.id
        context["terminalid"]=obj.terminalid
        context["create_time"] = obj.create_time.strftime('%Y-%m-%d %H:%M:%S').split(" ")[1]
        context["finish_time"] = obj.finish_time.strftime('%Y-%m-%d %H:%M:%S').split(" ")[1]
        context["linejson"] = json.loads(obj.linejson)["listData"]
        if len(context["linejson"])>5:
            list.append(context)
    return json.dumps(list )
@home.route('/downloads/',methods=['GET'])
def downloads():
    '''下载统计'''
    if os.path.isfile('count.csv'):
            # return send_file('count.csv', as_attachment=True)
            response = make_response(send_from_directory(os.getcwd(), 'count.csv', as_attachment=True))
            response.headers["Content-Disposition"] = "attachment; filename={}".format('count.csv')
            # response = make_response(send_file("count.csv"))
            # response.headers["Content-Disposition"] = "attachment; filename=count.csv;"
            return response
    abort(404)