/**
 * Created by hmistry on 7/9/16.
 */
var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();


var privateKey  = fs.readFileSync(__dirname+'/../sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname+'/../sslcert/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

https.createServer(credentials, app,function(){
    console.log("secure server started on 8181");
}).listen(8181);

app.get('/', function (req, res) {
    res.header('Content-type', 'text/html');
    return res.end('<h1>Hello, Secure World!</h1>');
});