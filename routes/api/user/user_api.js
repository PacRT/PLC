var redis = require("redis");

var client = redis.createClient();
var luaScriptManager = require('../redis_lua/luaScriptManager');
var  _ = require("underscore");
client.on("error", function(err) {
    console.log("Error " + err);
});

exports.registerUser = function(user, fn) {
    console.log("Calling: registerUser");
    luaScriptManager.run('incr-store',["links:counter","links:urls"],["http://www.halfbloodprince.com"]);
};