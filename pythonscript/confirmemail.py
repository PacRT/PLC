#import smtplib for the actual sending function
import smtplib, redis, json, sys, logging

# Import the email modules we'll need
from email.mime.text import MIMEText
import ast


logging.basicConfig(filename='/var/log/confirmmemail.log',level=logging.DEBUG)

logging.debug("Starting up....")

s = smtplib.SMTP('paperlessclub.org')
s.set_debuglevel(True)
r = redis.Redis()
p = r.pubsub()

p.subscribe("RegReqConfEmail")

def sendmail(json_msg):
    print(json_msg)
    print(type(json_msg))
    print('I am in send email')
    if json_msg == 1:
        return
    json_msg = json.loads(json_msg)
    try:
        name = json_msg['name']
    except:
        name = "There"

    msg = MIMEText("Hello " + name + "!!! Thanks for the registration request. Check your email for further actions. It may take longer due to system load and verification.")
    msg['Subject'] = "Paperless CLub registration request confirmation message"
    msg['To'] = "hardik.mistry@outlook.com"
    msg['Bcc'] = "chiradip@chiradip.com"
    msg['From'] = "registrar@paperlessclub.org"
    print(dir(s))
    print(msg['From'])
    print(msg.as_string())

    try:
        s.sendmail("registrar@paperlessclub.org", ["hardik.mistry@outlook.com"], msg.as_string())
    finally:
        s.quit()

def sendconfemail(msg):
    #print("this is where I am!!!!")
    #print(type(msg))
    #print(dir(msg))
    sendmail(msg['data'])
    '''print(msg)
    print(type(msg))
    msg = ast.literal_eval(msg)
    msg_json = json.loads(msg)
    print(msg_json)
    try:
        vj_son = json.loads(msg)
        sendmail(vj_son)
    except AttributeError:
        print(msg, " :: Possibly the literal is not string and cannot be treated as JSON")
    except ValueError:
        print("Possible illegal JSON structure")
    except:
        print("something wrong", sys.exc_info())'''


for message in p.listen():
    sendconfemail(message)

# while True:
#     msg = p.get_message()
#     if msg:
#         sendconfemail(msg['data'])
#     time.sleep(0.001)

p.close()

s.quit()


