/**
 * Created by Hardik on 1/30/16.
 */
var luaScriptManager = require('../lua_script/luaScriptManager');
var SCRIPT_CONSTANTS = require('../../constants/lua_script_constants')["AUTH"];
var zerorpc = require("zerorpc");


var Auth = {
    /**
     * Adding AuhToken in DB
     * @param userName
     * @param authToken
     * @returns {Promise}
     */
    addAuthToken : function(userName,authToken){
        var ARGV = [userName,authToken];
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        var data = {
            'username': userName,
            'token': authToken
        };
        return new Promise(function(resolve,reject){
            client.invoke("addAuthToken", data, function(error, response) {
                console.log(error);
                console.log(response);
                if(_.has(response,"error")){
                    reject(response)
                }else{
                    resolve(response);
                }
            });
        });

        /*return new Promise(function(resolve,reject){
            luaScriptManager.run(SCRIPT_CONSTANTS.ADD_TOKEN,SCRIPT_CONSTANTS.SCRIPT_FOLDER,[],ARGV).then(function(response){
                resolve(response);
            },function(err){
                console.log(err);
                reject(err);
            });
        });*/
    },
    /**
     * Verifying AuthToken
     * @param userName
     * @param authtoken
     */
    verifyAuthToken : function(userName, authtoken){
        var ARGV = [userName,authtoken];
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        var data = {
            'username': userName,
            'token': authToken
        };
        client.invoke("verifyAuthToken", data, function(error, response) {
            console.log(response);
        });
        return new Promise(function(resolve,reject){
            luaScriptManager.run(SCRIPT_CONSTANTS.VERIFY_TOKEN,SCRIPT_CONSTANTS.SCRIPT_FOLDER,[],ARGV).then(function(response){
                resolve(response);
            },function(err){
                console.log(err);
                reject(err);
            });
        });
    },
    /**
     * Deleting auth token once user is logged out
     * @param userName
     * @returns {Promise}
     */
    deleteAuthToken : function(userName){
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        var data = {
            'username': userName
        };
        return new Promise(function(resolve,reject){
            client.invoke("deleteAuthToken", data, function(error, response) {
                console.log(error);
                console.log(response);
                if(_.has(response,"error")){
                    reject(response)
                }else{
                    resolve(response);
                }
            });
        });

        var ARGV = [userName];
        return new Promise(function(resolve,reject){
            luaScriptManager.run(SCRIPT_CONSTANTS.DELETE_TOKEN,SCRIPT_CONSTANTS.SCRIPT_FOLDER,[],ARGV).then(function(response){
                resolve(response);
            },function(err){
                console.log(err);
                reject(err);
            });
        });
    }

};

module.exports = Auth;
