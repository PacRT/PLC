'use strict';
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');

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
    },
    sendInvites : function(emails){
        API.post(APIConstants.SEND_INVITES,{ emails : emails}).then(function(response){
            var notification = {
                open : true,
                message : "Cool! Your Invitations has been sent."
            }
            AppDispatcher.handleViewAction({
                actionType : AppConstants.SHOW_NOTIFICATION,
                response :notification
            });
        });
    }
}

module.exports = InviteActions;
