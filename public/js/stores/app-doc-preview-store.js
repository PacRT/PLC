/**
 * Created by Hardik on 2/26/16.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants')["DOCS"];
var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');
var CHANGE_EVENT = "change";

var _doc_preview_store = {
    "document_url" : "",
    "document_title" : ""
};
var _is_preview_open = false;
var DocPreviewStore  = ObjectAssign({},EventEmitter.prototype,{
    addChangeListener:function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener:function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getStore : function(){
        return _doc_preview_store;
    },
    isPreviewOpen : function(){
        return _is_preview_open;
    }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType){
        case AppConstants.OPEN_PREVIEW:
            _doc_preview_store.document_url =  action.response.url;
            _doc_preview_store.document_title =  action.response.title;
            _is_preview_open = true;
            DocPreviewStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;

    }
});

module.exports = DocPreviewStore;