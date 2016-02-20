/**
 * Created by Hardik on 1/17/16.
 */
var express = require("express");
var router = express.Router();
var users = ["hardik","smit","shivang","varun","chiradip","sandeep","vijay","sudhakar"];
var user_api = require('../../redis_middleware/api/redis_user_api');
var redis_client = require('../../redis_middleware/redis_client');
var client = redis_client.getClient();
var API_CONSTANTS = require('../../constants/api-constants');
var auth_checker = require('../middleware/auth_checker');
var error_codes = require('../../constants/error-constants');


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
    user_api.registerUser(user).then(function(response){
        console.log(response);
        client.publish("RegReqConfEmail", "{\"name\" : \"" + user.name + "\", \"username\": \"" + user.username + "\", \"email\": \"" + user.email + "\", \"status\" : \"" + user.status + "\" }");
        res.send(true)
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

module.exports = router;