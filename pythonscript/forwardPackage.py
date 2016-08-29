import urllib
import os
import shutil
import smtplib
import json
import uuid
import datetime
import random
import re

from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.MIMEBase import MIMEBase
from email.MIMEText import MIMEText
from email import Encoders
from cassandraclient import CassandraClient
from cql_builder.builder import QueryBuilder
from cql_builder.condition import eq
from TableModels import User
from TableModels import Thread
from TableModels import SenderList
from TableModels import Package
from TableModels import Invitation

GMAIL_USERNAME = 'paperlessclub91@gmail.com'
GMAIL_PASSWORD = 'paperlessclub'
GMAIL_SERVER = 'smtp.gmail.com'
PAPERLESS_USERNAME = 'registrar@paperlessclub.org'
PAPERLESS_SERVER = 'paperlessclub.org'
EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")
LUA = '''
local recepients = redis.call('HMGET', "package:"..KEYS[1], "recepients")
local packages_added = redis.call('HMGET', "package:" ..KEYS[1], "packages_added")
local packages = {}
packages['recepients'] = cjson.decode(recepients[1])
packages['packages_added'] = cjson.decode(packages_added[1])
return cjson.encode(packages)
'''

class PacketForward(object):
    def __init__(self, package_id):
        self.cli = CassandraClient()
        self.package_ids = []
        self.pkg_id = package_id
        self.packages_added = []
        self.sender_id = ""
        ##add Cassandra
        self.dir_name = 'package-' + str(ord(os.urandom(1)))


#         self.recepients = resp['recepients']
#         self.package_ids.append(package_id)
#         self.packages_added.append(resp['packages_added'])

    def get_pkg(self):
        select = (QueryBuilder.select_from('package')
                    .columns('package_type', 'packages_added', 'recepients','sender_id')
                    .where(eq('package_id',self.pkg_id))
                )
        query,args = select.statement()
        self.packages_added = self.cli.queryBuilderSelect(query + ' ALLOW FILTERING',args)
        for pkg in self.packages_added:
            package_type,packages_added,recepients,sender_id = pkg
            self.packages_added = packages_added
            self.recepients = recepients
            self.sender_id = sender_id

    def fetch_packages(self):
        print("fetching packages");
        try:
            os.mkdir('/tmp/'+self.dir_name)
        except OSError:
            pass
        os.chdir('/tmp/'+self.dir_name)
        os.mkdir(str(self.pkg_id))
        os.chdir(str(self.pkg_id))
        packages = json.loads(self.packages_added)
        for package in packages:
            print(package)
            #"/docs/localhost/8080/1,1b92843d40.JPG"
            parts = package['docs_link'].split('/')
            url = "http://"+parts[2]+":"+parts[3]+"/"+parts[4]
            print(url)
            file_name = package['file_name']
            urllib.urlretrieve(url, file_name)
        os.chdir('..')
        try:
            shutil.make_archive('/tmp/'+self.dir_name, 'zip', base_dir='/tmp/'+self.dir_name)
        except Exception as e:
            print e
            print self.dir_name
            print self.dir_name == ''

    def get_email_settings(self, server):
        msg = MIMEMultipart()
        msg['Subject'] = 'Your documents from paperlessclub'
        if server == 'GMAIL':
            s = smtplib.SMTP(GMAIL_SERVER, 587)
            s.ehlo()
            s.starttls()
            s.login(GMAIL_USERNAME, GMAIL_PASSWORD)
            msg['From'] = GMAIL_USERNAME
        else:
            s = smtplib.SMTP(PAPERLESS_SERVER)
            s.set_debuglevel(True)
            msg['From'] = PAPERLESS_USERNAME
        return s, msg

    def forward_packet(self):
        for receiver in self.recepients:
            recepient = ""
            # This check retreives email from paprelessId.. receiever's value will be userid/plc id in this case
            if not EMAIL_REGEX.match(receiver):
                recepient = User.objects(username= receiver).allow_filtering()
                if recepient.count() == 1:
                    recepient = recepient[0]["email"]
                    print(recepient)
                else:
                    print("User Not Found!!")
                    recepient = receiver
            else:
                #it is going to be a email id.
                recepient = receiver

            if EMAIL_REGEX.match(recepient):
                threads = Thread.objects(receiver = recepient, sender= self.sender_id).allow_filtering()
                print(threads.count())
                 # check if thread alreadu exists, if user has already received a pkg from anothre user
                if threads.count() == 1:
                     #update thread with new pkg_id
                     Thread.objects(thread_id=threads[0]["thread_id"]).update(
                                                                            packages__append=[self.pkg_id],
                                                                            date_updated=datetime.datetime.now(),
                                                                            is_read=False
                                                                       )
                else:
                    #create a new thread if it's the first time if user has received a pkg
                    thread_id = uuid.uuid4()
                    Thread.create(
                        thread_id = thread_id,
                        date_updated = datetime.datetime.now(),
                        is_read = False,
                        packages = [self.pkg_id],
                        receiver = recepient,
                        sender = self.sender_id,
                        thread_name= "Thread_" + str(thread_id)
                    )
                #Fetch user by email Id
                users = User.objects(email=recepient)
                if users.count() == 1:
                    #When user is registered
                    for user in users:
                        sender_list = SenderList.objects(user_id = user.username)
                        if sender_list.count() == 0:
                            SenderList.create(
                                user_id = user.username,
                                list_id = uuid.uuid4(),
                                sender_list = {self.sender_id}
                            )
                        else:
                            SenderList.objects(user_id=user.username).update(sender_list__add = {self.sender_id})
                else:
                    #when user is yet to register , update sender_list and forward attachment via email
                    sender_list = SenderList.objects(user_id = recepient)
                    if sender_list.count() == 0:
                        SenderList.create(
                            user_id = recepient,
                            list_id = uuid.uuid4(),
                            sender_list = {self.sender_id}
                        )
                    else:
                        SenderList.objects(user_id=recepient).update(sender_list__add = {self.sender_id})
                    id = str(uuid.uuid4())
                    self.add_invitation(id, recepient)
                    TO = recepient
                    s, msg = self.get_email_settings(server='GMAIL')
                    msg['To'] = TO
                    body = '''
                    To keep your sender's assets secure, PLC allows access via secure email link only for a limited time of 24 hours.
                    If you like to access the assets beyond these limits, please create a free PLC account using the link below and
                    continue accessing these assets while experiencing a rich set of other features securely on the site.
                    '''
                    body = body + "https://52.38.25.88:7979/registration#/{0}".format(id)
                    msg.attach(MIMEText(body, 'plain'))
                    # Attach file
                    part = MIMEBase('application', "octet-stream")
                    part.set_payload(open('/tmp/'+self.dir_name + '.zip', 'rb').read())
                    Encoders.encode_base64(part)
                    part.add_header('Content-Disposition', 'attachment; filename="%s"' % os.path.basename('/tmp/'+self.dir_name + '.zip'))
                    msg.attach(part)

                    try:
                        s.sendmail(msg['From'], TO, msg.as_string())
                    except:
                        pass
                    s.close()

    @staticmethod
    def add_invitation(id, email):
        Invitation.create(id=uuid.uuid4(), email= email, token_id= id)

