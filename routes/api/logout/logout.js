var express = require("express");
var router = express.Router();
var auth_api = require('../../redis_middleware/api/redis_auth_api');
var error_codes = require('../../constants/error-constants');

router.get('/logout/:userName',function(req, res, next){
    auth_api.deleteAuthToken(req.params.userName).then(function(response){
        res.send({"msg":response});
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

module.exports = router;