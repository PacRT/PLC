/**
 * Created by hmistry on 7/12/16.
 */
var express = require('express');
var path = require('path');
var port = 7979;
var app = express();
var fs = require('fs');
var https = require('https');
// serve static assets normally
app.use(express.static(__dirname + '/dist'))

var privateKey  = fs.readFileSync(__dirname+'/sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname+'/sslcert/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

https.createServer(credentials, app,function(){
    console.log("secure server started on 8181");
}).listen(8181);

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});