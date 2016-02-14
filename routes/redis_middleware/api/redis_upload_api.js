/**
 * Created by Hardik on 2/3/16.
 */
var luaScriptManager = require('../lua_script/luaScriptManager');
var SCRIPT_CONSTANTS = require('../../constants/lua_script_constants')["DOCS_API"];

var upload_doc = {
    /**
     * Associate uploaded file with user
     * @param owner_id
     * @param user_id
     * @param timestamp
     * @param doc_link
     * @returns {Promise}
     */
    associate_doc : function(owner_id,user_id,timestamp,doc_link,category,file_name,doc_url) {
        var KEYS = [owner_id,user_id,"category","file_name"];
        var ARGV = [timestamp, doc_link, category, file_name, doc_url];
        return new Promise(function (resolve,reject) {
            luaScriptManager.run(SCRIPT_CONSTANTS.CREATE_DOC_LINK,SCRIPT_CONSTANTS.SCRIPT_FOLDER,KEYS,ARGV).then(function(err,response){
                resolve(err,response)
            },function(err){
                console.log(err);
                reject(err);
            });
        });
    }

};

module.exports = upload_doc;