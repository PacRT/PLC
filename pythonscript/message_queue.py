import zerorpc
from cassandra.cluster import Cluster

class MessageQueue(object):
    def __init__(self):
        cluster = Cluster(['127.0.0.1'])
        session = cluster.connect()

    def hello(self, name):
        return "Hello {0}".format(name)

s = zerorpc.Server(MessageQueue())
s.bind("tcp://0.0.0.0:4242")
s.run()
