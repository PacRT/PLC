/** @jsx React.DOM */
var React = require('react');
var SignUpForm = require('./signup-form.js');
var SignUp = React.createClass({

    render: function () {
        return (
            <div className="application_wrapper">
                <SignUpForm/>
            </div>
        );
    }
});

module.exports = SignUp;
