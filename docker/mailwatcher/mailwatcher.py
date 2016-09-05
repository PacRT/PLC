__author__ = 'chiradip'
from pprint import pprint
import pyinotify
import email
from email.feedparser import FeedParser
import os
import json
import urllib
import requests
import zerorpc
import datetime

def getFileId():
    rawreply = urllib.urlopen('http://52.38.25.88:9333/dir/assign')
    content = rawreply.read()
    data = json.loads(content.decode('utf8'))
    pprint(data)
    fid = data["fid"]
    url = data["url"].replace("localhost","52.38.25.88")
    final_url = "http://" + url + "/" + fid
    print(final_url)
    return final_url

def Load(type, fname, owner, issuer, issdname):
    url = getFileId()
    files = {'file': open(fname, 'rb')}
    r = requests.post(url, files=files)
    print("File is uploading the type is: ", type)
    extension = type.split('/')[1]
    url = url.replace("52.38.25.88","localhost")
    print("Extension: " + extension)
    finalurl = url+ "." +extension
    print("Final URL: " + finalurl)
    print(r.text)
    doc_url = "/docs/"+finalurl.split("//")[1].replace(":",'/')
    rpc_client = zerorpc.Client()
    rpc_client.connect("tcp://52.38.25.88:4242")
    data = {
        'category' : '---',
        'file_name' : fname.split(":")[2],
        'doc_url' : doc_url,
        'owner_id' : owner.split("@")[0],
        'issuer_id' : issuer,
        'score' : str(datetime.datetime.now()),
        'doc_link' : finalurl
    }
    rpc_client.createDoc(data)

def processPart(part, owner, issuer, issdname):
    ctype = part.get_content_type()
    print("CTYPE: " +ctype)
    if ctype in ['image/jpeg','image/jpg', 'image/png','application/pdf', 'text/html']:
        if(ctype != "text/html"):
            fw = open(issuer + ":" + owner + ":" + part.get_filename(), 'wb')
        else:
            fw = open(issuer + ":" + owner + ":embedded_html", 'wb')
        fw.write(part.get_payload(decode=True))
        fname=fw.name
        fw.close()
        print(fname)
        Load(ctype, fname, owner, issuer, issdname)

def ExtractAndLoad(obj):
    fp = FeedParser()
    try:
        fp.feed(open(obj, "rb").read())
        msg = fp.close()
        #if msg.is_multipart():
        #print('multipart')
        tovar  = msg['to']
        owner = email.utils.parseaddr(tovar)[1]
        print(owner)
        fromvar = msg['from']
        issdname = email.utils.parseaddr(fromvar)[0]
        print(issdname)
        issuer = email.utils.parseaddr(fromvar)[1]
        print(issuer)
        for part in msg.walk():
            processPart(part, owner, issuer, issdname)
    except OSError:
        print("No Need to parse the event..")
        print("New Directory created!")


wm = pyinotify.WatchManager()  # Watch Manager
mask = pyinotify.IN_DELETE | pyinotify.IN_CREATE  # watched events

class EventHandler(pyinotify.ProcessEvent):
    def process_IN_CREATE(self, event):
        if '/tmp/' not in event.pathname:
            print ("Creating:", event.pathname)
            ExtractAndLoad(event.pathname)

    def process_IN_DELETE(self, event):
        print ("Removing:", event.pathname)

handler = EventHandler()
notifier = pyinotify.Notifier(wm, handler)
wdd = wm.add_watch('/data/', mask, auto_add=True, rec=True)

notifier.loop()
