var Router = require('react-router').Router;
var render = require('react-dom').render;

APP = require('./components/app').APP;

var Logout = require('./components/auth/app-logout');
var Login = require('./components/auth/app-login');

var About = require('./components/about/app-about');
var Dashboard = require('./components/dashboard/app-dashboard');
var MyDocs = require('./components/mydocs/app-mydocs');
var HowTo = require('./components/howto/app-howto');
var rootRoute = {
    path: '/',
    component: APP,
        childRoutes: [
            { path : "login",component: Login},
            { path : "logout",component: Logout},
            { path : "about",component: About},
            { path : "howto",component: HowTo},
            { path : "mydocs",component: MyDocs}
        ]

}

render(
    <Router routes={rootRoute} />,
    document.getElementById('example')
)

