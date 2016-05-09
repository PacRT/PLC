/**
 * Created by Hardik on 2/9/16.
 */
var luaScriptManager = require('../lua_script/luaScriptManager');
var SCRIPT_CONSTANTS = require('../../constants/lua_script_constants')["DOCS_API"];
var zerorpc = require("zerorpc");


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
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        var data = {
            'issuer_id': issuer_id,
            'owner_id': owner_id,
            'score': timestamp,
            'doc_url': doc_link
        };
        client.invoke("create_doc_link", data, function(error, response) {
            console.log(response);
        });
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
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        var data = {
            'user_id': user_id
        };
        client.invoke("get_user_docs", data, function(error, response) {
            console.log(response);
        });
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
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        var data = {
            'doc_url': doc_url
        };
        client.invoke("get_doc_metadata", data, function(error, response) {
            console.log(response);
        });
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
    * @param doc_url
    * @param category
    * @param file_name
    * @param username
    * @returns {Promise}
    */
    updateDocMetaData: function(doc_url, category, file_name, username){
        var ARGV = [doc_url, username, category, file_name];
        var KEYS = ['doc_url', 'username', 'category', 'file_name'];
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
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
    },
    /**
     * Get Documents by type as requested by User
     * @param user_id
     * @param cursor
     * @param category
     * @returns {Promise}
     */
    get_doc_by_type : function(user_id,cursor,category){
        var ARGV = [user_id, cursor, category];
        var KEYS = [];
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        var data = {
            'owner_id': user_id,
            'category': category
        };
        client.invoke("get_doc_by_type", data, function(error, response) {
            console.log(response);
        });
        return new Promise(
            function(resolve,reject){
                luaScriptManager.run(SCRIPT_CONSTANTS.GET_DOC_BY_TYPE,SCRIPT_CONSTANTS.SCRIPT_FOLDER,KEYS,ARGV).then(function(err,response){
                    resolve(err,response);
                },function(err){
                    console.log(err);
                    reject(err);
                });
            }
        )
    },
    /**
     * Get Docs shared with user
     * @param user_id
     * @param cursor
     * @returns {Promise}
     */
    get_shared_docs : function(user_id,cursor){
        var ARGV = [user_id,cursor];
        var KEYS = [];
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        var data = {
            'owner_id': user_id
        };
        client.invoke("get_shared_docs", data, function(error, response) {
            console.log(response);
        });
        return new Promise(
            function (resolve, reject) {
                luaScriptManager.run(SCRIPT_CONSTANTS.GET_SHARED_DOCS,SCRIPT_CONSTANTS.SCRIPT_FOLDER,KEYS,ARGV).then(function(err,response){
                    resolve(err,response);
                },function(err){
                    console.log(err);
                    reject(err);
                });
            }
        )
    }
};

module.exports = upload_doc;
