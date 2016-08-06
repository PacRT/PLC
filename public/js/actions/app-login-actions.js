/**
 * Created by Hardik on 1/19/16.
 */
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var browserHistory = require('react-router').browserHistory;

var LoginActions = {
    loginUser:function(user_name,password){
        var data = {
            "user_name" : user_name,
            "password" : password
        }
        API.post(APIConstants.LOG_IN,data).then(function(response){
            var result = JSON.parse(response.text);
            AppDispatcher.handleViewAction({
                actionType : AppConstants.LOG_IN,
                response :{"user_name":result.user.username,"api_token":result.api_token, "full_name" : result.user.name}
            });
            browserHistory.push('mydocs');
        });
    },
    continueSession:function(api_token,user_name, full_name){
        AppDispatcher.handleViewAction({
            actionType : AppConstants.LOG_IN,
            response :{"user_name":user_name,"api_token":api_token, "full_name": full_name}
        });
        if(location.pathname === "/"){
            browserHistory.push('mydocs');
        }

    },
    /**
     * Clear User Session
     */
    logoutUser:function(){
        API.get(APIConstants.LOG_OUT.replace("#user_name#",localStorage.getItem(AppConstants.USER_NAME))).then(function(response){
            AppDispatcher.handleViewAction({
                actionType : AppConstants.LOG_OUT
            });
            browserHistory.push('/');
        });
    },
    openSignUpForm:function(){
        browserHistory.push('registration');
    }
}

module.exports = LoginActions;