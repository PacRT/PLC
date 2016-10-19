var client = require('./ealsticSearch-client').getClient();

function search_docs(query_string, user_name) {
    return client.search({
        index: 'plc',
        type: 'docs',
        body: {
            "_source": [
                "doc_url",
                "filename",
                "thumbnail",
                "category"
            ],
            "query":{
                "filtered":{
                    "query":{
                        "query_string":{
                            "query":"*"+query_string+"*",
                            "fields": [
                                "category",
                                "filename",
                                "owner_id"
                            ]
                        }
                    },
                    "filter":{
                        "term":{
                            "owner_id": user_name
                        }
                    }
                }
            }
        }
    })

}


exports.search = function(query_string, user_name){
   return search_docs(query_string, user_name)
}
