#!/usr/bin/python
#encoding:utf-8
import codecs
import datetime
import json,sys
import threading
import time
import urllib2
from time import ctime
import logging
from lxml import etree
import pymysql
from app import db
from app.models import Car, Route
lock = threading.Lock()

logging.basicConfig(level=logging.DEBUG,
    format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
    # datefmt='%a, %d %b %Y %H:%M:%S',
    datefmt='%Y-%m-%d %H:%M:%S',
    filename='forms.log',
    filemode='a')
reload(sys)
sys.setdefaultencoding('utf-8')

class myThread(threading.Thread):
    def __init__(self, terminalid):
        threading.Thread.__init__(self)
        self.terminalid = terminalid
        self. listData = []
        self. second = 0
        self.isAdd = True
        self.stratTime=""
    def run(self):
        while True:
            try:
                self.second += 1
                list_car = read_sql()
                # print len(list_car)
                if self.terminalid not in list_car:
                    self.isAdd = False
                if self.isAdd:
                    try:
                        lock.acquire()
                        data = get_state(self.terminalid)
                        lock.release()
                    except Exception as e:
                        continue
                    if self.second == 1:
                        self.stratTime = data['time']
                    # data['time'] = data['time']+datetime.timedelta(seconds=second)
                    data['time'] = data['time'].strftime('%Y-%m-%d %H:%M:%S')
                    print data['time'], ",", data['coordinates'],self.second
                    if data["accstate"] =="true" and data["gpsstate"] =="true" and self.isAdd:
                        self.listData.append(data)
                    if self.second>=10 :
                        datas = {"listData": self.listData}
                        route = Route(linejson=json.dumps(datas), terminalid=self.terminalid, create_time=self.stratTime)
                        db.session.add(route)
                        db.session.commit()
                        self.listData=[]
                        self.second=0
                    time.sleep(1)
            except Exception as e:
                logging.info(u"线程%s异常--:%s"%(terminalid,e))
                lock.acquire()
                id_list.remove(self.terminalid)
                lock.release()


def get_state(terminalid):
        url = "http://183.62.223.65:3380/LBSCommunicator/UserService.asmx/GetRealtimeData?userName=cld_test&password=1&terminalid=%s" % (
            terminalid)
        response = urllib2.urlopen(url)
        html = response.read()
        html = etree.HTML(html)
        child = html[0][0]
        dact = {}
        for i in child:
            dact[i.tag] = i.text
        dact['coordinates'] = [float(dact['longitude']) / 3600000, float(dact['latitude']) / 3600000]
        # print terminalid
        dact['time'] = datetime.datetime.strptime(dact['time'].replace("T", " "), "%Y-%m-%d %H:%M:%S")
        return dact

# def time_x():
#         datas = []
#         with codecs.open(u'data.csv', 'r') as f:
#             for i in f.readlines():
#                 datas.append(i.split(','))
#         return datas

def read_sql():
    list = []
    db = pymysql.connect("127.0.0.1", "root", "123456", "db_demo1")
    # SQL 查询语句
    sql = "SELECT terminalid FROM CAR "
    try:
        cursor = db.cursor()
        cursor.execute(sql)
        result = cursor.fetchall()
        db.close()
    except:
        logging.info(u"数据路查询异常")
        read_sql()
    for obj in result:
        list.append(obj[0])
    return list
id_list = []
tasks = []
for terminalid in read_sql():
    id_list.append(terminalid)
    tasks.append(myThread(terminalid))

def always():
    while True:
        try:
            tl =[]
            for carid in read_sql():
                if carid not in id_list:
                    id_list.append(carid)
                    tl.append(myThread(carid))
            for t in tl:
                t.start()
            for t in tl:
                t.join()
        except Exception as e:
            logging.info(u"检查异常--:%s" %e)
            always()

t1 = threading.Thread(target=always,) #创建线程，args传参必须以元组方式传入
tasks.append(t1)
if __name__ == '__main__':
    # for t in tasks:
    #     t.start()
    # for t in tasks:
    #     t.join()
    data_list = Route.query.order_by(Route.finish_time.desc()).first()
    print datetime.datetime.now() - data_list.finish_time,datetime.datetime.now() - data_list.finish_time>datetime.timedelta(hours=1)