/**
 * Created by Hardik on 3/20/16.
 */
var express = require("express");
var router = express.Router();
var request = require("request");
var create_forward_package_api = require('../../redis_middleware/api/redis_create_package');
var error_codes = require('../../constants/error-constants');

router.post('/createPackage',function(req,res,next){
    var packages = req.body["packages"];
    var create_pkg_promises = [];
    var user_name = req.headers["user_name"];
    packages.map(function(package_1){
        create_pkg_promises.push( create_forward_package_api.create_and_fwd_pkg(
            user_name,
            JSON.stringify(package_1)
        ));
    });

    Promise.all(create_pkg_promises)
        .then(function (result) {
            res.send(result);
            client.publish("forwardPackage", JSON.stringify({"packages": result}));
            //publish an event
            client.publish("addPackage", JSON.stringify({"packages": result,"user_name" : req.headers["user_name"]}));
            res.send(response);
            // create_forward_package_api.add_package(result,req.headers["user_name"]).then(function(response){
            //     res.send(response);
            // },function(error){
            //     res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
            // });
        });
});

router.post('/addPackage',function(req,res,next){
    create_forward_package_api.add_package(req.body["package_ids"],req.headers["user_name"]).then(function(response){
        res.send(response);
    },function(error){
        res.status(600).send(JSON.stringify({error:true,"errorMsg":error_codes[error]}));
    });
});

module.exports = router;
