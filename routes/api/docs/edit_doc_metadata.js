var express = require("express");
var router = express.Router();
var docs_api = require('../../redis_middleware/api/redis_docs_api');
var error_codes = require('../../constants/error-constants');

router.post('/updateMetaData/', function(req, res, next){
    var doc_url = req.body['doc_url'];
    var ARGV = [];
    var KEYS = [];
    doc_url = doc_url.split("docs")[1].split("/");
    console.log(doc_url);
    doc_url = "http://" + doc_url[1] + ":" + doc_url[2] + "/" + doc_url[3];
    console.log(doc_url);
    KEYS.push('doc_url');
    KEYS.push('username');
    KEYS.push('category');
    KEYS.push('file_name');
    ARGV.push(doc_url);
    ARGV.push(req.headers['user_name']);
    ARGV.push(req.body['category']);
    ARGV.push(req.body['file_name']);

    docs_api.updateDocMetaData(ARGV, KEYS).then(function(response){
        res.send({
          'message': 'Document meta updated successfully'
        });
    },
    function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

module.exports = router;
