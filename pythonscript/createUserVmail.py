import mysql.connector
cnx = mysql.connector.connect(user='postfix', password='postfix',
                              host='http://paperlessclub.org',
                              database='postfix')
println("closing connection")
cnx.close()