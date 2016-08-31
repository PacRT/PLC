/**
 * Created by Hardik on 8/30/16.
 */
var express = require("express");
var router = express.Router();
var error_codes = require('../../constants/error-constants');
var python_api = require('../../cassandra_middleware/cassandra_python_api');

router.post('/sendResetPasswordLink',function(req, res, next){
    python_api.call_python("sendResetPwdLink",req.body["email"]).then(function(result){
        res.send(result);
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

module.exports = router;