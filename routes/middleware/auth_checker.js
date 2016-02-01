var _ = require('underscore');
var auth_api = require('../redis_middleware/api/redis_auth_api');
/**
 * Middleware to prevent unauthorised access.
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req,res,next){
    if(!_.isUndefined(req.get('API_TOKEN'))){
        var userName = req.get("userName");
        var token = req.get("API_TOKEN");
        auth_api.verifyAuthToken(userName,token).then(function(response){
            next();
        },function(error){
            res.status(403).send({
                success: false,
                message: 'Please Login Again'
            });
        });
    }else{
          res.status(403).send({
            success: false,
            message: 'Please Login Again'
        });
    }
}