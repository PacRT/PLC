
var Scripto = require('redis-scripto');
var redis = require("redis");

var redisClient = redis.createClient();
var scriptManager = new Scripto(redisClient);
var path = require('path');

var scripts = {
    run: function (script, keys, values) {
        return new Promise(function(resolve){
            scriptManager.loadFromFile(script + ".lua", __dirname +"/scripts/"+ script + ".lua");
            scriptManager.run(script + ".lua", keys, values, function (err, result) {
                resolve(err,result);
            });
        })

    }
}

module.exports = scripts;

