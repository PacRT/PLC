var luaScriptManager = require('../lua_script/luaScriptManager');
var SCRIPT_FOLDER = "user";
var SCRIPT_CONSTANTS = require('../../constants/lua_script_constants')["USER"];
var zerorpc = require("zerorpc");
var _ = require("underscore");

var User = {
    /**
     * For Registering User
     * @param user
     * @returns {Promise}
     */
    registerUser : function(user) {
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        if (user[7] == null){
            user[7] = ""
        };
        var data = user.map(function(value){
            return value.toString();
        });
        return new Promise(function (resolve,reject) {
            client.invoke("signUp", data, function(error, response) {
                console.log(error);
                console.log(response);
                if(_.has(response,"error")){
                    reject(response)
                }else{
                    resolve(response);
                }
            });
        });


       /* return new Promise(function (resolve,reject) {
            console.log(user);
            var ARGV = user.map(function(value){return value.toString()});
            luaScriptManager.run(SCRIPT_CONSTANTS.REGISTRATION,SCRIPT_CONSTANTS.SCRIPT_FOLDER,[],ARGV).then(function(err,response){
                resolve(err,response)
            },function(err){
                console.log(err);
                reject(err);
            });
        });*/
    },
    /**
     * Find User Name by Id
     * @param userName
     * @returns {Promise}
     */
    findByUserName : function(userName){
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        var data = {
            'username': userName
        };
        return new Promise(function(resolve,reject){
            client.invoke("findByUserName", data, function(error, response) {
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
            var KEYS = [userName];
            luaScriptManager.run(SCRIPT_CONSTANTS.FIND_BY_USER_NAME,SCRIPT_CONSTANTS.SCRIPT_FOLDER,KEYS,[]).then(function(response){
                resolve(response);
            },function(err){
                console.log(err);
                reject(err);
            });
        });*/
    },
    isUserNameExists : function(userName){
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        var data = {
            'username': userName
        };
        client.invoke("isUserNameExists", data, function(error, response) {
            console.log(response);
        });
        return new Promise(function(resolve,reject){
            var ARGV = [userName];
            luaScriptManager.run(SCRIPT_CONSTANTS.IS_USER_EXISTS,SCRIPT_CONSTANTS.SCRIPT_FOLDER,[],ARGV).then(function(response){
                resolve(response);
            },function(err){
                console.log(err);
                reject(err);
            });
        });
    }

};

module.exports = User;
