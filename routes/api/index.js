/**
 * Created by Hardik on 12/11/15.
 */
var express = require("express");
var router = express.Router();


router.use('/api/v1/users',require('./user/user.js'));

router.get('/', function(req, res) {
    res.send({status : 200,mesasge: "App is up and running!!"})
});

module.exports = router