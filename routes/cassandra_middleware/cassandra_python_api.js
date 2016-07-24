/**
 * Created by hmistry on 6/6/16.
 */
var zerorpc = require("zerorpc");
var client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4242");
var PythonBridge = {
    /**
     * CREATE THREAD WHEN USER RECEIVES DOCUMENTS
     * @param data
     * @returns {Promise}
     */
    call_python : function(method,data) {
        // var data = [owner_id, user_id, timestamp, doc_link, category, file_name, doc_url];
        console.log(data);
        return new Promise(function(resolve,reject){
            client.invoke(method, data, function(error, response) {
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

};

module.exports = PythonBridge;
