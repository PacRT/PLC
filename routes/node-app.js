var http = require('http');
var express = require('express');
var constants =  require('./constant')
var app = express();
var settings  = require('./settings')(app, express);

app.use(require('./api'))
// error handling middleware should be loaded after the loading the routes

var server = http.createServer(app);
server.listen(constants.nodePort, function(){
    console.log('Express server listening on port ' + constants.nodePort);
});