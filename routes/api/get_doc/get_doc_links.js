/**
 * Created by Hardik on 2/3/16.
 */
var express = require("express");
var router = express.Router();
var redis_client = require('../../redis_middleware/redis_client');
var client = redis_client.getClient();
/**
 * need to refactor this
 */
var fullzscan = function(indexname, fn) {
    var result;
    result = [];
    return zscan(indexname, 0, result, fn);
};

var zscan = function(indexname, start, acc, fn) {
    client.zscan(indexname, start, function(error, resp) {
        if (!error) {
            console.log("Zscan response[0]: " + resp[0]);
            console.log("Zscan response[1]: " + resp[1]);
            acc = acc.concat(resp[1]);
            console.log("Accumulator: " + acc);
            if (parseInt(resp[0]) !== 0) {
                zscan(indexname, parseInt(resp[0]), acc);
            }
            return fn(acc);
        }
    });
};
router.get('',function(req, res, next){
    var user_id = req.get("USER_NAME");
    fullzscan("owner:" + user_id + ":docs", function(result) {
        var doc, doc1, doc2, docFid, docPort, docUrl, docs, fids, len, num, _i, _ref;
        console.log("Result: " + result);
        len = result.length;
        console.log("Result Length: " + len);
        docs = [];
        fids = [];
        for (num = _i = 0, _ref = len - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; num = 0 <= _ref ? ++_i : --_i) {
            if (len > 0) {
                if (num % 2 === 0) {
                    doc = result[num];
                    doc1 = doc.substring(doc.indexOf("://") + 3);
                    doc2 = doc1.substring(0, doc1.indexOf("/"));
                    docUrl = doc2.substring(0, doc2.indexOf(":"));
                    docPort = doc2.substring(doc2.indexOf(":") + 1);
                    docFid = doc1.substring(doc1.indexOf("/") + 1);
                    fids.push(docFid);
                    docs.push("/documents/" + docUrl + "/" + docPort + "/" + docFid);
                }
            }
        }
        //req.session.fids = fids;
        return res.send(docs);
    });
});

module.exports = router;
