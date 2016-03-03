from __future__ import print_function
from datetime import date, datetime, timedelta
import mysql.connector,redis,json

r = redis.Redis()
p = r.pubsub()
p.subscribe("createUserDirectory")

def createUserDirectory(json_msg):
    cnx = mysql.connector.connect(user='postfix', password='postfix', database='postfix')
    cursor = cnx.cursor()
    if json_msg == 1:
       return
    json1 = json.loads(json_msg)
    user_name = json1['user_name']
    add_user = ("INSERT INTO mailbox (email, maildir) VALUES (%s, %s)")
    data_user = (user_name+'@paperlessclub.org', user_name+'/')
    cursor.execute(add_user, data_user)
    os.makedirs('/home/vmail/'+user_name)
    cnx.commit()
    cursor.close()
    cnx.close()

for message in p.listen():
    createUserDirectory(message['data'])

p.close()

