var redis_client = require('../redis_client');
var client = redis_client.getClient();
var luaScriptManager = require('../redis_lua/luaScriptManager');
var  _ = require("underscore");


var User = {
    registerUser : function(user) {
        return new Promise(function (resolve) {
            luaScriptManager.run('registration',[],_.values(user)).then(function(err,response){
                resolve(err,response)
            });
        });
    },
    findByUserName : function(userName){
        return new Promise(function(resolve){
            luaScriptManager.run('findByUserName',[userName],[]).then(function(response){
                resolve(response);
            });
        });
    }

};

module.exports = User;