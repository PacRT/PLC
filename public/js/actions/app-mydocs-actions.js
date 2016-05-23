/**
 * Created by Hardik on 2/6/16.
 */
/** @jsx React.DOM */
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var APIURL = require('../utils/getAPIURL');
var MyDocActions = {
    getMyDocs:function(cursor,view){
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
    }
}

module.exports = MyDocActions;
