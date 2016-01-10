/**
 * Created by Hardik on 12/23/15.
 */


//Importing App Components
var APP         = require('./app').APP;
var Logout      = require('./auth/app-logout');
var About       = require('./about/app-about');
var MyDocs      = require('./mydocs/app-mydocs');
var HowTo       = require('./howto/app-howto');
var Invite      = require('./invite/app-invite');
var Login       = require('./login/app-login');
var Registration= require('./signup/app-signup');

var AppRouter = {
    path: '/',
    component: APP,
    childRoutes: [
        { path : "login" ,component: Login},
        { path : "logout",component: Logout},
        { path : "about" ,component: About},
        { path : "howto" ,component: HowTo},
        { path : "mydocs",component: MyDocs},
        { path : "invite",component: Invite},
        { path : "signup",component: Registration}
    ]
};

module.exports = AppRouter