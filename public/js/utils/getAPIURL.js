/**
 * Created by Hardik on 1/16/16.
 */
var HOST = "127.0.0.1";
var PORT = 3333;
var APIConstants = require('../constants/app-api-url.js');

module.exports = {
    get : function(API){
        return "http://" + HOST + ":" + PORT + APIConstants.API_PREFIX + API ;
    }
}