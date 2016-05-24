/**
 * Created by Hardik on 3/13/16.
 */
var express = require("express");
var router = express.Router();
var docs_api = require('../../redis_middleware/api/redis_docs_api');
var error_codes = require('../../constants/error-constants');

router.get('/:cursor/:category',function(req, res, next){
    var user_id = req.get("USER_NAME");
    var cursor = req.params["cursor"];
    var category = req.params["category"];
    docs_api.get_doc_by_type(user_id,cursor,category).then(function(response){
        res.send(response["result"]);
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

module.exports = router;
