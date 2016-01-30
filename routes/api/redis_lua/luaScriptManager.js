
var Scripto = require('redis-scripto');
var redis_client = require('../redis_client');
var scriptManager = new Scripto(redis_client.getClient());

var scripts = {
    run: function (script, keys, values) {
        return new Promise(function(resolve,reject){
            scriptManager.loadFromFile(script + ".lua", __dirname +"/scripts/"+ script + ".lua");
            scriptManager.run(script + ".lua", keys, values, function (err, result) {
                if(err)
                    resolve(err);
                else
                    resolve(result);
            });
        });
    }
};

module.exports = scripts;

