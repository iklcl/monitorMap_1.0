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

    def run(self):
        listData = []
        second = 0
        while True:
            try:
                second += 1
                # print second
                isAdd = True
                # list_car = read_sql()
                # print len(list_car)
                if self.terminalid not in list_car:
                    isAdd = False
                if isAdd:
                    try:
                        data = get_state(self.terminalid)
                    except Exception as e:
                        continue
                    if second == 1:
                        stratTime = data['time']
                    # data['time'] = data['time']+datetime.timedelta(seconds=second)
                    data['time'] = data['time'].strftime('%Y-%m-%d %H:%M:%S')
                    print data['time'], ",", data['coordinates']
                    if data["accstate"] =="true" and data["gpsstate"] =="true" and isAdd:
                        listData.append(data)
                    if second == 3600 and len(listData)!=0:
                        datas = {"listData": listData}
                        route = Route(linejson=json.dumps(datas), terminalid=self.terminalid, create_time=stratTime)
                        db.session.add(route)
                        db.session.commit()
                        listData=[]
                        second=0
                    time.sleep(1)
            except Exception as e:
                logging.info(u"线程异常"+terminalid+u"--:"+e)
                id_list.remove(self.terminalid)


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
            logging.info(u"检查异常" + "--:" + e)
            always()

t1 = threading.Thread(target=always,) #创建线程，args传参必须以元组方式传入
tasks.append(t1)
if __name__ == '__main__':
    for t in tasks:
        t.start()
    for t in tasks:
        t.join()

