/**
 * Created by Hardik on 2/24/16.
 */
var AppConstants = require('../constants/app-constants.js')["DOCS"];
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var APIURL = require('../utils/getAPIURL');

var DocTileActions = {
    openPreview : function(url,hybrid){
        AppDispatcher.handleViewAction({
            actionType : AppConstants.OPEN_PREVIEW,
            response :url,
            hybrid : hybrid
        });
    }
}

module.exports = DocTileActions;
