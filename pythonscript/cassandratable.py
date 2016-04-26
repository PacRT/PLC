from cassandra import AlreadyExists
from cassandra.cluster import Cluster
import uuid

class CassandraClient(object):
    def __init__(self):
        cluster = Cluster(['127.0.0.1'])
        self.session = cluster.connect()

    def create_keyspace(self, keyspace):
        try:
            self.session.execute("""CREATE KEYSPACE %s WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': '2' }""" % keyspace)
        except AlreadyExists:
            pass
        self.session.set_keyspace(keyspace)

    def create_table(self, table_name, columns, primary_key=''):
        query = ""
        for key, value in columns.items():
            query += key + " " + value + ", "
        query = '(' + query
        if primary_key:
            query += 'PRIMARY KEY (' + primary_key + '))'
        else:
            query += ')'
        exc_query = 'CREATE TABLE {0} {1}'.format(table_name, query)
        try:
            self.session.execute(exc_query)
        except AlreadyExists:
            pass


cs_cli = CassandraClient()
cs_cli.create_keyspace('plc')
cs_cli.create_table(
    table_name = 'user',
    columns = {
        'id': 'text',
        'email': 'text',
        'name': 'text',
        'password': 'text',
        'status': 'text',
        'username': 'text'
    },
    primary_key = 'email'
)
cs_cli.create_table(
    table_name = 'invitation',
    columns = {
        'id': 'uuid',
        'token_id': 'text',
        'email': 'text'
    },
    primary_key = 'email'
)
cs_cli.create_table(
    table_name = 'owner',
    columns = {
        'id': 'uuid',
        'owner_id': 'text',
        'score': 'text',
        'doc_url': 'text'
    },
    primary_key = 'id'
)
cs_cli.create_table(
    table_name = 'issuer',
    columns = {
        'id': 'uuid',
        'issuer_id': 'text',
        'score': 'text',
        'doc_url': 'text'
    },
    primary_key = 'id'
)
cs_cli.create_table(
    table_name = 'doc',
    columns = {
        'id': 'uuid',
        'owner_id': 'text',
        'issuer_id': 'text',
        'doc_url': 'text',
        'category': 'text',
        'filename': 'text'
    },
    primary_key = 'id'
)
cs_cli.create_table(
    table_name = 'docs',
    columns = {
        'id': 'uuid',
        'owner_id': 'text',
        'score': 'text',
        'category': 'text',
        'filename': 'text',
        'issuer_id': 'text',
        'doc_url': 'text'
    },
    primary_key = 'id'
)






# UID, ARGV[1] is score/timestamp and ARGV[2] is docurl
# --KEYS[3] - category KEYS[4] - File-name
# redis.call('ZADD', "owner:"..KEYS[1]..":docs", ARGV[1], ARGV[2])
# print("m hrere")
# -- KEYS[2] is issuer's UID, ARGV[1] is score/timestamp and ARGV[2] is docurl
# redis.call('ZADD', "issuer:"  ..KEYS[2]..":docs", ARGV[1], ARGV[2])
# redis.call('HMSET', "doc:"..ARGV[2], "owner.uid", KEYS[1], "issuer.uid", KEYS[2],KEYS[3],ARGV[3],KEYS[4],ARGV[4])
# redis.call('SADD',"docs:"..KEYS[1] ,ARGV[2].."|timestamp|"..ARGV[1].."|category|"..ARGV[3].."|file_name|"..ARGV[4].."|doc_url|".. ARGV[5])
# print(KEYS[1] .."|".. KEYS[2] .."|".. ARGV[1] .."|".. ARGV[2]  .."|".. KEYS[3]  .."|".. ARGV[3]  .."|".. KEYS[4]  .."|".. ARGV[4])
#
