'use strict';
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var APIURL = require('../utils/getAPIURL');

var InviteActions = {
    enterValidEmailNotification:function(){
        var notification = {
            open : true,
            message : "Please Enter Valid Email Id!"
        }
        AppDispatcher.handleViewAction({
            actionType : AppConstants.SHOW_NOTIFICATION,
            response   : notification
        });
    }
}

module.exports = InviteActions;
