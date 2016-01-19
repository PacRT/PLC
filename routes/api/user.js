/**
 * Created by Hardik on 1/17/16.
 */
/**
 * Created by Hardik on 12/11/15.
 */
var express = require("express");
var router = express.Router();
var users = ["hardik","smit","shivang","varun"];
router.get('/isUserExists/:userName',function(req,res){
    console.log(users.indexOf(req.params.userName))
    res.send(users.indexOf(req.params.userName) != -1 ? true : false);
});

module.exports = router;