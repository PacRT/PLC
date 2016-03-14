/**
 * Created by Hardik on 3/5/16.
 */
var AppConstants = require('../constants/app-constants.js')["DOC_METADATA"];
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var APIURL = require('../utils/getAPIURL');

var EditMetaDataActions = {
    openEditMetaDataModal:function(doc_url, meta_data){
        AppDispatcher.handleViewAction({
            actionType    : AppConstants.OPEN_METADATA_MODAL,
            is_modal_open : true,
            meta_data     : meta_data,
            doc_url       : doc_url
        });
    },
    closeEditMetaDataModal : function(){
        AppDispatcher.handleViewAction({
            actionType    : AppConstants.CLOSE_METADATA_MODAL,
            is_modal_open : false
        });
    },
    getDocMetaData : function(doc_url){
        API.get(APIConstants.GET_DOC_METADATA.replace("#doc_url#",doc_url.split("/docs/")[1])).then(function(response){
            var result = JSON.parse(response.text);
            AppDispatcher.handleViewAction({
                actionType : AppConstants.GET_METADATA,
                meta_keys  : result["meta_keys"],
                meta_values : result["meta_values"],
                doc_url     : doc_url
            });
        });
    },
    updateDocMetaData : function(meta){
        API.post(APIConstants.UPDATE_DOC_METADATA, meta).then(function(response){
            meta = {
                "meta" : meta
            };
            console.log(meta);
            AppDispatcher.handleViewAction({
                actionType : AppConstants.UPDATE_METADATA,
                meta : meta
            });
        })
    }
}

module.exports = EditMetaDataActions;
