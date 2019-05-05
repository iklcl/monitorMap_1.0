# -*- coding: utf-8 -*-
import MySQLdb
db_host = '127.0.0.1'
db_user = 'root'
db_pw = '123456'
db_name = 'db_demo1'
import pymysql,json
import codecs,csv
def cre_db(host, user, pw, name):
  try:
    # 数据库连接
    db = MySQLdb.connect(host, user, pw,db_name,charset='utf8')
    # 创建游标，通过连接与数据通信
    cursor = db.cursor()
    # 执行sql语句
    cursor.execute('select * from route where create_time>%s'%('2019-04-02'))
    rows = cursor.fetchall()
    # 提交到数据库执行
    db.commit()
  except MySQLdb.Error, e:
    print "Mysql Error %d: %s" % (e.args[0], e.args[1])
  finally:
  # 关闭数据库连接
    db.close()

# cre_db(db_host, db_user, db_pw,db_name)  
def read_sql():
    list = []
    db = pymysql.connect("127.0.0.1", "root", "123456", "db_demo1")
    # SQL 查询语句
    sql = "SELECT * FROM route where create_time>'2019-04-22' AND terminalid='13826539847'"
    cursor = db.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()
    db.close()
    for obj in result:
        list.append(obj)
    return list

a = read_sql()
print len(a)
for line in a:

  lines = json.loads(line[1])
  for data in lines['listData']:
      if len(data)==0:
          continue
      lat = data['coordinates']
    # time = data['']
      with codecs.open(u'ydsx.csv','ab') as f:
          w = csv.writer(f)
          w.writerow([data['time'],lat[0],lat[1]])