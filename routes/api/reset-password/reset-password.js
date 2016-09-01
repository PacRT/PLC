/**
 * Created by Hardik on 8/30/16.
 */
var express = require("express");
var router = express.Router();
var error_codes = require('../../constants/error-constants');
var python_api = require('../../cassandra_middleware/cassandra_python_api');
var bcrypt = require('bcrypt');

router.post('/sendResetPasswordLink',function(req, res, next){
    python_api.call_python("sendResetPwdLink",req.body["email"]).then(function(result){
        res.send(result);
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

router.post('/resetPassword',function(req, res, next){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body["password"], salt, function(err, hash) {
            req.body["password"] =  hash;
            python_api.call_python("resetPassword",req.body).then(function(result){
                console.log("resusususullllt");
                console.log(result);
                res.send(result);
            },function(error){
                console.log("errrorrorororo");
                console.log(error);
                res.status(600).send(JSON.stringify({error:true,"errorMsg": error["error"]}));
            });
        });
    });

});

module.exports = router;