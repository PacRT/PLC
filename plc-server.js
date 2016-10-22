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
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

app.use(express.static(__dirname + '/dist'))

var privateKey  = fs.readFileSync(__dirname+'/sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname+'/sslcert/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
app.use('/api/v1/*', function(req, res, next){
    proxy.web(req, res, {
        target: 'https://127.0.0.1:3333'+req.originalUrl,
        secure: false
    }, next);
});
https.createServer(credentials, app,function(req, res){
    console.log("PLC server started at 7979");
}).listen(7979);
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
