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
        'id': 'uuid',
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
cs_cli.create_table(
    table_name = 'authentication',
    columns = {
        'username': 'text',
        'auth_token': 'uuid'
    },
    primary_key = 'username'
)
cs_cli.create_table(
    table_name = 'username',
    columns = {
        'username': 'text',
        'id': 'uuid'
    },
    primary_key = 'id'
)
cs_cli.create_table(
    table_name = 'email',
    columns = {
        'email': 'text',
        'id': 'uuid'
    },
    primary_key = 'id'
)
cs_cli.create_table(
    table_name = 'package',
    columns = {
        'package_type': 'text',
        'packages_added': 'text',
        'recepients': 'text',
        'package_id': 'uuid',
        'id': 'uuid'
    },
    primary_key = 'id'
)
cs_cli.create_table(
    table_name = 'packages',
    columns = {
        'username': 'text',
        'package_ids': 'text'
    },
    primary_key = 'username'
)
