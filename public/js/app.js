'use strict';
var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;
var AppRouter = require('./components/app-router');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
render(
    <MuiThemeProvider>
        <Router history={browserHistory} routes={AppRouter} />
    </MuiThemeProvider>,
    document.getElementById('paperless-app')
)

