from cassandra import AlreadyExists
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider

import uuid
from TableModels import User

class CassandraClient(object):
    def __init__(self):
        auth_provider = PlainTextAuthProvider(
                        username='cassandra', password='cassandra')
        cluster = Cluster(['127.0.0.1'],auth_provider=auth_provider)
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
        'filename': 'text',
        'doc_link' : 'text'
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
        'doc_url': 'text',
        'doc_link' : 'text',
        'meta_fields' : 'map<text, text>'
    },
    primary_key = 'id'
)
cs_cli.create_table(
    table_name = 'authentication',
    columns = {
        'username': 'text',
        'auth_token': 'text'
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
        'recepients': 'list<text>',
        'package_id': 'uuid',
        'sender_id' : 'text',
        'id': 'uuid',
        'date_updated' : 'timestamp'
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
cs_cli.create_table(
    table_name = 'inbox',
    columns = {
        'id': 'uuid',
        'email': 'text',
        'issuer_id': 'text'
    },
    primary_key = 'id'
)

cs_cli.create_table(
    table_name = 'thread',
    columns = {
        'thread_id': 'uuid',
        'date_updated': 'timestamp',
        'is_read': 'boolean',
        'packages' : 'list<uuid>',
        'receiver' : 'text',
        'sender'   : 'text',
        'thread_name' : 'text'
    },
    primary_key = 'thread_id'
)

cs_cli.create_table(
    table_name = 'sender_list',
    columns = {
        'user_id' : 'text',
        'list_id' : 'uuid',
        'sender_list' : 'set<text>'
    },
    primary_key =  'user_id'
)

cs_cli.create_table(
    table_name = 'inbox_comment_thread',
    columns = {
        'thread_id' : 'uuid',
        'comment_id' : 'uuid',
        'package_id' : 'uuid',
        'doc_url'    : 'text',
        'comment'    : 'text',
        'date_added' : 'timestamp',
        'author'     : 'text'
    },
    primary_key =  'comment_id'
)

print("creating Superuser!!!!")

User.create(
    email    = "ronaldo7@pacrt.io",
    id       = uuid.uuid4(),
    name     = "Cristiano Ronaldo",
    password = "$2a$10$jNQco9Xcu.k6KOPJjLEPj.CtmhepnXxAqryzuLK4sW9GT0alkZQN2",
    username = "ronaldo7",
    status   = "0"
)
print("created Superuser!!!!")
# self.cli.insert(
#     table_name = 'inbox',
#     data = {
#         'id': str(uuid.uuid4()),
#         'email': recepient,
#         'issuer_id': issuer_id
#     }
# )