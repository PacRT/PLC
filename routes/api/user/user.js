/**
 * Created by Hardik on 1/17/16.
 */
/**
 * Created by Hardik on 12/11/15.
 */
var express = require("express");
var router = express.Router();
var users = ["hardik","smit","shivang","varun","chiradip","sandeep","vijay","sudhakar"];
var user_api = require('./user_api');


router.get('/isUserExists/:userName',function(req,res){
    res.send(users.indexOf(req.params.userName) != -1 ? true : false);
});

router.post('/register',function(req,res){
    var user = req.body;
    user_api.registerUser(user).then(function(err,response){
        res.send("finally done with it!!!! fuck you bitch!!!")
    });

});

module.exports = router;