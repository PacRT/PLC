'use strict';
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var API_URL = require('../utils/getAPIURL');
var request = require('superagent-bluebird-promise');
var Promise = require('bluebird');
var _ = require('lodash');

/**
 *
 * @type {{getUploadRequest: UploadzoneActions.getUploadRequest, uploadDocs: UploadzoneActions.uploadDocs}}
 */
var UploadzoneActions = {

    getUploadRequest:function(){
        var super_request = API.uploadFileRequest(APIConstants.UPLOAD_DOCS)
        AppDispatcher.handleViewAction({
            actionType: AppConstants.UPLOAD_REQUEST,
            response: super_request
        });
    },
    resetProgress:function(){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RESET_PROGRESS
        });
    },
    showNotification:function(msg){
        var notification = {
            open : true,
            message : msg
        }
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SHOW_NOTIFICATION,
            response: notification
        });
    },
    /**
     * Upload Docs
     * @param files
     */
    uploadDocs : function(files,category){
        var api_url = API_URL.get(APIConstants.UPLOAD_DOCS);
        api_url = api_url.replace("#category#",category);
        var super_requests = [];
        var promise;
        var _this = this;
        _.each(files, function(file){
            var file_api_url = api_url.replace("#file_name#",file.name);
            promise = request
                .post(file_api_url)
                .attach(file.name, file)
                .set("API_TOKEN",localStorage.getItem(AppConstants.API_TOKEN))
                .set("USER_NAME",localStorage.getItem(AppConstants.USER_NAME))
                .on('progress', function(e) {
                    AppDispatcher.handleViewAction({
                        actionType: AppConstants.UPDATE_PROGRESS,
                        response: e.percent
                    });
                })
                .promise()
                .then(function(res){
                    return res;
                },function(err){
                    return { "err" : err.message};
                })
                .catch(function(err){
                    return { "err" :  err.message};
                });
            super_requests.push(promise);
        });
        Promise
            .all(super_requests)
            .then(function(res){
                if(_.has(res[0],"err")){
                   return _this.showNotification(res[0]["err"]);
                }
                _this.showNotification("Upload Complete.");
            },function(err){
                _this.showNotification(err.toString());
            })
            .catch(function(err){
                console.log(err);
                _this.showNotification(err.toString());
            });
    }
}

module.exports = UploadzoneActions;