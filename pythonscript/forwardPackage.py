import requests
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
    def __init__(self, packages, fetcher):
        self.package_ids = []
        self.packages_added = []
        for package_id in packages:
            resp = json.loads(fetcher(keys=[package_id], args = []))
            if not resp['packages_added']:
                pass
            self.recepients = resp['recepients']
            self.package_ids.append(package_id)
            self.packages_added.append(resp['packages_added'])
        self.dir_name = 'package-' + str(ord(os.urandom(1)))

    def fetch_packages(self):
        try:
            os.mkdir(self.dir_name)
        except OSError:
            pass
        os.chdir(self.dir_name)
        for index, package_id in enumerate(self.package_ids):
            os.mkdir(package_id)
            os.chdir(package_id)
            packages_added = self.packages_added[index]
            for package in packages_added:
                doc_url = package['doc_url'].split('/')
                url = 'http://localhost:8080/' + doc_url[-1]
                file_name = package['file_name']
                urllib.urlretrieve(url, file_name)
            os.chdir('..')
        os.chdir('..')
        shutil.make_archive(self.dir_name, 'zip', base_dir=self.dir_name)

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
            id = str(uuid.uuid4())
            self.add_to_redis(id, recepient)
            TO = recepient
            s, msg = self.get_email_settings(server='GMAIL')
            msg['To'] = TO
            body = '''
            To keep your sender's assets secure, PLC allows access via secure email link only for a limited time of 24 hours.
            If you like to access the assets beyond these limits, please create a free PLC account using the link below and
            continue accessing these assets while experiencing a rich set of other features securely on the site.
            '''
            body = body + "http://localhost:8080/signup/{0}".format(id)
            msg.attach(MIMEText(body, 'plain'))
            # Attach file
            part = MIMEBase('application', "octet-stream")
            part.set_payload(open(self.dir_name + '.zip', 'rb').read())
            Encoders.encode_base64(part)
            part.add_header('Content-Disposition', 'attachment; filename="%s"' % os.path.basename(self.dir_name + '.zip'))
            msg.attach(part)

            try:
                s.sendmail(msg['From'], TO, msg.as_string())
            except:
                pass
            s.close()

    @staticmethod
    def add_to_redis(id, email):
        store_invitation = '''redis.call('SET', "invitation:"..KEYS[1].. ":email", KEYS[2])'''
        fetcher = r.register_script(store_invitation)
        fetcher(keys=[id, email], args=[])


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
