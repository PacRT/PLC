var _ = require('underscore');
var auth_api = require('../../redis_middleware/api/redis_auth_api');
var error_codes = require('../../constants/error-constants');

/**
 * Middleware to prevent unauthorised access.
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req,res,next){
    if(!_.isUndefined(req.get('API_TOKEN'))){
        var userName = req.get("USER_NAME");
        var token = req.get("API_TOKEN");
        auth_api.verifyAuthToken(userName,token).then(function(response){
            console.log(response);
            next();
        },function(error){
            res.status(403).send({error:true,"errorMsg":error_codes[error]})
        });
    }else{
          res.status(403).send({
            success: false,
            message: 'Please Login Again'
        });
    }
}