/**
 * Created by Hardik on 1/14/16.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');

var CHANGE_EVENT = "change";

var _user = {
    isNew : "true",
    token : null,
    response : null,
    isUserExists : "false"
};

var NewUserStore  = ObjectAssign({},EventEmitter.prototype,{
    addChangeListener:function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener:function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getUser : function(){
        return _user;
    }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType){
        case AppConstants.NEW_USER:
            _user.token = action.response.results[0];
            _user.isNew = "false";
            _user.response = "200";
            NewUserStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.USER_EXISTS:
            _user.isUserExists = action.response;
            NewUserStore.emit(CHANGE_EVENT);
        default:
            return true;

    }
});

module.exports = NewUserStore;