import zerorpc

c = zerorpc.Client()
c.connect("tcp://50.250.218.65:4242")
print c.hello("this is working!!!!")

#/usr/local/lib/python2.7.10/bin/python -V