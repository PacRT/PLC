/**
 * Created by Hardik on 1/12/16.
 */
// Random User API logic
var request       = require('superagent');
var API_URL = require('./getAPIURL');
var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

module.exports = {

    get: function(api) {
        var api_url = API_URL.get(api);
        return new Promise(function (resolve, reject) {
            request.get(api_url)
                .set('Accept', 'application/json')
                .end(function(err, response) {
                    if (err) reject();
                    resolve(response);
                });
        });

    },
    post : function(api,payLoad){
        var api_url = API_URL.get(api);
        console.log(payLoad);
        console.log(api_url);
        return new Promise(function(resolve,reject){
            request.post(api_url)
                .set('Content-Type','application/json')
                .send(payLoad)
                .end(function(err, response){
                    if(err) {
                        var erroMsg = JSON.parse(response.text)["message"];
                        var notification = {
                            open : true,
                            message : erroMsg
                        }
                        AppDispatcher.handleViewAction({
                            actionType : AppConstants.SHOW_NOTIFICATION,
                            response :notification
                        })
                        return reject(err);
                    }
                    resolve(response);
                })
        })
    }
};

