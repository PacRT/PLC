/**
 * Created by Hardik on 2/3/16.
 */
var express = require("express");
var router = express.Router();
var request = require("request");


router.get('/:vs/:prt/:fid',function(req,res,next){
    var fiid, reqobj, _i, _len, _ref;
    console.log("fileServiceMask() got called");
    /*console.log("FIDS:::::::::" + req.session.fids);
    _ref = req.session.fids;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fiid = _ref[_i];
        console.log("FID: " + fiid);
    }*/
    /*if (req.session.fids.indexOf(req.params.fid) !== -1) {*/
        console.log("fileServiceMask(): fid is present in fids");
        reqobj = request("http://" + req.params.vs + ":" + req.params.prt + "/" + req.params.fid, function(error, response, body) {
            if (!error) {
                console.log("fileServiceMask(): Error: " + error);
                return console.log("fileServiceMask(): Response: " + response);
            } else {
                return console.log("fileServiceMask(): Error: " + error);
            }
        });
        return reqobj.pipe(res);
    /*} else {
        return console.log("fileServiceMask(): fid is present NOT present in fids");
    }*/
});

module.exports = router;