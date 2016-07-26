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
    openPreview : function(url, file_name, open_preview,thread_id, pkg_id){
        var doc_url = APIURL.get(url);
        AppDispatcher.handleViewAction({
            actionType      : AppConstants.PREVIEW_INBOX_ITEM,
            is_preview_open : open_preview,
            doc_url         : doc_url,
            file_name       : file_name,
            thread_id       : thread_id,
            pkg_id          : pkg_id
        });
    },
    getComment : function(doc_url, thread_id, pkg_id){
        var data = {
            "thread_id" : thread_id,
            "pkg_id"    : pkg_id,
            "doc_url"   : doc_url.split("/api/v1")[1]
        };
        API.post(APIConstants.GET_INBOX_COMMENTS,data).then(function(response){
            var result = JSON.parse(response.text);
            AppDispatcher.handleViewAction({
                actionType : AppConstants.INBOX_THREAD_COMMENT,
                comments : result["comments"]
            });
        });
    },
    addComment : function(thread_id, pkg_id, doc_url, comment){
        var data = {
            "thread_id" : thread_id,
            "pkg_id"    : pkg_id,
            "doc_url"   : doc_url.split("/api/v1")[1],
            "comment"   : comment,
            "author"   : localStorage.getItem('USER_NAME')
        };
        API.post(APIConstants.ADD_INBOX_COMMENTS,data).then(function(response){
            var result = JSON.parse(response.text);
            AppDispatcher.handleViewAction({
                actionType : AppConstants.UPDATE_THREAD_COMMENT,
                comment : comment
            });
        });
    },
    closePreview: function(open_preview){
        AppDispatcher.handleViewAction({
            actionType      : AppConstants.PREVIEW_INBOX_ITEM,
            is_preview_open : open_preview,
            doc_url         : ""
        });
    },
    getSentItems : function(){
        API.get(APIConstants.GET_SENT_ITEMS).then(function(response){
            var result = JSON.parse(response.text);
            AppDispatcher.handleViewAction({
                actionType : AppConstants.GET_SENT_ITEMS,
                threads : result
            });
        });
    }

}

module.exports = InboxActions;