/**
 * Created by Hardik on 3/13/16.
 */
var express = require("express");
var router = express.Router();
var docs_api = require('../../redis_middleware/api/redis_docs_api');
var error_codes = require('../../constants/error-constants');

router.get('/:cursor/:category',function(req, res, next){
    var user_id = req.get("USER_NAME");
    var cursor = req.params["cursor"];
    var category = req.params["category"];
    docs_api.get_doc_by_type(user_id,cursor,category).then(function(response){
        var docs_links = [];
        var file_name = [];
        response[1].map(function(link){
            file_name.push(link.substring(link.indexOf("|file_name|") + 11,link.indexOf("|doc_url|")));
            docs_links.push(link.split("|doc_url|")[1]);
        });
        console.info(docs_links);
        var result1 = {
            "cursor" : response[0],
            "docs_link" : docs_links,
            "files_name" : file_name
        };
        res.send(result1);
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

module.exports = router;
