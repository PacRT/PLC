import requests
import urllib
import os
import shutil
import smtplib

from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.MIMEBase import MIMEBase
from email import Encoders

COMMASPACE = ', '
GMAIL_USERNAME = 'paperlessclub91@gmail.com'
GMAIL_PASSWORD = 'paperlessclub'

class PacketForward(object):
    def __init__(self):
        self.package_id = 'abcd-efgh-ijkl'
        self.doc_url = 'http://localhost:8080/6,01288b2dd0.png'
        self.email = 'varunshah1106@gmail.com'

    def fetch_data(self):
        try:
            os.mkdir(self.package_id)
        except OSError:
            pass
        os.chdir(self.package_id)
        urllib.urlretrieve(self.doc_url, "temp")
        os.chdir('..')
        shutil.make_archive(self.package_id, 'zip', base_dir = self.package_id)
        self.forward_packet()
        shutil.rmtree(self.package_id)
        os.remove(self.package_id + '.zip')

    def forward_packet(self):
        msg = MIMEMultipart()

        # Email config
        FROM = GMAIL_USERNAME
        TO = self.email
        SUBJECT = 'Your documents from paperlessclub'
        TEXT = 'Hello'

        # Msg settings
        msg['Subject'] = SUBJECT
        msg['From'] = FROM
        msg['To'] = TO

        # Attach file
        part = MIMEBase('application', "octet-stream")
        part.set_payload(open(self.package_id + '.zip', 'rb').read())
        Encoders.encode_base64(part)
        part.add_header('Content-Disposition', 'attachment; filename="%s"' % os.path.basename(self.package_id + '.zip'))
        msg.attach(part)

        s = smtplib.SMTP('smtp.gmail.com', 587)
        s.ehlo()
        s.starttls()
        s.login(GMAIL_USERNAME, GMAIL_PASSWORD)
        s.sendmail(FROM, TO, msg.as_string())
        s.close()

PacketForward().fetch_data()
