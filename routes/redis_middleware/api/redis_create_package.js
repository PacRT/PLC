/**
 * Created by Hardik on 3/22/16.
 */
var luaScriptManager = require('../lua_script/luaScriptManager');
var SCRIPT_CONSTANTS = require('../../constants/lua_script_constants')["CREATE_PKG"];

var createFwdPkgAPI = {
    /**
     * save created packages in redis
     * @param userName
     * @param packages
     * @returns {Promise}
     */
    create_and_fwd_pkg : function(userName,package) {
        var ARGV = [userName, package];
        var KEYS = [];
        return new Promise(function (resolve, reject) {
            luaScriptManager.run(SCRIPT_CONSTANTS.CREATE_PKG, SCRIPT_CONSTANTS.SCRIPT_FOLDER, KEYS, ARGV).then(function (response) {
                resolve(response);
            }, function (err) {
                console.log(err);
                reject(err);
            });
        });
    }
};

module.exports = createFwdPkgAPI;