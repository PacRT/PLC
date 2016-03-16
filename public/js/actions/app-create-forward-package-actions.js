/**
 * Created by Hardik on 3/13/16.
 */
/** @jsx React.DOM */
var AppConstants = require('../constants/app-constants.js')["DOCS"];
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var APIURL = require('../utils/getAPIURL');

var AppCreateForwardPackage = {
    getDocsByType:function(cursor,category){
        var GET_DOC_BY_TYPE = APIConstants.GET_DOC_BY_TYPE.replace("#cursor#",cursor);
        GET_DOC_BY_TYPE = GET_DOC_BY_TYPE.replace("category",category);
        API.get(GET_DOC_BY_TYPE).then(function(response){
            var result = JSON.parse(response.text);
            AppDispatcher.handleViewAction({
                actionType: AppConstants.DOC_BY_TYPE,
                cursor: result.cursor,
                docs_link : result.docs_link,
                files_name : result.files_name
            });

        });
    },
    openForwardPkgModal : function(){
        AppDispatcher.handleViewAction({
            actionType : AppConstants.OPEN_FORWARD_PACKAGE_MODAL,
            modal_open : true
        })
    },
    closeForwardPkgModal : function(){
        AppDispatcher.handleViewAction({
            actionType : AppConstants.CLOSE_FORWARD_PACKAGE_MODAL,
            modal_open : false
        })
    }
}

module.exports = AppCreateForwardPackage;
