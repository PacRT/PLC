/**
 * Created by Hardik on 2/3/16.
 */
var express = require("express");
var router = express.Router();
var docs_api = require('../../redis_middleware/api/redis_docs_api');
var error_codes = require('../../constants/error-constants');
var redis_client = require('../../redis_middleware/redis_client');
 var client = redis_client.getClient();
/**
 * need to refactor this
 */
router.get('/:cursor',function(req, res, next){
    var user_id = req.get("USER_NAME");
    var cursor = req.params["cursor"];
    docs_api.get_user_docs(user_id,cursor).then(function(response){
        var docs_links = [];
        var file_name = [];
        response[1].map(function(link){
            file_name.push(link.substring(link.indexOf("|file_name|") + 11,link.indexOf("|doc_url|")))
            docs_links.push(link.split("|doc_url|").pop())
        });
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
