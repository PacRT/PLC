/**
 * Created by hmistry on 6/4/16.
 */
var express = require("express");
var router = express.Router();
var inbox_api = require('../../cassandra_middleware/cassandra_inbox_api');
var error_codes = require('../../constants/error-constants');
var inbox_data = require('./inbox_data');
router.get('/getThreads',function(req, res, next){
    inbox_api.get_threads(req.body.data).then(function(result){
        res.send(inbox_data);
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });

});

module.exports = router;