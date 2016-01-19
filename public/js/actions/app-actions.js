/** @jsx React.DOM */
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var randomAPI = require('../utils/RandomUserAPI.js');

var AppActions = {
  addItem:function(){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ITEM
    })
  },

  addUser:function(){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.GET_RANDOM
    });

    randomAPI.get();
  },

  isUserExists : function(userName) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.IS_USER_EXISTS
    });
    randomAPI.get(AppConstants.IS_USER_EXISTS_URL+"/"+userName,AppConstants.IS_USER_EXISTS);
  }

}

module.exports = AppActions;