/**
 * Created by Hardik on 3/6/16.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants')["DOC_METADATA"];
var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');
var CHANGE_EVENT = "change";

var _metadata_store = {};
var _is_modal_open =  false;
var _doc_url = "";

var EditMetaDataStore  = ObjectAssign({},EventEmitter.prototype,{
    addChangeListener:function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener:function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getStore : function(){
        return _metadata_store;
    },
    is_modal_open : function(){
        return _is_modal_open;
    },
    getDocURL : function(){
        return _doc_url;
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType){
        case AppConstants.OPEN_METADATA_MODAL:
            _metadata_store = action["meta_data"];
            _is_modal_open =  action["is_modal_open"];
            _doc_url = action["doc_url"];
            EditMetaDataStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.CLOSE_METADATA_MODAL:
            _is_modal_open =  action["is_modal_open"];
            _metadata_store = {};
            _doc_url = "";
            EditMetaDataStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.UPDATE_DOC_METADATA:
            meta = action["meta"];
            console.log(meta);
            EditMetaDataStore.emit(CHANGE_EVENT);
            break;
    }
});

module.exports = EditMetaDataStore;
