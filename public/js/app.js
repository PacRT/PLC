'use strict';
var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;
/*var useRouterHistory = require('react-router');
var createHashHistory = require('history');
var appHistory = useRouterHistory(createHashHistory)({ queryKey: false });*/
/*var useRouterHistory = require('react-router').useRouterHistory;
var createHashHistory = require('history').createHashHistory;

//To Prevent random string appearing in react-router
var history = useRouterHistory(createHashHistory)({ queryKey: false });*/
var AppRouter = require('./components/app-router');

render(
    <Router history={browserHistory} routes={AppRouter} />,
    document.getElementById('paperless-app')
)

