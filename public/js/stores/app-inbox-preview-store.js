/**
 * Created by hmistry on 6/10/16.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants')["INBOX"];
var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');
var CHANGE_EVENT = "change";

var _inbox_preview_store = {
    "doc_url" : "",
    "file_name" : "",
    "is_preview_open" : false,
    "pkg_id" : "",
    "thread_id" : ""
};

var InboxPreviewStore  = ObjectAssign({},EventEmitter.prototype,{
    addChangeListener:function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener:function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getStore : function(){
        return _inbox_preview_store;
    },
    resetStore : function() {
        _inbox_preview_store = {
            "doc_url" : "",
            "is_preview_open" : false,
            "pkg_id" : "",
            "thread_id" : ""
        };
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType){
        case AppConstants.PREVIEW_INBOX_ITEM:
            _inbox_preview_store["is_preview_open"] = action.is_preview_open;
            _inbox_preview_store["doc_url"] = action.doc_url;
            _inbox_preview_store["file_name"] = action.file_name;
            _inbox_preview_store["pkg_id"] = action.pkg_id;
            _inbox_preview_store["thread_id"] = action.thread_id;
            InboxPreviewStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;

    }
});

module.exports = InboxPreviewStore;