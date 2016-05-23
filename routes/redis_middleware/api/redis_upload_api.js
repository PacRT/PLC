/**
 * Created by Hardik on 2/3/16.
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
    associate_doc : function(owner_id,user_id,timestamp,doc_link,category,file_name,doc_url) {
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        var data = {
            'owner_id': owner_id,
            'issuer_id': user_id,
            'score': timestamp,
            'doc_link': doc_link,
            'category': category,
            'file_name': file_name,
            'doc_url': doc_url
        };
        // var data = [owner_id, user_id, timestamp, doc_link, category, file_name, doc_url];
        console.log(data);
        return new Promise(function(resolve,reject){
            client.invoke("createDoc", data, function(error, response) {
                console.log(error);
                console.log(response);
                if(_.has(response,"error")){
                    reject(response)
                }else{
                    resolve(response);
                }
            });
        });
       /* var KEYS = [owner_id,user_id,"category","file_name"];
        var ARGV = [timestamp, doc_link, category, file_name, doc_url];
        return new Promise(function (resolve,reject) {
            luaScriptManager.run(SCRIPT_CONSTANTS.CREATE_DOC_LINK,SCRIPT_CONSTANTS.SCRIPT_FOLDER,KEYS,ARGV).then(function(err,response){
                resolve(err,response)
            },function(err){
                console.log(err);
                reject(err);
            });
        });*/
    }

};

module.exports = upload_doc;
