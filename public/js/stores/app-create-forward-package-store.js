/**
 * Created by Hardik on 3/13/16.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants')["DOCS"];
var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');

var CHANGE_EVENT = "change";

var _docs_by_type = {
    "docs_link" : [],
    "files_name" : [],
    "cursor" : 0,
    "packages" : []
};

var CreateForwardPkgStore  = ObjectAssign({},EventEmitter.prototype,{
    addChangeListener:function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener:function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getCreateFwdPkgStore : function() {
        return _docs_by_type;
    },
    resetDocStore : function(){
        _docs_by_type = {
            "docs_link" : [],
            "files_name" : [],
            "cursor" : 0
        }
    }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType){
        case AppConstants.DOC_BY_TYPE:
            _docs_by_type.cursor = action.cursor;
            _docs_by_type.docs_link = action.docs_link;
            _docs_by_type.files_name = action.files_name;
            CreateForwardPkgStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;

    }
});

module.exports = CreateForwardPkgStore;
