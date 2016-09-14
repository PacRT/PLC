from cassandra.cqlengine import columns
from cassandra.cqlengine.models import Model
import uuid
from cassandra.cqlengine import connection
from cassandra.auth import PlainTextAuthProvider

auth_provider = PlainTextAuthProvider(
                    username='cassandra', password='cassandra')
connection.setup(['127.0.0.1'], "plc", protocol_version=3,auth_provider=auth_provider)

class Thread(Model):
     thread_id      = columns.UUID(primary_key=True)
     date_updated   = columns.DateTime()
     is_read        = columns.Boolean()
     packages       = columns.List(value_type = columns.UUID())
     receiver       = columns.Text()
     sender         = columns.Text()
     thread_name    = columns.Text()

class User(Model):
    email    = columns.Text(primary_key = True)
    id       = columns.UUID()
    name     = columns.Text()
    password = columns.Text()
    status   = columns.Text()
    username = columns.Text()

class SenderList(Model):
    user_id = columns.Text(primary_key=True)
    list_id = columns.UUID()
    sender_list = columns.Set(columns.Text())


class Package(Model):
    id = columns.UUID(primary_key = True)
    package_id = columns.UUID()
    package_type = columns.Text()
    packages_added = columns.Text()
    recepients = columns.List(columns.Text())
    sender_id = columns.Text()
    date_updated = columns.DateTime()

class InboxCommentThread(Model):
    comment_id = columns.UUID(primary_key= True)
    thread_id  = columns.UUID()
    package_id = columns.UUID()
    doc_url    = columns.Text()
    comment    = columns.Text()
    date_added = columns.DateTime()
    author     = columns.Text()

class Docs(Model):
    id = columns.UUID(primary_key = True)
    owner_id = columns.Text()
    score = columns.Text()
    category = columns.Text()
    filename = columns.Text()
    issuer_id = columns.Text()
    doc_url = columns.Text()
    doc_link = columns.Text()
    meta_fields = columns.Map(columns.Text(), columns.Text()),
    thumbnail = columns.Text()

class Authentication(Model):
    username = columns.Text(primary_key= True)
    auth_token = columns.Text()

class Invitation(Model):
    id = columns.UUID()
    token_id =  columns.Text()
    email = columns.Text(primary_key = True)

class ResetPassword(Model):
    id = columns.UUID()
    token_id =  columns.Text()
    email_id = columns.Text(primary_key = True)
