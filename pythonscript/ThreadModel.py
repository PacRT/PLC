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
     packages       = columns.List(value_type = columns.Text())
     receiver       = columns.Text()
     sender         = columns.Text()
     thread_name    = columns.Text()