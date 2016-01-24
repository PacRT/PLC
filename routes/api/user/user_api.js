var redis = require("redis");

var client = redis.createClient();
var luaScriptManager = require('../redis_lua/luaScriptManager');
var  _ = require("underscore");
var express = require('express');
var app = express();
client.on("error", function(err) {
    console.log("Error " + err);
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

});

exports.registerUser = function(user) {
    return new Promise(function (resolve) {
        luaScriptManager.run('registration',[],_.values(user)).then(function(err,response){
            resolve(err,response)
        });
    });
};