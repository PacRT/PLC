/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/app-store.js');
var AppActions = require('../actions/app-actions.js');
var Header = require('./header/app-header');
var NavBar = require('./navbar/app-navbar');

function getCart() {
  return AppStore.getCart();
}

var Template = 
    React.createClass({
        handleClick:function(){
            console.log("it woeksss!!!!")
            AppActions.addItem();
            console.log(getCart());
        },    
        render:function(){
            return (
            	<div className="container">


                    <NavBar />
                    <button className="btn btn-default" onClick={this.handleClick}>is click workingAdd Item (an example output in the console .. it is using Actions-&lt;Dispatcher-&lt;Store one directional flow) </button>

                    {this.props.children}
                   <br/><br/>
                   { /* this button component uses view action dispatcher api  and it is using flux architecture */ }
                </div>
            	)
        }
	});



module.exports = Template;
