/** @jsx React.DOM */
var Login = require('../components/auth/app-auth');
var AuthStore = require('../stores/app-auth.js');

var AuthenticationMixin = {
	  statics: {
	    willTransitionTo: function (transition) {
          console.log("authentication mixin!!!!");
	      if (!AuthStore.getState().loggedIn) {
	        Login.attemptedTransition = transition;
	        transition.redirect('/auth');
	        alert('Please auth first.');
	      }
	    }
	  }
	}


module.exports = AuthenticationMixin;