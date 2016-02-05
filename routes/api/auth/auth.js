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
/**
 * need to change this
 * @type {string}
 */
var secret = "fea5e81ac8ca77622bed1c2132a021f9";
var error_codes = require('../../constants/error-constants');

passport.use('local-passport',new LocalStrategy(function(user_name, password, done) {
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
        if (err) { return res.send(err); }
        if (!user) { return res.send(err); }
        var redis_password = user.split("|")[2];
        if (redis_password != req.body.password) {
            res.status(403).send({
                success: false,
                message: "Incorrect Password."
            });
        }
        var auth_token = crypto.createHmac('sha256', secret)
            .update(user+new Date())
            .digest('hex');
        auth_api.addAuthToken(user.split("|")[1],auth_token).then(function(response){
            var response = response.split("|");
            res.send({
                "user_name" : response[0],
                "api_token" : response[1]
            });
        },function(error){
            res.send({error:true,"errorMsg":error_codes[error]})
        });
    })(req, res, next);
});

module.exports = router;