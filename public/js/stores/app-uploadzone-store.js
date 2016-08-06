/**
 * Created by Hardik on 2/7/16.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');

var CHANGE_EVENT = "change";

var _uploadZoneStore = {
    "progress" : 0,
    "open_upload_drawer" : false
};

var UploadZoneStore  = ObjectAssign({},EventEmitter.prototype,{
    addChangeListener:function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener:function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getProgress:function(){
        return _uploadZoneStore.progress;
    },
    isUploadDrawOpen : function () {
        return _uploadZoneStore.open_upload_drawer;
    }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType){
        case AppConstants.UPDATE_PROGRESS:
            _uploadZoneStore.progress = action.response;
            UploadZoneStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.OPEN_UPLOAD_DRAWER:
            _uploadZoneStore.open_upload_drawer = action.response;
            UploadZoneStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;

    }
});

module.exports = UploadZoneStore;