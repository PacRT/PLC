/**
 * Created by Hardik on 2/1/16.
 */
var express = require("express");
var router = express.Router();
var request = require("request");
var weedMaster = "http://127.0.0.1:9333";
var multer  = require('multer');
var upload_api = require('../../redis_middleware/api/redis_upload_api');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage }).array();
var auth_checker = require('../middleware/auth_checker');

router.post('',function(req, res, next){
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


function dbentry(req) {
    var time_stamp = new Date().getTime();
    var doc_link = req.docurl;
    upload_api.associate_doc(req.get('USER_NAME'),req.get('USER_NAME'),time_stamp,doc_link).then(function(response){
        console.log(response);
    },function(error) {
        console.log(error);
    });
    /*filedata.getData(function(err, data) {
        if (!err) {
            console.log("Data: " + data);
            return client["eval"](data, 2, "" + req.user.id, "" + req.user.id, "" + (new Date().getTime()), "" + , function(error, resp) {
                if (!error) {
                    return console.log("Response: " + resp);
                } else {
                    return console.log("Error: " + error);
                }
            });
        } else {
            throw new Error("Problem executing the code data");
        }
    });*/
};

function fileupload(req, res, uploadEndpoint, fn) {
    var poster;
    req.connection.setTimeout(10000);
    poster = request.post(uploadEndpoint, function(err, response, body) {
        var extension, jsonbody, jsonstring;
        if (!err) {
            console.log(err + ":" + response.statusCode + ":" + body);
            jsonbody = JSON.parse(body);
            jsonstring = JSON.stringify(jsonbody);
            console.log("jsonbody:  " + jsonstring);
            console.log("FIle name: " + jsonbody.name);
            extension = jsonbody.name.substring(jsonbody.name.lastIndexOf("."));
            console.log("Extension " + extension);
            if (jsonbody.error !== undefined) {
                console.log("Error ofcourse");
            }
            if (!jsonbody.error) {
                console.log("Ready to call a function here");
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