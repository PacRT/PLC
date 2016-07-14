
#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
bin=${DIR}/../bin
lib=${DIR}/../lib



echo '
{
    "type" : "jdbc",
    "jdbc" : {
        "driver" : "org.xbib.jdbc.csv.CsvDriver",
        "url" : "jdbc:xbib:csv:/Users/dodlavijaykumar/Documents/startup_sense?columnTypes=date,string,string,integer,integer&separator=,",
        "user" : "",
        "password" : "",
        "sql" : "select * from parking_utlization_data.csv",
        "elasticsearch" : {
             "hosts" : "localhost",
             "port" : 9300
        },
        "index" : "simon_u",
        "type" : "utlization"
        }
}
' | java \
-cp "${lib}/*" \
-Dlog4j.configurationFile=${bin}/log4j2.xml \
 org.xbib.tools.Runner \
 org.xbib.tools.JDBCImporter


