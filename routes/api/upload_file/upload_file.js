/**
 * Created by Hardik on 2/1/16.
 */
var express = require("express");
var router = express.Router();
var request = require("request");
var weedMaster = require("../../constants/constant")["SEAWEEDFS_ENDPOINT"];
var formidable = require('formidable');
var upload_api = require('../../redis_middleware/api/redis_upload_api');
var auth_checker = require('../middleware/auth_checker');
var util = require("util");
/**
 *
 */
router.post('/:file_name/:category',function(req, res, next){
    /**
     * Rest API to save file to Weedfs
     */
    request("http://"+weedMaster + "/dir/assign", function(error, response, body) {
        var uploadEndpoint, weedRes;
        console.log("http://"+weedMaster + "/dir/assign");
        if (!error) {
            weedRes = JSON.parse(body);
            uploadEndpoint = "http://" + weedRes.publicUrl + "/" + weedRes.fid;
            console.log("Upload Endpoint: " + uploadEndpoint);
            console.log("URL: " + req.url + "  and Original URL: " + req.originalUrl);
            fileupload(req, res ,uploadEndpoint, dbentry);
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
    var doc1 = doc_link.substring(doc_link.indexOf("://") + 3);
    var doc2 = doc1.substring(0, doc1.indexOf("/"));
    var docUrl = doc2.substring(0, doc2.indexOf(":"));
    var docPort = doc2.substring(doc2.indexOf(":") + 1);
    var docFid = doc1.substring(doc1.indexOf("/") + 1);
    var doc_api_url = "/docs/" + docUrl + "/" + docPort + "/" + docFid;
    var thumbnail = req.get("thumbnail");
    upload_api.associate_doc(req.get('USER_NAME'),req.get('USER_NAME'),time_stamp,doc_link,req.params["category"],req.params["file_name"],doc_api_url, thumbnail).then(function(response){
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
            extension = req.params["file_name"].substring(req.params["file_name"].lastIndexOf("."));
            if (jsonbody.error !== undefined) {
                console.log(err.toString())
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
