/**
 * Created by Hardik on 3/13/16.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants')["DOCS"];
var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');
var CHANGE_EVENT = "change";

var _forward_pkg_store = {
    "packages" : [],
    "recipients" : []
};
var _modal_open = false;
var ForwardPackageModalStore  = ObjectAssign({},EventEmitter.prototype,{
    addChangeListener:function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener:function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getStore : function(){
        return _forward_pkg_store;
    },
    isModalOpen : function(){
        return _modal_open;
    }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType){
        case AppConstants.OPEN_FORWARD_PACKAGE_MODAL:
            _modal_open =  action.modal_open;
            _forward_pkg_store.packages = action.packages;
            ForwardPackageModalStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.CLOSE_FORWARD_PACKAGE_MODAL:
            _modal_open =  action.modal_open;
            _forward_pkg_store.packages = [];
            _forward_pkg_store.recipients = [];
            ForwardPackageModalStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;

    }
});

module.exports = ForwardPackageModalStore;