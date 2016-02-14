/**
 * Created by Hardik on 1/12/16.
 */
var request       = require('superagent');
var API_URL = require('./getAPIURL');
var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

module.exports = {
    handleErr: function(err,response){
        var erroMsg  = response ? JSON.parse(response.text)["errorMsg"] : err.toString();
        var notification = {
            open : true,
            message : erroMsg
        };
        AppDispatcher.handleViewAction({
            actionType : AppConstants.SHOW_NOTIFICATION,
            response :notification
        });
    },
    get: function(api) {
        var api_url = API_URL.get(api);
        var _this = this;
        return new Promise(function (resolve, reject) {
            var super_request = request.get(api_url);
            if(api_url.indexOf('/login') == -1)
                super_request.set("API_TOKEN",localStorage.getItem(AppConstants.API_TOKEN));
                super_request.set("USER_NAME",localStorage.getItem(AppConstants.USER_NAME));
            super_request.set('Accept', 'application/json')
            super_request.end(function(err, response) {
                    if (err) return _this.handleErr(err,response,reject);
                    if(_.has(JSON.parse(response.text),"error")) return _this.handleErr(err,response,reject);
                    resolve(response);
                });
        });

    },
    post : function(api,payLoad){
        var api_url = API_URL.get(api);
        var _this = this;
        return new Promise(function(resolve,reject){
            var super_request = request.post(api_url);
            if(api_url.indexOf('/login') == -1)
                super_request.set("API_TOKEN",localStorage.getItem(AppConstants.API_TOKEN));
                super_request.set("USER_NAME",localStorage.getItem(AppConstants.USER_NAME));
            super_request.set('Content-Type','application/json')
            super_request.send(payLoad)
            super_request.end(function(err, response){
                    if(err) return _this.handleErr(err,response,reject);
                    if(_.has(JSON.parse(response.text),"error")) return _this.handleErr(err,response,reject);
                    resolve(response);
                })
        })
    },
    uploadFileRequest : function(api,files){
        var api_url = API_URL.get(api);
        var super_request = request.post(api_url);
        super_request.set("API_TOKEN",localStorage.getItem(AppConstants.API_TOKEN));
        super_request.set("USER_NAME",localStorage.getItem(AppConstants.USER_NAME));
        return super_request;
    },
    uploadDocs : function(files,api){
        return Promise.all(super_requests);

    }
};

