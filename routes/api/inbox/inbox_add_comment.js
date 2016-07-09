/**
 * Created by hmistry on 7/4/16.
 */
var express = require("express");
var router = express.Router();
var inbox_api = require('../../cassandra_middleware/cassandra_inbox_api');
var error_codes = require('../../constants/error-constants');

router.post('/addComment',function(req, res, next){
    var data = {};
    data = req.body;
    console.info(data);
    data["sender"] = req.headers["user_name"];
    inbox_api.add_comment(data).then(function(result){
        res.send(result);
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

module.exports = router;