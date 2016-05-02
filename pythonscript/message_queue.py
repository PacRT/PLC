import zerorpc, uuid, json
from cassandraclient import CassandraClient


class MessageQueue(object):
    def __init__(self):
        self.cli = CassandraClient()

    def signUp(self, data):
        # ['ntshah02@gmail.com', 'Naiti', 'Shah', '$2a$10$Dd5AcvkoiqLwviXa8Ibg4O6buPjuyhCfRj3zfdEnec4LQdjRHsq2S', '9737234762', 'ntshah', '0', '']
        email = data[0]
        name = data[1] + " " + data[2]
        password = data[3]
        username = data[5]
        status = data[6]
        token_id = data[7]
        id = str(uuid.uuid4())
        rows = self.cli.select(table_name = 'invitation', columns = ['token_id'])
        token_ids = [row.token_id for row in rows]
        if token_id not in token_ids:
            return {
                'error': 'Invalid signup link.',
                'status': 400
            }
        rows = self.cli.select(table_name = 'user')
        for row in rows:
            if row.email == email or row.username == username:
                return {
                    'error': 'Invalid email/username',
                    'status': 400
                }
        self.cli.insert(
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
        self.cli.insert(
            table_name = 'username',
            data = {
                'username': username,
                'id': id
            }
        )
        self.cli.insert(
            table_name = 'email',
            data = {
                'email': email,
                'id': id
            }
        )
        return {
            'status': 200
        }

    def createDoc(self, data):
        id = str(uuid.uuid4())
        category = self.stringify(data['category'])
        file_name = self.stringify(data['filename'])
        doc_url = self.stringify(data['doc_url'])
        owner_id = self.stringify(data['owner_id'])
        issuer_id = self.stringify(data['issuer_id'])
        score = self.stringify(data['score'])
        doc_link = self.stringify(data['doc_link'])
        # Insert in owner table
        self.cli.insert(
            table_name = 'owner',
            data = {
                'id': id,
                'owner_id': owner_id,
                'score': score,
                'doc_url': doc_url
            }
        )
        # Insert in issuer table
        self.cli.insert(
            table_name = 'issuer',
            data = {
                'id': id,
                'issuer_id': issuer_id,
                'score': score,
                'doc_url': doc_url
            }
        )
        # Insert in doc table
        self.cli.insert(
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
        self.cli.insert(
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
        return {
            'status': 200
        }

    def addAuthToken(self, data):
        rows = self.cli.select(table_name = 'authentication')
        for row in rows:
            if row.username == data['username']:
                return {
                    'status': 200
                }
        self.cli.insert(
            table_name = 'authentication',
            data = {
                'username': self.stringify(data['username']),
                'auth_token': data['token']
            },
            ttl = 3600
        )
        return {
            'status': 200
        }

    def verifyAuthToken(self, data):
        rows = self.cli.select(table_name = 'authentication')
        for row in rows:
            if row.username == data['username'] and row.add_auth_token == data['auth_token']:
                return {
                    'status': 200
                }
        return {
            'status': 403
        }

    def deleteAuthToken(self, data):
        rows = self.cli.delete(
            table_name = 'authentication',
            key = 'username',
            value = self.stringify(data['username'])
        )
        return {
            'status': 200
        }

    def isUserNameExists(self, data):
        rows = self.cli.select(table_name = 'user')
        username = data['username']
        for row in rows:
            if row.username == username:
                return {
                    'status': 200
                }
        return {
            'status': 403
        }

    def findByUserName(self, data):
        rows = self.cli.select(table_name = 'user')
        username = data['username']
        for row in rows:
            if row.username == username:
                return {
                    'status': 200,
                    'user': user
                }
        return {
            'status': 400,
            'user': {}
        }

    def createPackage(self, data):
        print "create Package"
        print data
        username = data['username']
        package = json.loads(data['package'])
        package_ids = []
        rows = self.cli.select(table_name = 'packages')
        for row in rows:
            if row.username == username:
                package_ids.append(row.package_ids)
        package_ids.append(package['package_id'])
        package_ids = ", ".join(package_ids)
        self.cli.insert(
            table_name = 'packages',
            data = {
                'username': self.stringify(username),
                'package_ids': self.stringify(package_ids)
            }
        )
        package_id = package['package_id']
        print package
        print type(package)
        print self.stringify(package['recepients'])
        self.cli.insert(
            table_name = 'package',
            data = {
                'id': str(uuid.uuid4()),
                'package_type': self.stringify(package['package_type']),
                'packages_added': self.stringify(package['packages_added']),
                'recepients': self.stringify(package['recepients']),
                'package_id': self.stringify(package_id)
            }
        )
        return {
            'status': 200
        }


    def hello(self, name):
        return "Hello {0}".format(name)

    @staticmethod
    def stringify(data):
        return "'" + str(data) + "'"


s = zerorpc.Server(MessageQueue())
s.bind("tcp://0.0.0.0:4242")
s.run()
