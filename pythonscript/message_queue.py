import zerorpc, uuid
from cassandraclient import CassandraClient


class MessageQueue(object):
    def signUp(self, data):
        # ['ntshah02@gmail.com', 'Naiti', 'Shah', '$2a$10$Dd5AcvkoiqLwviXa8Ibg4O6buPjuyhCfRj3zfdEnec4LQdjRHsq2S', '9737234762', 'ntshah', '0', '']
        email = data[0]
        name = data[1] + " " + data[2]
        password = data[3]
        username = data[5]
        status = data[6]
        token_id = data[7]
        id = str(uuid.uuid4())
        cli = CassandraClient()
        rows = cli.select(table_name = 'invitation', columns = ['token_id'])
        token_ids = [row.token_id for row in rows]
        if token_id not in token_ids:
            return {
                'error': 'Invalid signup link.',
                'status': 400
            }
        rows = cli.select(table_name = 'user')
        for row in rows:
            if row.email == email or row.username == username:
                return {
                    'error': 'Invalid email/username',
                    'status': 400
                }
        cli.insert(
            table_name = 'user',
            data = {
                'email': email,
                'name': name,
                'password': password,
                'username': username,
                'status': status,
                'id': id
            }
        )
        return {
            'status': 200
        }

    def createDoc(self, data):
        id = str(uuid.uuid4())
        cli = CassandraClient()
        category = "'" + data['category'] + "'"
        file_name = "'" + data['file_name'] + "'"
        doc_url = "'" + data['doc_url'] + "'"
        owner_id = "'" + data['owner_id'] + "'"
        #print type(owner_id)
        issuer_id = "'" + data['user_id'] + "'"
        score = "'" + str(data['score']) + "'"
        doc_link = "'" + data['doc_link'] + "'"
        # Insert in owner table
        cli.insert(
            table_name = 'owner',
            data = {
                'id': id,
                'owner_id': owner_id,
                'score': score,
                'doc_url': doc_url
            }
        )
        # Insert in issuer table
        cli.insert(
            table_name = 'issuer',
            data = {
                'id': id,
                'issuer_id': issuer_id,
                'score': score,
                'doc_url': doc_url
            }
        )
        # Insert in doc table
        cli.insert(
            table_name = 'doc',
            data = {
                'id': id,
                'owner_id': owner_id,
                'issuer_id': issuer_id,
                'doc_url': doc_url,
                'category': category,
                'filename': file_name
            }
        )
        # Insert in docs table
        cli.insert(
            table_name = 'docs',
            data = {
                'id': id,
                'owner_id': owner_id,
                'score': score,
                'category': category,
                'filename': file_name,
                'issuer_id': issuer_id,
                'doc_url': doc_url
            }
        )

        return

    def hello(self, name):
        return "Hello {0}".format(name)



s = zerorpc.Server(MessageQueue())
s.bind("tcp://0.0.0.0:4242")
s.run()
