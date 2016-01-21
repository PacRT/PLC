/**
 * Created by Hardik on 1/12/16.
 */
// Random User API logic
var request       = require('superagent');
var API_URL = require('./getAPIURL');
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

    }
};

