/**
 * Created by Hardik on 1/30/16.
 */
var redis_client = require('../redis_client');
var client = redis_client.getClient();
var luaScriptManager = require('../lua_script/luaScriptManager');
var SCRIPT_FOLDER = "auth";

var Auth = {
    /**
     * Adding AuhToken in DB
     * @param userName
     * @param authToken
     * @returns {Promise}
     */
    addAuthToken : function(userName,authToken){
        var values = [userName,authToken];
        return new Promise(function(resolve,reject){
            luaScriptManager.run('add_auth_token',SCRIPT_FOLDER,[],values).then(function(response){
                resolve(response);
            },function(err){
                console.log(err);
                reject(err);
            });
        });
    },
    /**
     * Verifying AuthToken
     * @param userName
     * @param authtoken
     */
    verifyAuthToken : function(userName, authtoken){
        var values = [userName,authtoken];
        return new Promise(function(resolve,reject){
            luaScriptManager.run('verify_auth_token',SCRIPT_FOLDER,[],values).then(function(response){
                resolve(response);
            },function(err){
                console.log(err);
                reject(err);
            });
        });
    }

};

module.exports = Auth;