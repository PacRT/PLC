/**
 * Created by Hardik on 8/7/16.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants')["DOC_METADATA"];
var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');
var CHANGE_EVENT = "change";
var _meta_fields = {};

var MetaFieldStore  = ObjectAssign({},EventEmitter.prototype,{
    addChangeListener:function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener:function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getStore : function(){
        return _meta_fields;
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType){
        case AppConstants.POPULATE_META_FIELDS:
            _meta_fields = action["meta_fields"];
            MetaFieldStore.emit(CHANGE_EVENT);
            break;
    }
});

module.exports = MetaFieldStore;
