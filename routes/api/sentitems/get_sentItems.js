/**
 * Created by hmistry on 7/24/16.
 */
var express = require("express");
var router = express.Router();
var python_api = require('../../cassandra_middleware/cassandra_python_api');
var error_codes = require('../../constants/error-constants');
router.get('/getSentItems',function(req, res, next){
    var data = {
        "user_id" : req.headers["user_name"]
    };
    python_api.call_python("getSentItems",data).then(function(result){
        res.send(result);
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });

});

module.exports = router;