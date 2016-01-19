/**
 * Created by Hardik on 1/12/16.
 */
// Random User API logic
var AppServerActions = require('../actions/app-serverActions');
var request       = require('superagent');
var API_URL = require('./getAPIURL');
module.exports = {

    get: function(api,action) {
        var api_url = API_URL.get(api);
        request.get(api_url)
            .set('Accept', 'application/json')
            .end(function(err, response) {
                if (err) return console.error(err);
                AppServerActions.mapServerActions(action,response.body);
            });
    }
};

