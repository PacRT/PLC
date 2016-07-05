/**
 * Created by hmistry on 6/6/16.
 */
var zerorpc = require("zerorpc");
var Inbox = {
    /**
     * CREATE THREAD WHEN USER RECEIVES DOCUMENTS
     * @param data
     * @returns {Promise}
     */
    create_thread : function(data) {
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        // var data = [owner_id, user_id, timestamp, doc_link, category, file_name, doc_url];
        console.log(data);
        return new Promise(function(resolve,reject){
            client.invoke("createThread", data, function(error, response) {
                console.log(error);
                console.log(response);
                if(_.has(response,"error")){
                    reject(response)
                }else{
                    resolve(response);
                }
            });
        });
    },
    get_threads : function(data) {
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        return new Promise(function(resolve,reject){
            client.invoke("getThreads", data, function(error, response) {
                console.log(error);
                console.log(response);
                if(_.has(response,"error")){
                    reject(response)
                }else{
                    resolve(response);
                }
            });
        });
    },
    mark_thread_read : function(data){
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        return new Promise(function(resolve,reject){
            client.invoke("markThreadRead", data, function(error, response) {
                console.log(error);
                console.log(response);
                if(_.has(response,"error")){
                    reject(response)
                }else{
                    resolve(response);
                }
            });
        });
    },
    add_comment : function(data){
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        return new Promise(function(resolve,reject){
            client.invoke("addComment", data, function(error, response) {
                console.log(error);
                console.log(response);
                if(_.has(response,"error")){
                    reject(response)
                }else{
                    resolve(response);
                }
            });
        });
    },
    get_comment : function(data){
        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");
        return new Promise(function(resolve,reject){
            client.invoke("getComment", data, function(error, response) {
                console.log(error);
                console.log(response);
                if(_.has(response,"error")){
                    reject(response)
                }else{
                    resolve(response);
                }
            });
        });
    }

};

module.exports = Inbox;
