var express = require("express");
var router = express.Router();
var doc_search = require('../../elasticSearch/docs');
router.get('/:search_term',function(req, res, next){
    doc_search.search(req.params["search_term"], req.get("USER_NAME")).then(function (resp) {
        var docs_link = [];
        var files_name = [];
        var hits = resp.hits.hits;
        for(var i =0 ; i < hits.length; i++){
            console.info(hits[i]);
            docs_link.push(hits[i]["_source"]["doc_url"]);
            files_name.push(hits[i]["_source"]["filename"]);
        }
        res.send({
            "docs_link" : docs_link,
            "files_name" : files_name
        });
    }, function (err) {
        console.trace(err.message);
    });

});

module.exports = router;
