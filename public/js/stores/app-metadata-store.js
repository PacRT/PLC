/**
 * Created by Hardik on 3/5/16.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants')["DOC_METADATA"];
var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');
var CHANGE_EVENT = "change";

var _metadata_store = {};
var _is_modal_open =  false;
var _edit_doc_metadata = "";
var MetaDataStore  = ObjectAssign({},EventEmitter.prototype,{
    addChangeListener:function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener:function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getStore : function(doc_url){
        return _metadata_store;
    },
    resetStore : function(){
      _metadata_store = {};
        _is_modal_open = false;
        _edit_doc_metadata = "";
    },
    is_modal_open : function(){
        return _is_modal_open;
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType){
        case AppConstants.OPEN_METADATA_MODAL:
            _edit_doc_metadata = action["doc_url"];
            _is_modal_open =  action["is_modal_open"];
            MetaDataStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.CLOSE_METADATA_MODAL:
            _is_modal_open =  action["is_modal_open"];
            _edit_doc_metadata = "";
            MetaDataStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.GET_METADATA:
            var doc_url = action["doc_url"];
            _metadata_store[doc_url] = {};
            _metadata_store[doc_url]["_keys"] = action["meta_keys"];
            _metadata_store[doc_url]["_values"] = action["meta_values"];
            MetaDataStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;

    }
});

module.exports = MetaDataStore;