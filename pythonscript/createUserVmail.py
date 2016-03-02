from __future__ import print_function
from datetime import date, datetime, timedelta
import mysql.connector,redis

r = redis.Redis()
p = r.pubsub()
p.subscribe("createUserDirectory")

def createUserDirectory(json_msg):
    cnx = mysql.connector.connect(user=‘postfix', password=‘postfix’ database=‘postfix')
    cursor = cnx.cursor()
    user_name = json_msg['user_name']
    add_user = ("INSERT INTO mailbox (email, maidir) VALUES (%s, %s)")
    data_user = (user_name+'@paperlessclub.org', user_name+'/')
    cursor.execute(add_user, data_user)
    cnx.commit()
    cursor.close()
    cnx.close()

for message in p.listen():
    createUserDirectory(message)

p.close()

