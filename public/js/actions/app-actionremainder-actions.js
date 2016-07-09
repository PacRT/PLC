/**
 * Created by Hardik on 2/9/16.
 */
var AppConstants = require('../constants/app-constants.js')["ACTION_REMAINDER"];
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var APIURL = require('../utils/getAPIURL');

var ActionRemainderActions = {
    openModal:function(openModal){
        AppDispatcher.handleViewAction({
            actionType : AppConstants.OPEN_MODAL,
            response :openModal
        });
    }
}

module.exports = ActionRemainderActions;