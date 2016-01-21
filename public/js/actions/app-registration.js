/**
 * Created by Hardik on 1/19/16.
 */
/** @jsx React.DOM */
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');

var AppRegistration = {
    isUserExists : function(userName) {
        API.get(APIConstants.USER_EXISTS_API.replace("#userName#",userName)).then(function(response){
            AppDispatcher.handleViewAction({
                actionType : AppConstants.USER_EXISTS,
                response   : response.text
            });
        });
    }
}

module.exports = AppRegistration;