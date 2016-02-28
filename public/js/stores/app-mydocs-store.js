/**
 * Created by Hardik on 2/6/16.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');

var CHANGE_EVENT = "change";

var _myDocs = {
    "docs_link" : [],
    "files_name" : [],
    "cursor" : 0
};

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
        _myDocs = {
            "docs_link" : [],
            "files_name" : [],
            "cursor" : 0
        }
    }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType){
        case AppConstants.MY_DOCS_URL:
            _myDocs.cursor = action.response.cursor;
            _myDocs.docs_link = action.response.docs_link;
            _myDocs.files_name = action.response.files_name;
            MyDocsStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;

    }
});

module.exports = MyDocsStore;