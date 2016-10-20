var express = require("express");
var router = express.Router();
var doc_search = require('../../elasticSearch/docs');
router.post('/:search_term',function(req, res, next){
    doc_search.search(req.params["search_term"], req.get("USER_NAME"), req.body).then(function (resp) {
        var docs = [];
        var hits = resp.hits.hits;
        for(var i =0 ; i < hits.length; i++){
            var doc = {};
            var row = hits[i]["_source"];
            doc["doc_url"] = row["doc_url"];
            doc["filename"] = row["filename"];
            doc["thumbnail"] = row.thumbnail;
            doc["category"] = row.category;
            doc["docname"] = row.filename;
            docs.push(doc);
        };
        res.send(docs);
    }, function (err) {
        console.trace(err.message);
    });

});

module.exports = router;
