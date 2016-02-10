/**
 * Created by Hardik on 2/9/16.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants')["ACTION_REMAINDER"];
var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');
var CHANGE_EVENT = "change";

var _action_remainder_store = {
   "is_modal_open" : false
};

var ActionRemainderStore  = ObjectAssign({},EventEmitter.prototype,{
    addChangeListener:function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener:function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getStore : function(){
        return _action_remainder_store;
    }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType){
        case AppConstants.OPEN_MODAL:
            _action_remainder_store.is_modal_open =  action.response;
            ActionRemainderStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;

    }
});

module.exports = ActionRemainderStore;