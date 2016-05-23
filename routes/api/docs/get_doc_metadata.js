/**
 * Created by Hardik on 3/6/16.
 */
var express = require("express");
var router = express.Router();
var docs_api = require('../../redis_middleware/api/redis_docs_api');
var error_codes = require('../../constants/error-constants');

router.get('/metadata/:vs/:prt/:fid',function(req, res, next){
    console.log(req.params.doc_url);
    var doc_url = "http://" + req.params.vs + ":" + req.params.prt + "/" + req.params.fid;
    docs_api.getDocMetadata(doc_url).then(function(response){

        var meta_data = {
            "meta_keys" : _.keys(response.doc),
            "meta_values" :_.values(response.doc)
        }
        res.send(meta_data)
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

module.exports = router;
