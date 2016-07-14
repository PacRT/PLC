#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
bin=${DIR}/../bin
lib=${DIR}/../lib



echo '
{
    "type" : "jdbc",
    "jdbc" : {
        "url" : "jdbc:cassandra://127.0.0.1:9160/plc",
        "user" : "cassandra",
	"password" : "cassandra",
        "locale" : "en_US",
        "sql" : "SELECT id as \"_id\",category,doc_link,doc_url,filename,issuer_id,owner_id,score FROM plc.docs",
        "elasticsearch" : {
             "hosts" : "localhost",
             "port" : 9300
        },
        "index" : "plc",
        "type" : "docs"
        },
       "schedule" : "0 0-59 0-23 ? * *"
}
' | java \
-cp "${lib}/*" \
-Dlog4j.configurationFile=${bin}/log4j2.xml \
 org.xbib.tools.Runner \
 org.xbib.tools.JDBCImporter


