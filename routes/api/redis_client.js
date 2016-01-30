/**
 * Created by Hardik on 1/29/16.
 */
var redis = require("redis");
var client = redis.createClient();
var express = require('express');
var app = express();
client.on("error", function(err) {
    console.log("Error " + err);
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

});
exports.getClient = function(){
    return client;
}