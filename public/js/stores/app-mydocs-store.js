/**
 * Created by Hardik on 2/6/16.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');

var CHANGE_EVENT = "change";

var _myDocs = [];

var MyDocsStore  = ObjectAssign({},EventEmitter.prototype,{
    addChangeListener:function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener:function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getDocStore : function() {
        return _myDocs;
    },
    resetDocStore : function(){
       _myDocs = [];
    }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType){
        case AppConstants.MY_DOCS_URL:
            _myDocs = action.response;
            MyDocsStore.emit(CHANGE_EVENT);
            break;
        case AppConstants["DOCS"]["UPDATE_DOC_SELECTION"]:
            break;
        case AppConstants["DOCS"]["RESET_DOC_STORE"]:
            _myDocs = [];
            MyDocsStore.emit(CHANGE_EVENT);
        default:
            return true;

    }
});

module.exports = MyDocsStore;