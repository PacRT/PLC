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
    getMyDocs:function(cursor){
        /*AppDispatcher.handleViewAction({
            actionType: AppConstants["DOCS"]["RESET_DOC_STORE"]
        });*/
        API.get(APIConstants.MY_DOCS.replace("#cursor#","0")).then(function(response){
            var docs = JSON.parse(response.text);
            docs.map(function(doc){
                doc.doc_url = APIURL.get(doc.doc_url);
            });
            AppDispatcher.handleViewAction({
                actionType: AppConstants.MY_DOCS_URL,
                response: docs
            });

        });
    },
    updateDocSelection : function(selected_tiles){
        AppDispatcher.handleViewAction({
            actionType : AppConstants["DOCS"]["UPDATE_DOC_SELECTION"],
            selected_docs : selected_tiles
        })
    },
    resetDocStore: function(){
        AppDispatcher.handleViewAction({
            actionType : AppConstants["DOCS"]["RESET_DOC_STORE"]
        })
    },
    filterDocs : function(query_string){
        var FILTER_DOCS = APIConstants.FILTER_DOCS.replace("#query#",query_string);
        AppDispatcher.handleViewAction({
            actionType: AppConstants["DOCS"]["RESET_DOC_STORE"]
        });
        API.get(FILTER_DOCS).then(function(response){
            var docs = JSON.parse(response.text);
            docs.map(function(doc){
                doc.doc_url = APIURL.get(doc.doc_url);
            });
            AppDispatcher.handleViewAction({
                actionType: AppConstants.MY_DOCS_URL,
                response: docs
            });
            if(!docs.length){
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
    },
    updateDocMetaData : function(meta){
        API.post(APIConstants.UPDATE_DOC_METADATA, meta).then(function(response){
            this.getMyDocs(0,"MY_DOCS");
            var notification = {
                open : true,
                message : "Success! Document Details has been updated."
            }
            AppDispatcher.handleViewAction({
                actionType : AppConstants.SHOW_NOTIFICATION,
                response :notification
            });
        }.bind(this))
    },
}

module.exports = MyDocActions;
