/**
 * Created by Hardik on 3/5/16.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants')["INBOX"];
var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');
var CHANGE_EVENT = "change";

var _inbox_store = [];

var Inbox_Store  = ObjectAssign({},EventEmitter.prototype,{
    addChangeListener:function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener:function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getStore : function(){
        return _inbox_store;
    },
    resetStore : function() {
        _inbox_store = [];
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType){
        case AppConstants.GET_THREADS:
            _inbox_store = action.threads;
            Inbox_Store.emit(CHANGE_EVENT);
            break;
        case AppConstants.MARK_THREAD_READ:
            _inbox_store[action.thread_index]["isRead"] = true;
            Inbox_Store.emit(CHANGE_EVENT);
            break;
        default:
            return true;

    }
});

module.exports = Inbox_Store;