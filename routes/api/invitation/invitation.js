var express = require("express");
var router = express.Router();
var error_codes = require('../../constants/error-constants');
var python_api = require('../../cassandra_middleware/cassandra_python_api');

router.post('/',function(req, res, next){
    console.log(req.body["emails"]);
    var send_invitation_promises = [];
    req.body["emails"].map(function(email){
        send_invitation_promises.push(python_api.call_python("sendInvites",email));
    });
    Promise.all(send_invitation_promises)
        .then(function (result) {
            res.send(result[0]);
        },function(error) {
            res.status(600).send(JSON.stringify({error: true, "errorMsg": error_codes[error]}));
        });
});

module.exports = router;