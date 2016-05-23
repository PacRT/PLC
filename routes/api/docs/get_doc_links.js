/**
 * Created by Hardik on 2/3/16.
 */
var express = require("express");
var router = express.Router();
var docs_api = require('../../redis_middleware/api/redis_docs_api');
var error_codes = require('../../constants/error-constants');
/**
 * need to refactor this
 */
router.get('/:cursor',function(req, res, next){
    var user_id = req.get("USER_NAME");
    var cursor = req.params["cursor"];
    docs_api.get_user_docs(user_id,cursor).then(function(response){
        res.send(response["result"]);
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

module.exports = router;
