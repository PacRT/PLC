/**
 * Created by Hardik on 2/3/16.
 */
var redis_client = require('../redis_client');
var client = redis_client.getClient();
var luaScriptManager = require('../lua_script/luaScriptManager');
var  _ = require("underscore");
var SCRIPT_FOLDER = "upload_doc";

var upload_doc = {
    /**
     * Associate uploaded file with user
     * @param owner_id
     * @param user_id
     * @param timestamp
     * @param doc_link
     * @returns {Promise}
     */
    associate_doc : function(owner_id,user_id,timestamp,doc_link) {
        var keys = [owner_id,user_id];
        var values = [timestamp,doc_link];
        return new Promise(function (resolve) {
            luaScriptManager.run('create_doc_link',SCRIPT_FOLDER,keys,values).then(function(err,response){
                resolve(err,response)
            });
        });
    }

};

module.exports = upload_doc;