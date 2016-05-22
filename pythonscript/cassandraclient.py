from cassandra import AlreadyExists
from cassandra.cluster import Cluster
#from cassandra.query import SimpleStatement


class CassandraClient(object):
    def __init__(self):
        cluster = Cluster(['127.0.0.1'])
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
        params = [ '\'' + x + '\'' for x in data.values() ]
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