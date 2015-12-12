'use strict';
var path = require('path');


var logger = require('morgan'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    errorHandler = require('errorhandler'),
    cors = require('cors');
// Module dependencies.
module.exports = function(app, express) {
    var corsOptions = {
        origin: 'http://example.com'
    };
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors(corsOptions));
    app.use(logger('dev'));
    app.use(methodOverride());
    multer({ dest: './uploads' });
    if ('development' == app.get('env')) {
        app.use(errorHandler());
    }

    return app;
};
