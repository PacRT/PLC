/**
 * Created by hmistry on 6/4/16.
 */
var express = require("express");
var router = express.Router();
var inbox_api = require('../../cassandra_middleware/cassandra_inbox_api');
var error_codes = require('../../constants/error-constants');
var inbox_data = require('./inbox_data');
router.get('/getThreads',function(req, res, next){
    var data = {
        "user_id" : req.headers["user_name"]
    };
    inbox_api.get_threads(data).then(function(result){
        res.send(result);
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });

});

module.exports = router;