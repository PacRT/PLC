import smtplib
import uuid
from email.mime.multipart import MIMEMultipart
from email.MIMEBase import MIMEBase
from email.MIMEText import MIMEText
from email import Encoders

from TableModels import Invitation

GMAIL_USERNAME = 'paperlessclub91@gmail.com'
GMAIL_PASSWORD = 'paperlessclub'
GMAIL_SERVER = 'smtp.gmail.com'
PAPERLESS_USERNAME = 'registrar@paperlessclub.org'
PAPERLESS_SERVER = 'paperlessclub.org'

class SendInvitation(object):
    def __init__(self, email):
        self.email = email
        self.invitation_id = str(uuid.uuid4())

    def get_email_settings(self,server):
        msg = MIMEMultipart()
        msg['Subject'] = 'Your Invitation from PaperLessClub'
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

    def sendInvitationEmail(self):
        s, msg = self.get_email_settings(server='GMAIL')
        msg['To'] = self.email
        body = '''
        To keep your sender's assets secure, PLC allows access via secure email link only for a limited time of 24 hours.
        If you like to access the assets beyond these limits, please create a free PLC account using the link below and
        continue accessing these assets while experiencing a rich set of other features securely on the site.
        '''
        body = body + "https://52.38.25.88:7979/registration#/{0}".format(self.invitation_id)
        msg.attach(MIMEText(body, 'plain'))
        try:
            s.sendmail(msg['From'], self.email , msg.as_string())
            Invitation.create(id=uuid.uuid4(), email= self.email, token_id= self.invitation_id)
        except:
            pass
        s.close()

