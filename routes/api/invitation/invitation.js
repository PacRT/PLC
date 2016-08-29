var express = require("express");
var router = express.Router();
var error_codes = require('../../constants/error-constants');
var python_api = require('../../cassandra_middleware/cassandra_python_api');

router.post('/',function(req, res, next){
    console.log(req.body["emails"]);
    python_api.call_python("sendInvites",req.body["emails"]).then(function(result){
        res.send(result);
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

module.exports = router;