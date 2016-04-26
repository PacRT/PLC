from cassandra import AlreadyExists
from cassandra.cluster import Cluster
#from cassandra.query import SimpleStatement


class CassandraClient(object):
    def __init__(self):
        cluster = Cluster(['127.0.0.1'])
        self.session = cluster.connect()
        self.session.set_keyspace('plc')

    def insert(self, table_name, data):
        #print data
        keys = []
        values = []
        for key in data.keys():
            keys.append(str(key))
        for value in data.values():
            values.append(str(value))
        columns = '(' + ', '.join(keys) + ')'
        vals = '(' + ', '.join(values) + ')'
        query = "INSERT INTO {0} {1} VALUES {2}".format(table_name, columns, vals)
        print query
        print query[162:166]
        result = self.session.execute(query)
        return result

    def select(self, table_name, columns=[]):
        select_params = '*'
        if columns:
            select_params = ', '.join(columns)
        query = "SELECT {0} FROM {1}".format(select_params, table_name)
        rows = self.session.execute(query)
        return rows

"""
from cassandra import AlreadyExists
from cassandra.cluster import Cluster
#from cassandra.query import SimpleStatement


class CassandraClient(object):
    def __init__(self):
        cluster = Cluster(['127.0.0.1'])
        self.session = cluster.connect()
        self.session.set_keyspace('plc')

    def insert(self, table_name, data):
        #print data
        keys = []
        values = []
        for key in data.keys():
            keys.append(str(key))
        for value in data.values():
            values.append(str(value))
        columns = '(' + ', '.join(keys) + ')'
        vals = '(' + ', '.join(values) + ')'
        query = "INSERT INTO {0} {1} VALUES {2}".format(table_name, columns, vals)
        print query
        print query[71:75]
        result = self.session.execute(query)
        return result

    def select(self, table_name, columns=[]):
        select_params = '*'
        if columns:
            select_params = ', '.join(columns)
        query = "SELECT {0} FROM {1}".format(select_params, table_name)
        rows = self.session.execute(query)
        return rows

"""
