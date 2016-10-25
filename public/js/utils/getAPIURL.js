/**
 * Created by Hardik on 1/16/16.
 */
var APIConstants = require('../constants/app-api-url.js');

module.exports = {
    get : function(API){
        return APIConstants.API_PREFIX + API ;
    }
}