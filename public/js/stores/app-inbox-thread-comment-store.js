/**
 * Created by hmistry on 7/4/16.
 */
/**
 * Created by hmistry on 6/10/16.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants')["INBOX"];
var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');
var CHANGE_EVENT = "change";

var _inbox_thread_comment_store = {
    "comments" : []
};

var InboxThreadCommentStore  = ObjectAssign({},EventEmitter.prototype,{
    addChangeListener:function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener:function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getStore : function(){
        return _inbox_thread_comment_store;
    },
    resetStore : function() {
        _inbox_thread_comment_store = {
            comments : []
        };
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType){
        case AppConstants.INBOX_THREAD_COMMENT:
            _inbox_thread_comment_store["comments"] = action.comments;
            InboxThreadCommentStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.UPDATE_THREAD_COMMENT:
            var time_stamp =  new Date().toString();
            var comment = {
                "comment" : action.comment,
                "date_added" : time_stamp.slice(0,time_stamp.indexOf(" GMT")),
                "author"   : localStorage.getItem('USER_NAME')
            };
            if(_.isArray(_inbox_thread_comment_store["comments"])){
                _inbox_thread_comment_store["comments"].push(comment);
            }else{
                _inbox_thread_comment_store["comments"] = [comment];
            }
            InboxThreadCommentStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;

    }
});

module.exports = InboxThreadCommentStore;