/**
 * Created by Hardik on 2/1/16.
 */
var express = require("express");
var router = express.Router();
var request = require("request");
var weedMaster = "http://127.0.0.1:9333";
var multer  = require('multer');
var upload_api = require('../../redis_middleware/api/redis_upload_api');
var auth_checker = require('../middleware/auth_checker');

router.post('',function(req, res, next){
    /**
     * Rest API to save file to Weedfs
     */
    request(weedMaster + "/dir/assign", function(error, response, body) {
        var uploadEndpoint, weedRes;
        if (!error) {
            weedRes = JSON.parse(body);
            uploadEndpoint = "http://" + weedRes.publicUrl + "/" + weedRes.fid;
            console.log("Upload Endpoint: " + uploadEndpoint);
            console.log("URL: " + req.url + "  and Original URL: " + req.originalUrl);
            fileupload(req, res, uploadEndpoint, dbentry);
        } else {
            console.log("error: " + error);
            return res.send(error);
        }
    });
});

/**
 * Update reference in Redis
 * @param req
 */
function dbentry(req) {
    var time_stamp = new Date().getTime();
    var doc_link = req.docurl;
    upload_api.associate_doc(req.get('USER_NAME'),req.get('USER_NAME'),time_stamp,doc_link).then(function(response){
        console.log(response);
    },function(error) {
        console.log(error);
    });
};
/**
 * Upload file to endpoint provided by SeeWeedFs
 * @param req
 * @param res
 * @param uploadEndpoint
 * @function fn
 * @returns {Stream|*}
 */
function fileupload(req, res, uploadEndpoint, fn) {
    var poster;
    poster = request.post(uploadEndpoint, function(err, response, body) {
        var extension, jsonbody, jsonstring;
        if (!err) {
            jsonbody = JSON.parse(body);
            extension = jsonbody.name.substring(jsonbody.name.lastIndexOf("."));
            if (jsonbody.error !== undefined) {
                console.log("Error ofcourse");
            }
            if (!jsonbody.error) {
                if (fn !== 'undefined') {
                    req.docurl = uploadEndpoint + extension;
                    return fn(req);
                }
            }
        } else {
            console.log("Error ::: " + err);
        }
    });
    return req.pipe(poster).pipe(res);
};

module.exports = router;