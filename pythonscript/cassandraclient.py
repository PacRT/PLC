from cassandra import AlreadyExists
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from cql_builder.builder import QueryBuilder
#from cassandra.query import SimpleStatement


class CassandraClient(object):
    def __init__(self):
        auth_provider = PlainTextAuthProvider(
                    username='cassandra', password='cassandra')
        cluster = Cluster(['127.0.0.1'], auth_provider=auth_provider)

        self.session = cluster.connect()
        self.session.set_keyspace('plc')

    def insert(self, table_name, data, uuid = False, ttl = None):
        keys = []
        values = []
        for key in data.keys():
            keys.append(str(key))
        for value in data.values():
            values.append(str(value))
        columns = ','.join(data.keys())
        params = []
        for x in data.values():
            if isinstance( x, int ):
                params.append('\'' + str(x) + '\'')
            else:
                params.append('\'' + x + '\'')
        values = ','.join(params)
        if uuid:
            columns = columns + ',' + 'id'
            values = values + ',' + 'uuid()'
        query = "INSERT INTO %s (%s) VALUES (%s)" % (table_name, columns, values)
        query = query.encode('utf-8')
        print(query)
        if ttl:
            query = query + " USING TTL {0}".format(ttl)
        result = self.session.execute(query)
        return result
    def select(self, table_name, columns=[]):
        select_params = '*'
        if columns:
            select_params = ', '.join(columns)
        query = "SELECT {0} FROM {1}".format(select_params, table_name)
        rows = self.session.execute(query)
        return rows

    def select(self, table_name, columns=[]):
        select_params = '*'
        if columns:
            select_params = ', '.join(columns)
        query = "SELECT {0} FROM {1}".format(select_params, table_name)
        rows = self.session.execute(query)
        return rows

    def delete(self, table_name, key, value):
        query = "DELETE FROM %s WHERE %s = '%s'" % (table_name, key, value)
        print(query)
        rows = self.session.execute(query)
        return rows

    def queryBuilderInsert(self, query, args):
        return self.session.execute(query,args)

    def queryBuilderSelect(self,query, args):
        return self.session.execute(query, args)