/**
 * Created by Hardik on 2/6/16.
 */
/** @jsx React.DOM */
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var APIURL = require('../utils/getAPIURL');
var MyDocActions = {
    getMyDocs:function(){
        API.get(APIConstants.MY_DOCS).then(function(response){
            var result = JSON.parse(response.text);
            var docs_url_promise = [];
            result.map(function(url){
                console.log(url.replace("documents","docs"));
                docs_url_promise.push(APIURL.get(url.replace("documents","docs")));
            });

            AppDispatcher.handleViewAction({
                actionType: AppConstants.MY_DOCS,
                response: docs_url_promise
            });

        });
    }
}

module.exports = MyDocActions;
