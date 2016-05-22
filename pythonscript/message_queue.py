import zerorpc, uuid, json
from cassandraclient import CassandraClient


class MessageQueue(object):
    def __init__(self):
        self.cli = CassandraClient()

    def signUp(self, data):
        # ["ntshah02@gmail.com", "Naiti", "Shah", "$2a$10$Dd5AcvkoiqLwviXa8Ibg4O6buPjuyhCfRj3zfdEnec4LQdjRHsq2S", "9737234762", "ntshah", "0", ""]
        email = data[0]
        name = data[1] + " " + data[2]
        password = data[3]
        username = data[5]
        status = data[6]
        token_id = data[7]
        id = uuid.uuid4()
        rows = self.cli.select(table_name = "invitation", columns = ["token_id"])
        token_ids = []
        for row in rows:
            token_ids.append(row[0])
        if token_id not in token_ids:
            return {
                "error": "Invalid signup link.",
                "status": 400
            }
        rows = self.cli.select(table_name = "user")
        for row in rows:
            if row.email == email or row.username == username:
                return {
                    "error": "Invalid email/username",
                    "status": 400
                }

        self.cli.insert(
            table_name = "user",
            data = {
                "email": email,
                "name": name,
                "password": password,
                "username": username,
                "status": status
            },
            uuid = True
        )
        self.cli.insert(
            table_name = "username",
            data = {
                "username": username
            },
            uuid = True

        )
        self.cli.insert(
            table_name = "email",
            data = {
                "email": email
            },
            uuid = True
        )
        return {
            "status": 200
        }

    def createDoc(self, data):
        id = str(uuid.uuid4())
        category = self.stringify(data["category"])
        file_name = self.stringify(data["filename"])
        doc_url = self.stringify(data["doc_url"])
        owner_id = self.stringify(data["owner_id"])
        issuer_id = self.stringify(data["issuer_id"])
        score = self.stringify(data["score"])
        doc_link = self.stringify(data["doc_link"])
        # Insert in owner table
        self.cli.insert(
            table_name = "owner",
            data = {
                "id": id,
                "owner_id": owner_id,
                "score": score,
                "doc_url": doc_url
            }
        )
        # Insert in issuer table
        self.cli.insert(
            table_name = "issuer",
            data = {
                "id": id,
                "issuer_id": issuer_id,
                "score": score,
                "doc_url": doc_url
            }
        )
        # Insert in doc table
        self.cli.insert(
            table_name = "doc",
            data = {
                "id": id,
                "owner_id": owner_id,
                "issuer_id": issuer_id,
                "doc_url": doc_url,
                "category": category,
                "filename": file_name
            }
        )
        # Insert in docs table
        self.cli.insert(
            table_name = "docs",
            data = {
                "id": id,
                "owner_id": owner_id,
                "score": score,
                "category": category,
                "filename": file_name,
                "issuer_id": issuer_id,
                "doc_url": doc_url
            }
        )
        return {
            "status": 200
        }

    def addAuthToken(self, data):
        rows = self.cli.select(table_name = "authentication")
        for row in rows:
            if row.username == data["username"]:
                return {
                    "status": 200,
                    "auth_token": row.auth_token
                }
        auth_token = str(uuid.uuid4())
        self.cli.insert(
            table_name = "authentication",
            data = {
                "username": data["username"],
                "auth_token": auth_token
            },
            ttl = 3600
        )
        return {
            "status": 200,
            "auth_token" : auth_token
        }

    def verifyAuthToken(self, data):
        rows = self.cli.select(table_name = "authentication")
        for row in rows:
            if row.username == data["username"] and row.add_auth_token == data["auth_token"]:
                return {
                    "status": 200
                }
        return {
            "status": 403
        }

    def deleteAuthToken(self, data):
        rows = self.cli.delete(
            table_name = "authentication",
            key = "username",
            value = data["username"]
        )
        return {
            "status": 200
        }

    def isUserNameExists(self, data):
        rows = self.cli.select(table_name = "user")
        username = data["username"]
        for row in rows:
            if row.username == username:
                return {
                    "status": 200
                }
        return {
            "status": 403
        }

    def findByUserName(self, data):
        rows = self.cli.select(table_name = "user")
        username = data["username"]
        for row in rows:
            if row.username == username:
                user = {
                    "email" : row.email,
                    "name" : row.name,
                    "password" : row.password,
                    "status" : row.status,
                    "username" : row.username
                }
                return {
                    "status": 200,
                    "user": user
                }
        return {
            "status": 400,
            "error": "UserName/Password Incorrect."
        }

    def createPackage(self, data):
        print "create Package"
        print data
        username = data["username"]
        package = json.loads(data["package"])
        package_ids = []
        rows = self.cli.select(table_name = "packages")
        for row in rows:
            if row.username == username:
                package_ids.append(row.package_ids)
        package_ids.append(package["package_id"])
        package_ids = ", ".join(package_ids)
        self.cli.insert(
            table_name = "packages",
            data = {
                "username": self.stringify(username),
                "package_ids": self.stringify(package_ids)
            }
        )
        package_id = package["package_id"]
        print package
        print type(package)
        print self.stringify(package["recepients"])
        self.cli.insert(
            table_name = "package",
            data = {
                "id": str(uuid.uuid4()),
                "package_type": self.stringify(package["package_type"]),
                "packages_added": self.stringify(package["packages_added"]),
                "recepients": self.stringify(package["recepients"]),
                "package_id": self.stringify(package_id)
            }
        )
        return {
            "status": 200
        }

    def create_doc_link(self, data):
        owner_id = data["owner_id"]
        score = data["score"]
        doc_url = data["doc_url"]
        issuer_id = data["issuer_id"]
        category = data["category"]
        file_name = data["filename"]
        uid = str(uuid.uuid4())
        self.cli.insert(
            table_name = "owner",
            data = {
                "id": uid,
                "owner_id": owner_id,
                "score": score,
                "doc_url": doc_url
            }
        )
        self.cli.insert(
            table_name = "issuer",
            data = {
                "id": uid,
                "issuer_id": issuer_id,
                "score": score,
                "doc_url": doc_url
            }
        )
        self.cli.insert(
            table_name = "doc",
            data = {
                "id": uid,
                "owner_id": owner_id,
                "doc_url": doc_url,
                "issuer_id": issuer_id,
                "category": category,
                "filename": file_name
            }
        )
        self.cli.insert(
            table_name = "docs",
            data = {
                "id": uid,
                "owner_id": owner_id,
                "score": score,
                "category": category,
                "filename": file_name,
                "issuer_id": issuer_id,
                "doc_url": doc_url
            }
        )
        return {
            "status": 200
        }

    def get_doc_by_type(self, data):
        doc_urls = []
        rows = self.cli.select(table_name="docs")
        for row in rows:
            if rows.category == data["category"] and row.owner_id == data["owner_id"]:
                doc_urls.append(row.doc_url)
        return {
            "status": 200,
            "doc_urls": doc_urls
        }

    def get_user_docs(self):
        docs = []
        rows = self.cli.select(table_name="docs")
        owner_id = data["user_id"]
        for row in rows:
            if row.owner_id == owner_id:
                docs.append({
                    "score": row.score,
                    "doc_url": row.doc_url
                })
        return {
            "status": 200,
            "docs": docs
        }

    def get_doc_metadata(self, data):
        doc_url = data["doc_url"]
        rows = self.cli.select(table_name = "doc")
        for row in rows:
            if row.doc_url == doc_url:
                doc = {
                    "id": row.id,
                    "owner_id": row.owner_id,
                    "issuer_id": row.issuer_id,
                    "doc_url": row.doc_url,
                    "category": row.category,
                    "filename": row.filename
                }
        return {
            "doc": doc,
            "status": 200
        }

    def get_shared_docs(self, data):
        pass

    def add_pkg(self, data):
        issuer_id = data["issuer_id"]
        package_ids = data["package_ids"]
        # email_id = data["email_id"]
        for package_id in package_ids:
            rows = self.cli.select(table_name = "package")
            for row in rows:
                if row.package_id == package_id:
                    recepients = row.recepients
                    docs = row.packages_added
            for recepient in recepients:
                username = checkUserExists(recepient)
                for doc in docs:
                    doc_url = doc["doc_url"]
                    if not username:
                        rows = self.cli.select(table_name = "docs")
                        for row in rows:
                            if  row.doc_url == doc_url:
                                issuer_id = row.issuer_id
                                self.cli.insert(
                                    table_name = "inbox",
                                    data = {
                                        "id": str(uuid.uuid4()),
                                        "email": recepient,
                                        "issuer_id": issuer_id
                                    }
                                )
                    else:
                        # """
                        # local is_doc_exists  = redis.call("SSCAN","inbox:"..user_name,0,"MATCH","*|"..doc_url)
                        # if next(is_doc_exists[2]) == nil then
                        #     local doc_sets_issuer =  redis.call("SSCAN","docs:"..issuer_id,0,"MATCH","*|"..doc_url)
                        #     print(doc_sets_issuer[2][1])
                        #     redis.call("SADD","inbox:"..user_name ,doc_sets_issuer[2][1])
                        #     print("added packages!!!")
                        # else print("do something") end
                        # """
                        pass

    def update_doc_metadata(self, data):
        pass

    def hello(self, name):
        return "Hello {0}".format(name)

    @staticmethod
    def checkUserExists(email_id):
        rows = self.cli.select(table_name = "email")
        username = None
        for row in rows:
            if row.email == email_id:
                user_id = row.id
                rows = self.cli.select(table_name = "username")
                for row in rows:
                    if row.id == user_id:
                        username = row.username
        return username

    @staticmethod
    def stringify(data):
        return """ + str(data) + """


s = zerorpc.Server(MessageQueue())
s.bind("tcp://0.0.0.0:4242")
s.run()
