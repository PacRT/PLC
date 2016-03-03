/**
 * Created by Hardik on 1/17/16.
 */
var express = require("express");
var router = express.Router();
var user_api = require('../../redis_middleware/api/redis_user_api');
var redis_client = require('../../redis_middleware/redis_client');
var client = redis_client.getClient();
var API_CONSTANTS = require('../../constants/api-constants');
var auth_checker = require('../middleware/auth_checker');
var error_codes = require('../../constants/error-constants');
var bcrypt = require('bcrypt');
var async = require('async');

router.get(API_CONSTANTS.USER_EXISTS,function(req,res){
   user_api.isUserNameExists(req.params.userName).then(function(response){
       res.send(response);
   },function(error){
       res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
   });
});
router.post("/isAuthenticationExists",auth_checker,function(req,res){
    console.log(req.body);
    res.send("cool!!")
});
router.post(API_CONSTANTS.USER_REGISTER,function(req,res){
    var user = req.body;
    async.waterfall([
        function(cb){
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(user[3], salt, function(err, hash) {
                    if(err) return cb(err,'')
                    cb(null,hash)
                });
            });
        },
        function(passwordHash){
            user[3] = passwordHash;
            user_api.registerUser(user).then(function(response){
                console.log(response);
                client.publish("RegReqConfEmail", "{\"name\" : \"" + user.name + "\", \"username\": \"" + user.username + "\", \"email\": \"" + user.email + "\", \"status\" : \"" + user.status + "\" }");
                client.publish("createUserDirectory","{\"user_name\" :\"" + response.split(":")[0]+"\"}");
                res.send(true)
            },function(error){
                res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
            });
        }
    ],function(err, result){
        if(err){
            console.log(err);
            res.status(600).send(JSON.stringify({error:true,"errorMsg":err.toString()}));
        }
        console.log(result);
    });





});

module.exports = router;