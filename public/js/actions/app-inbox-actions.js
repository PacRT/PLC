var AppConstants = require('../constants/app-constants.js')["INBOX"];
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var APIURL = require('../utils/getAPIURL');

var InboxActions = {
    getThreads:function(){
        API.get(APIConstants.GET_THREADS).then(function(response){
            var result = JSON.parse(response.text);
            AppDispatcher.handleViewAction({
                actionType : AppConstants.GET_THREADS,
                threads : result
            });
        });
    },
    markThreadRead : function(thread_index){
        AppDispatcher.handleViewAction({
            actionType : AppConstants.MARK_THREAD_READ,
            thread_index : thread_index
        });
    }
}

module.exports = InboxActions;