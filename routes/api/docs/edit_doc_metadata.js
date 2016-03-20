var express = require("express");
var router = express.Router();
var docs_api = require('../../redis_middleware/api/redis_docs_api');
var error_codes = require('../../constants/error-constants');

router.post('/updateMetaData/', function(req, res, next){
    var doc_url = req.body['doc_url'];
    doc_url = doc_url.split("docs")[1].split("/");
    doc_url = "http://" + doc_url[0] + ":" + doc_url[1] + "/" + doc_url[2];
    docs_api.updateDocMetaData(doc_url, req.body['category'], req.body['file_name'], req.body['username']).then(function(response){
        res.send({
          'message': 'Document meta updated successfully'
        });
    },
    function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

module.exports = router;
