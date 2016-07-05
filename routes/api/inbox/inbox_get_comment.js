/**
 * Created by hmistry on 7/4/16.
 */
var express = require("express");
var router = express.Router();
var inbox_api = require('../../cassandra_middleware/cassandra_inbox_api');
var error_codes = require('../../constants/error-constants');

router.post('/getComment',function(req, res, next){
    var data = {};
    data = req.body;
    /*data["sender"] = req.headers["user_name"];*/
    console.log(data);
    inbox_api.get_comment(data).then(function(result){
        res.send(result);
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

module.exports = router;