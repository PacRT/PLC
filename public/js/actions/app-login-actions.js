/**
 * Created by Hardik on 1/19/16.
 */
/** @jsx React.DOM */
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');

var LoginActions = {
    loginUser:function(user_name,password){
        var data = {
            "user_name" : user_name,
            "password" : password
        }
        API.post(APIConstants.LOG_IN,data).then(function(response){
            AppDispatcher.handleViewAction({
                actionType : AppConstants.LOG_IN,
                response :response
            })
            hashHistory.push('home');
        });
    },
    logoutUser:function(){
        AppDispatcher.handleViewAction({
            actionType : AppConstants.LOG_OUT,
        });
        hashHistory.push('login');
    },
    addItem:function(){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ADD_ITEM
        })
    }
}

module.exports = LoginActions;