/**
 * Created by Hardik on 1/17/16.
 */
var express = require("express");
var router = express.Router();
var redis_client = require('../redis_client');
var client = redis_client.getClient();
var API_CONSTANTS = require('../../constants/api-constants');
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var user_api = require('./../redis_api/redis_user_api');

passport.use('local-passport',new LocalStrategy(function(username, password, done) {
    process.nextTick(function() {
        user_api.findByUserName(username).then(function(response){
            return done(null, response);
        });
    });
}));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

router.post('',passport.authenticate('local-passport'),function(req,res){
    res.send("it is ok!! you can go ahead!!");
});

module.exports = router;