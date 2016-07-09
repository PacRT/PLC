/**
 * Created by Hardik on 2/6/16.
 */
'use strict';
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var APIURL = require('../utils/getAPIURL');
var MyDocActions = {
    getMyDocs:function(cursor,view){
        AppDispatcher.handleViewAction({
            actionType: AppConstants["DOCS"]["RESET_DOC_STORE"]
        });
        API.get(APIConstants[view].replace("#cursor#",cursor)).then(function(response){
            var result = JSON.parse(response.text);
            result.docs_link = result.docs_link.map(function(link){
                    return APIURL.get(link);
            });
            AppDispatcher.handleViewAction({
                actionType: AppConstants.MY_DOCS_URL,
                response: result
            });

        });
    },
    updateDocSelection : function(selected_tiles){
        AppDispatcher.handleViewAction({
            actionType : AppConstants["DOCS"]["UPDATE_DOC_SELECTION"],
            selected_docs : selected_tiles
        })
    },
    filterDocs : function(query_string){
        var FILTER_DOCS = APIConstants.FILTER_DOCS.replace("#query#",query_string);
        AppDispatcher.handleViewAction({
            actionType: AppConstants["DOCS"]["RESET_DOC_STORE"]
        });
        API.get(FILTER_DOCS).then(function(response){
            var result = JSON.parse(response.text);
            result.docs_link = result.docs_link.map(function(link){
                return APIURL.get(link);
            });
            AppDispatcher.handleViewAction({
                actionType: AppConstants.MY_DOCS_URL,
                response: result
            });
            if(!result.docs_link.length){
                var notification = {
                    open : true,
                    message : "No Result Found."
                }
                AppDispatcher.handleViewAction({
                    actionType : AppConstants.SHOW_NOTIFICATION,
                    response   : notification
                });
            }
        });
    }
}

module.exports = MyDocActions;
