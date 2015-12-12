var http = require('http');
var express = require('express');
var constants =  require('./constant')
var app = express();

var settings  = require('./settings')(app, express);

require('./api')(app);
// error handling middleware should be loaded after the loading the routes

var server = http.createServer(app);
server.listen(3333, function(){
    console.log('Express server listening on port ' + 3333);
});