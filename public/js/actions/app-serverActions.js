/**
 * Created by Hardik on 1/11/16.
 */
/** @jsx React.DOM */
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
 var ServerActions = {
     mapServerActions : function(ACTION,response){
        switch(ACTION){
            case AppConstants.IS_USER_EXISTS:
                this.isUserExists(response);
            default :
                return true;
        }
    },
    newUser : function(response){
        AppDispatcher.handleServerAction({
            actionType : AppConstants.NEW_USER,
            response   : response
        });
    },
    isUserExists : function(response){
        AppDispatcher.handleServerAction({
            actionType : AppConstants.USER_EXISTS,
            response   : response
        });
    }
};

module.exports = ServerActions