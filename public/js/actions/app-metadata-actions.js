/**
 * Created by Hardik on 3/5/16.
 */
var AppConstants = require('../constants/app-constants.js')["DOC_METADATA"];
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var APIURL = require('../utils/getAPIURL');
var MyDocsActions = require('./app-mydocs-actions');
var MetaFieldsConstants = require('../constants/app-meta-catergory-constants');

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
            MyDocsActions.getMyDocs(0,"MY_DOCS");
        })
    },
    populateMetaFieldStore : function(category){
        console.log(category);
        var meta_fields = {}
        var keys = MetaFieldsConstants[category][0]["fields"];
        keys.forEach(function(key){
           meta_fields[key] = ""
        });
        AppDispatcher.handleViewAction({
            actionType : AppConstants.POPULATE_META_FIELDS,
            meta_fields : meta_fields
        });
        console.log(meta_fields);
    }
}

module.exports = EditMetaDataActions;
