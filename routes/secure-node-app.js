/**
 * Created by hmistry on 7/9/16.
 */
var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();
var constants =  require('./constants/constant');
require('./settings')(app, express);
_ = require("lodash");
app.use(require('./api'))


var privateKey  = fs.readFileSync(__dirname+'/../sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname+'/../sslcert/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

https.createServer(credentials, app,function(){
    console.log("secure server started on 8181");
}).listen(3333);