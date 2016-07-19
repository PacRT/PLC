from __future__ import print_function
from datetime import date, datetime, timedelta
import mysql,json
import zerorpc


class createUserDirectory(object):
    def createDirectory(self, user_name, email):
        cnx = mysql.connector.connect(user='postfix', password='postfix', database='postfix')
        cursor = cnx.cursor()
        add_user = ("INSERT INTO mailbox (email, maildir) VALUES (%s, %s)")
        data_user = (user_name+'@paperlessclub.org', user_name+'/')
        cursor.execute(add_user, data_user)
        cnx.commit()
        cursor.close()
        cnx.close()

rpc_server = zerorpc.Server(createUserDirectory())
rpc_server.bind("tcp://0.0.0.0:4242")
rpc_server.run()