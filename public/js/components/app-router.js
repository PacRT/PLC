/**
 * Created by Hardik on 12/23/15.
 */


//Importing App Components
var APP         = require('./app').APP;
var MyDocs      = require('./mydocs/app-mydocs');
var HowTo       = require('./howto/app-howto');
var Invite      = require('./invite/app-invite');
var Login       = require('./login/app-login');
var Registration= require('./registration/app-registration');
var DashBoard  = require('./dashboard/app-dashboard');
var LoginStore  = require('../stores/app-login-store');
var LoginActions = require('../actions/app-login-actions');
var CreateForwardPackage   = require('./create-forward-package/app-create-forward-package');
var AppConstants = require('../constants/app-constants');
/**
 * middleware to check if user is logged in or not.
 * @param nextState
 * @param replace
 */
function requireAuth(nextState, replace) {
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
        { path : "login"        ,component: Login},
        { path : 'dashboard'    ,component:DashBoard   ,onEnter:requireAuth},
        { path : "howto"        ,component: HowTo       ,onEnter:requireAuth},
        { path : "mydocs"       ,component: MyDocs      ,onEnter:requireAuth},
        { path : "invite"       ,component: Invite      ,onEnter:requireAuth},
        { path : "registration" ,component: Registration},
        { path : "createpackage" ,component: CreateForwardPackage}

    ]
};

var api_token = localStorage.getItem(AppConstants.API_TOKEN);
var user_name = localStorage.getItem(AppConstants.USER_NAME);
if(api_token && user_name)
    LoginActions.continueSession(api_token,user_name);
module.exports = AppRouter