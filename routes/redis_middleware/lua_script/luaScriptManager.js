
var Scripto = require('redis-scripto');
var redis_client = require('../redis_client');
var scriptManager = new Scripto(redis_client.getClient());
var scripts = {
    /**
     * Lua Script Loader
     * @param script name of the Script which is redis_lua/scripts folder
     * @param keys array of keys
     * @param values array of values
     * @param folder folder name of script
     * @returns {Promise}
     */
    run: function (script,folder, keys, values) {
        return new Promise(function(resolve,reject){
            scriptManager.loadFromFile(script + ".lua", __dirname +"/scripts/"+folder+"/"+ script + ".lua");
            scriptManager.run(script + ".lua", keys, values, function (err, result) {
                if(err){
                    /**
                     * send custom lua error code from script
                     */
                    var error_code = (err.toString().split("::: ")[1]).trim();
                    reject(error_code.trim());
                }else{
                    resolve(result);
                }
            });
        });
    }
};

module.exports = scripts;

