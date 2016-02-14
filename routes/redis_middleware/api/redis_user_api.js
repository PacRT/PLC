var luaScriptManager = require('../lua_script/luaScriptManager');
var SCRIPT_FOLDER = "user";

var User = {
    /**
     * For Registering User
     * @param user
     * @returns {Promise}
     */
    registerUser : function(user) {
        return new Promise(function (resolve,reject) {
            var ARGV = _.values(user);
            luaScriptManager.run('registration',SCRIPT_FOLDER,[],ARGV).then(function(err,response){
                resolve(err,response)
            },function(err){
                console.log(err);
                reject(err);
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
            var KEYS = [userName];
            luaScriptManager.run('findByUserName',SCRIPT_FOLDER,KEYS,[]).then(function(response){
                resolve(response);
            },function(err){
                console.log(err);
                reject(err);
            });
        });
    }

};

module.exports = User;