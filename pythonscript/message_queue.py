import zerorpc, uuid, json
from cassandraclient import CassandraClient
from cql_builder.builder import QueryBuilder
from forwardPackage import PacketForward
from cql_builder.condition import all_eq,eq

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
        select = (QueryBuilder.select_from('invitation')
                    .columns('email', 'token_id')
                    .where(all_eq(
                            email= email,
                            token_id= token_id
                      ))
        )
        query,args = select.statement()
        rows = self.cli.queryBuilderSelect(query + ' ALLOW FILTERING',args)
        if not rows:
            return {
                "error": "Invalid signup link.",
                "status": 400
            }
        select = (QueryBuilder.select_from('user')
                            .columns('email', 'username')
                            .where(eq('email', email))
                )
        query,args = select.statement()
        rows = self.cli.queryBuilderSelect(query + ' ALLOW FILTERING',args)
        if rows:
            return {
                "error": "Email Already Exits",
                "status": 400
            }

        select = (QueryBuilder.select_from('user')
                 .columns('email', 'username')
                 .where(eq('username', username))
        )
        query,args = select.statement()
        rows = self.cli.queryBuilderSelect(query + ' ALLOW FILTERING',args)
        if rows:
            return {
                "error": "UserName Already Exits",
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
        category = data["category"]
        file_name = data["file_name"]
        doc_url = data["doc_url"]
        owner_id = data["owner_id"]
        issuer_id = data["issuer_id"]
        score = data["score"]
        doc_link = data["doc_link"]
        # Insert in owner table
        self.cli.insert(
            table_name = "owner",
            data = {
                "owner_id": owner_id,
                "score": score,
                "doc_url": doc_url
            },
            uuid = True
        )
        # Insert in issuer table
        self.cli.insert(
            table_name = "issuer",
            data = {

                "issuer_id": issuer_id,
                "score": score,
                "doc_url": doc_url
            },
            uuid = True
        )
        # Insert in doc table
        self.cli.insert(
            table_name = "doc",
            data = {
                "owner_id": owner_id,
                "issuer_id": issuer_id,
                "doc_url": doc_url,
                "category": category,
                "filename": file_name,
                "doc_link" :  doc_link
            },
            uuid = True
        )
        # Insert in docs table
        self.cli.insert(
            table_name = "docs",
            data = {
                "owner_id": owner_id,
                "score": score,
                "category": category,
                "filename": file_name,
                "issuer_id": issuer_id,
                "doc_url": doc_url,
                "doc_link" : doc_link
            },
            uuid = True
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
        package_id = uuid.uuid4();
        insert = (QueryBuilder.insert_into("package")
            .values(
                id = uuid.uuid4(),
                package_type = package["package_type"],
                packages_added = json.dumps(package["packages_added"]),
                package_id = package_id,
                recepients = package["recepients"],
                sender_id = username
            )
        )
        query, args = insert.statement();
        self.cli.queryBuilderInsert(query,args);

        ##Forward Package
        pkg_forwarder = PacketForward(package_id)
        pkg_forwarder.get_pkg()
        pkg_forwarder.fetch_packages()
        pkg_forwarder.forward_packet()
        return {
            "status": 200
        }

    def create_doc_link(self, data):
        owner_id = data["owner_id"]
        score = data["score"]
        doc_url = data["doc_url"]
        issuer_id = data["issuer_id"]
        category = data["category"]
        file_name = data["file_name"]
        self.cli.insert(
            table_name = "owner",
            data = {
                "owner_id": owner_id,
                "score": score,
                "doc_url": doc_url
            },
           uuid = True
        )
        self.cli.insert(
            table_name = "issuer",
            data = {
                "issuer_id": issuer_id,
                "score": score,
                "doc_url": doc_url
            },
           uuid = True
        )
        self.cli.insert(
            table_name = "doc",
            data = {
                "owner_id": owner_id,
                "doc_url": doc_url,
                "issuer_id": issuer_id,
                "category": category,
                "filename": file_name
            },
           uuid = True
        )
        self.cli.insert(
            table_name = "docs",
            data = {
                "owner_id": owner_id,
                "score": score,
                "category": category,
                "filename": file_name,
                "issuer_id": issuer_id,
                "doc_url": doc_url
            },
           uuid = True
        )
        return {
            "status": 200
        }

    def get_doc_by_type(self, data):
        docs_link = []
        files_name = []
        print(data)
        select = (QueryBuilder.select_from('docs')
                    .columns('doc_url', 'filename')
                    .where(all_eq(
                            category= data["category"],
                            owner_id= data["owner_id"]
                      ))
        )
        query,args = select.statement()
        print(query);
        rows = self.cli.queryBuilderSelect(query + ' ALLOW FILTERING',args)
        for row in rows:
            doc_url,file_name = row
            docs_link.append(doc_url)
            files_name.append(file_name)
        result = {
            "docs_link": docs_link,
            "files_name" : files_name
        }
        return {
           "status": 200,
           "result" : result
        }

    def get_user_docs(self, data):
        docs_link = []
        files_name = []
        rows = self.cli.select(table_name="docs")
        owner_id = data["user_id"]
        print(owner_id);
        for row in rows:
            print(row.owner_id)
            if str(row.owner_id) == owner_id:
                docs_link.append(row.doc_url)
                files_name.append(row.filename)
        result = {
         "docs_link": docs_link,
         "files_name" : files_name
        }
        return {
            "status": 200,
            "result" : result
        }

    def get_doc_metadata(self, data):
        doc_url = data["doc_url"]
        doc = {}
        rows = self.cli.select(table_name = "doc")
        for row in rows:
            if row.doc_link == doc_url:
                doc = {
                    "Category": row.category,
                    "Document Name": row.filename
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
