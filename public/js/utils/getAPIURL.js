/**
 * Created by Hardik on 1/16/16.
 */
var HOST = "127.0.0.1";
var PORT = 3333;
var AppConstants = require('../constants/app-constants.js');

module.exports = {
    get : function(API){
        return "http://" + HOST + ":" +PORT + AppConstants.API_PREFIX +API;
    }
}