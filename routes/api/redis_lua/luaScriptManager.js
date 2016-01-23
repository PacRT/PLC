
var Scripto = require('redis-scripto');
var redis = require("redis");

var redisClient = redis.createClient();
var scriptManager = new Scripto(redisClient);
var path = require('path');

var scripts = {
    run: function (script, keys, values) {

        scriptManager.loadFromFile(script + ".lua", __dirname +"/scripts/"+ script + ".lua");
        return scriptManager.run(script + ".lua", keys, values, function (err, result) {
            console.log(result);
        });
    }
}

module.exports = scripts;

