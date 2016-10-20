var client = require('./ealsticSearch-client').getClient();
var _ = require("lodash");

function search_docs(query_string, user_name, dateRange) {
    var search_query = {
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
                "filter": {
                    "bool": {
                        "must": [
                            {
                                "term": {
                                    "owner_id": user_name
                                }
                            }
                        ]
                    }
                }
            }
        }
    };
    if(dateRange){
        var range_query =  {
                "range": {
                    "score": {
                        "gte": dateRange['gte'],
                        "lte": dateRange['lte']
                    }
                }
        };
        search_query.query.filtered.filter.bool.must.push(range_query);
    }
    return client.search({
        index: 'plc',
        type: 'docs',
        body: search_query
    })

}
exports.search = function(query_string, user_name, dateRange){
   return search_docs(query_string, user_name, dateRange)
}
