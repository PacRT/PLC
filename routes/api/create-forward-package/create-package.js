/**
 * Created by Hardik on 3/20/16.
 */
var express = require("express");
var router = express.Router();
var request = require("request");
var uuid = require("../api-utils/generate-uuid");
var create_forward_package_api = require('../../redis_middleware/api/redis_create_package');
var error_codes = require('../../constants/error-constants');
var redis_client = require('../../redis_middleware/redis_client');
var client = redis_client.getClient();

router.post('/createPackage',function(req,res,next){
    var packages = req.body["packages"];
    var create_pkg_promises = [];
    var user_name = req.headers["user_name"];
    packages.map(function(package){
        var random_uuid = uuid.getRandomUUID();
        package["package_id"] = random_uuid;
        create_pkg_promises.push( create_forward_package_api.create_and_fwd_pkg(
            user_name,
            JSON.stringify(package)
        ));
    });

    Promise.all(create_pkg_promises)
        .then(function (result) {
            res.send(result)
            //publish an event
        });
});

module.exports = router;