var AppConstants = require('../constants/app-constants.js')["INBOX"];
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var APIURL = require('../utils/getAPIURL');

var InboxActions = {
    getThreads:function(){
        API.get(APIConstants.GET_THREADS).then(function(response){
            var result = JSON.parse(response.text);
            AppDispatcher.handleViewAction({
                actionType : AppConstants.GET_THREADS,
                threads : result
            });
        });
    },
    markThreadRead : function(thread_index,thread_id){
        API.get(APIConstants.MARK_THREAD_READ.replace("#thread_id#",thread_id)).then(function(response){
            AppDispatcher.handleViewAction({
                actionType : AppConstants.MARK_THREAD_READ,
                thread_index : thread_index
            });
        });
    },
    openPreview : function(url, file_name, open_preview){
        var doc_url = APIURL.get(url);
        AppDispatcher.handleViewAction({
            actionType      : AppConstants.PREVIEW_INBOX_ITEM,
            is_preview_open : open_preview,
            doc_url         : doc_url,
            file_name       : file_name
        });
    },
    closePreview: function(open_preview){
        AppDispatcher.handleViewAction({
            actionType      : AppConstants.PREVIEW_INBOX_ITEM,
            is_preview_open : open_preview,
            doc_url         : ""
        });
    }
}

module.exports = InboxActions;