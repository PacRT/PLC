'use strict';
var path = require('path');


var logger = require('morgan'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    errorHandler = require('errorhandler'),
    cors = require('cors'),
    passport = require('passport');
// Module dependencies.
module.exports = function(app, express) {
    var corsOptions = {
        methods : ['GET', 'PUT', 'POST'],
    };
    app.use(methodOverride());

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors(corsOptions));
    app.use(logger('dev'));
    multer({ dest: './uploads' });
    if ('development' == app.get('env')) {
        app.use(errorHandler());
    }
    return app;
};
