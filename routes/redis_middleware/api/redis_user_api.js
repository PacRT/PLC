var redis_client = require('../redis_client');
var client = redis_client.getClient();
var luaScriptManager = require('../lua_script/luaScriptManager');
var SCRIPT_FOLDER = "user";

var User = {
    /**
     * For Registering User
     * @param user
     * @returns {Promise}
     */
    registerUser : function(user) {
        return new Promise(function (resolve) {
            luaScriptManager.run('registration',SCRIPT_FOLDER,[],_.values(user)).then(function(err,response){
                resolve(err,response)
            });
        });
    },
    /**
     * Find User Name by Id
     * @param userName
     * @returns {Promise}
     */
    findByUserName : function(userName){
        return new Promise(function(resolve,reject){
            luaScriptManager.run('findByUserName',SCRIPT_FOLDER,[userName],[]).then(function(response){
                resolve(response);
            },function(err){
                console.log(err);
                reject(err);
            });
        });
    }

};

module.exports = User;