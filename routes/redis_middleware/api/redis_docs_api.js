/**
 * Created by Hardik on 2/9/16.
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
    associate_doc : function(owner_id,user_id,timestamp,doc_link) {
        var KEYS = [owner_id,user_id];
        var ARGV = [timestamp,doc_link];
        return new Promise(function (resolve, reject) {
            luaScriptManager.run(SCRIPT_CONSTANTS.CREATE_DOC_LINK,SCRIPT_CONSTANTS.SCRIPT_FOLDER,KEYS,ARGV).then(function(err,response){
                resolve(err,response)
            },function(err){
                console.log(err);
                reject(err);
            });
        });
    },
    /**
     * get docs associated with User
     * @param user_id
     */
    get_user_docs : function(user_id,cursor){
        var ARGV = [user_id,cursor];
        var KEYS = [];
        return new Promise(
            function (resolve, reject) {
                luaScriptManager.run(SCRIPT_CONSTANTS.GET_USER_DOCS,SCRIPT_CONSTANTS.SCRIPT_FOLDER,KEYS,ARGV).then(function(err,response){
                    resolve(err,response);
                },function(err){
                    console.log(err);
                    reject(err);
                });
            }
        )
    },
    /**
     * Get metadata associated with Documents
     * @param doc_url
     * @returns {Promise}
     */
    getDocMetadata : function(doc_url){
        var ARGV = [doc_url];
        var KEYS = [];
        return new Promise(
            function (resolve, reject) {
                luaScriptManager.run(SCRIPT_CONSTANTS.GET_DOC_METADATA,SCRIPT_CONSTANTS.SCRIPT_FOLDER,KEYS,ARGV).then(function(err,response){
                    resolve(err,response);
                },function(err){
                    console.log(err);
                    reject(err);
                });
            }
        )
    },
    /**
     * Update metadata associated with documents
    * @param meta
    * @returns {Promise}
    */
    updateDocMetaData: function(ARGV, KEYS){
        console.log('########################');
        console.log(ARGV);
        console.log(KEYS);
        return new Promise(
            function(resolve, reject){
                luaScriptManager.run(SCRIPT_CONSTANTS.UPDATE_DOC_METADATA, SCRIPT_CONSTANTS.SCRIPT_FOLDER, KEYS, ARGV).then(function(err, response){
                    resolve(err, response);
                },
                function(err){
                    console.log(err);
                    reject(err);
                });
            }
        )
    }
};

module.exports = upload_doc;
