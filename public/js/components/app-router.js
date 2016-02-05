/**
 * Created by Hardik on 12/23/15.
 */


//Importing App Components
var APP         = require('./app').APP;
var MyDocs      = require('./mydocs/app-mydocs');
var HowTo       = require('./howto/app-howto');
var Invite      = require('./invite/app-invite');
var Login       = require('./auth/app-login');
var Registration= require('./registration/app-registration');
var UploadZone  = require('./uploadzone/app-uploadzone');
var LoginStore  = require('../stores/app-login-store');

function requireAuth(nextState, replace) {
    console.log(nextState);
    if (!LoginStore.isLoggedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

var AppRouter = {
    path: '/',
    component: APP,
    childRoutes: [
        { path : 'home',  component:UploadZone,onEnter:requireAuth},
        { path : "login" ,component: Login},
        { path : "howto" ,component: HowTo,onEnter:requireAuth},
        { path : "mydocs",component: MyDocs,onEnter:requireAuth},
        { path : "invite",component: Invite,onEnter:requireAuth},
        { path : "registration",component: Registration}
    ]
};


module.exports = AppRouter