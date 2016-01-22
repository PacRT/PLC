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
    res.send(users.indexOf(req.params.userName) != -1 ? true : false);
});

router.post('/register',function(req,res){
   console.log(req.body);
    res.send({"status": 200});
});

module.exports = router;