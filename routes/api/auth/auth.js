/**
 * Created by Hardik on 1/17/16.
 */
var express = require("express");
var router = express.Router();

var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var user_api = require('../../redis_middleware/api/redis_user_api');
var auth_api = require('../../redis_middleware/api/redis_auth_api');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var uuid = require('node-uuid');
var _ = require('underscore');
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
    process.nextTick(function() {
        user_api.findByUserName(user_name).then(function(response){
            console.log(user_name);
            return done(null,response);
        },function(error) {
            console.log(error);
            return done(error);
        });
    });
}));

router.post('',function(req, res, next){
    passport.authenticate('local-passport', function(err, user, info) {
        console.log(user);
        if (!_.has(user,"user")) {
            return res.send({
                error: true,
                errorMsg: "Incorrect Username or Password."
            });
        }
        if (_.has(user,"error")) {  return res.send({error:true,"errorMsg": user["error"]}) }
        bcrypt.compare(req.body.password, user["user"]["password"], function(err, result) {
            if(result){
                return generateAuthToken()
            }else{
                return res.send({
                    error: true,
                    errorMsg: "Incorrect Username or Password."
                });
            }
        });
        function generateAuthToken(){
            auth_api.addAuthToken(user["user"]["username"]).then(function(response){
                console.log("asdfasdfasdfasdfdsaf");
                res.send({
                    "user_name" : user["user"]["username"],
                    "api_token" : response["auth_token"]
                });
            },function(error){
                res.send({error:true,"errorMsg":error_codes[error]})
            });
        }
    })(req, res, next);
});

module.exports = router;
