import urllib
import os
import shutil
import smtplib
import redis
import json
import uuid

from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.MIMEBase import MIMEBase
from email.MIMEText import MIMEText
from email import Encoders
from cassandraclient import CassandraClient
from cql_builder.builder import QueryBuilder
from cql_builder.condition import eq


GMAIL_USERNAME = 'paperlessclub91@gmail.com'
GMAIL_PASSWORD = 'paperlessclub'
GMAIL_SERVER = 'smtp.gmail.com'
PAPERLESS_USERNAME = 'registrar@paperlessclub.org'
PAPERLESS_SERVER = 'paperlessclub.org'

LUA = '''
local recepients = redis.call('HMGET', "package:"..KEYS[1], "recepients")
local packages_added = redis.call('HMGET', "package:" ..KEYS[1], "packages_added")
local packages = {}
packages['recepients'] = cjson.decode(recepients[1])
packages['packages_added'] = cjson.decode(packages_added[1])
return cjson.encode(packages)
'''

r = redis.Redis()
p = r.pubsub()


class PacketForward(object):
    def __init__(self, package_id):
        self.cli = CassandraClient();
        self.package_ids = []
        self.pkg_id = package_id;
        self.packages_added = []
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

    def fetch_packages(self):
        try:
            os.mkdir('/tmp/'+self.dir_name)
        except OSError:
            pass
        os.chdir('/tmp/'+self.dir_name)
        for index, package_id in enumerate(self.package_ids):
            os.mkdir('/tmp/'+package_id)
            os.chdir('/tmp/'+package_id)
            packages_added = self.packages_added[index]
            for package in packages_added:
                doc_url = package['docs_link'].split('/')
                url = 'http://localhost:7979/' + doc_url[-1]
                print(url)
                file_name = package['file_name']
                urllib.urlretrieve(url, file_name)
            os.chdir('..')
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
        for recepient in self.recepients:
            print("&&&&&&&&&&&&&&&&&&&")
            print(recepient)
            print("&&&&&&&&&&&&&&&&&&&")
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
            body = body + "http://paperlessclub.org:7979/registration#/{0}".format(id)
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
        print id
        print email
        cli = CassandraClient()
        rows = cli.select(table_name = 'invitation')
        for row in rows:
            if row.email == email:
                return {
                    'error': 'Email already exists.',
                    'status': 400
                }

        insert = (QueryBuilder.insert_into("invitation")
            .values(
                id = uuid.uuid4(),
                email = email,
                token_id = id
            )
        )
        query, args = insert.statement();
        cli.queryBuilderInsert(query,args);

def main():
    p.subscribe("forwardPackage")
    fetcher = r.register_script(LUA)
    for message in p.listen():
        if type(message['data']) == str:
            data = json.loads(message['data'])['packages']
            forwarder = PacketForward(data, fetcher)
            forwarder.fetch_packages()
            forwarder.forward_packet()
            dir_name = forwarder.dir_name
            shutil.rmtree(dir_name)
            os.remove(dir_name + '.zip')


if __name__ == '__main__':
    main()
