/**
 * Created by hmistry on 6/9/16.
 */
var express = require("express");
var router = express.Router();
var error_codes = require('../../constants/error-constants');
var inbox_api = require('../../cassandra_middleware/cassandra_inbox_api');

router.get('/markThreadRead/:thread_id',function(req, res, next){
    var data = {
        "thread_id" : req.params.thread_id
    };
    inbox_api.mark_thread_read(data).then(function(result){
        res.send(result);
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

module.exports = router;