/**
 * Created by Hardik on 1/9/16.
 */
/** @jsx React.DOM */
var React = require('react');
var Input = require('./components/Input.js');
var _ = require('underscore');
var Icon = require('./components/Icon.js');

var SignUpForm = React.createClass({
    getInitialState: function () {
        return {
            userName : null,
            email: null,
            firstName: null,
            lastName :null,
            phoneNumber: null,
            password: null,
            passwordConfirm: null,
            forbiddenWords: ["password", "user", "username"]
        }
    },

    handlePasswordInput: function (event) {
        if(!_.isEmpty(this.state.passwordConfirm)){
            this.refs.passwordConfirm.isValid();
        }
        this.refs.passwordConfirm.hideError();
        this.setState({
            password: event.target.value
        });
    },

    handleConfirmPasswordInput: function (event) {
        this.setState({
            passwordConfirm: event.target.value
        });
    },

    saveAndContinue: function (e) {
        e.preventDefault();
        console.log("Put breakpoint here!!!");
        var canProceed = this.validateEmail(this.state.email)
            && this.refs.password.isValid()
            && this.refs.passwordConfirm.isValid();

        if(canProceed) {
            var data = {
                email: this.state.email
            }
            alert('Thanks.');
        } else {
            this.refs.userName.isValid();
            this.refs.email.isValid();
            this.refs.firstName.isValid();
            this.refs.lastName.isValid();
            this.refs.phoneNumber.isValid();
            this.refs.password.isValid();
            this.refs.passwordConfirm.isValid();
        }
    },

    isConfirmedPassword: function (event) {
        return (event == this.state.password)
    },

    handlePhoneNumberInput: function(event) {
        this.setState({
            phoneNumber: event.target.value
        })
    },
    handleFirstNameInput: function(event){
      this.setState({
          firstName : event.target.values
      })
    },
    handleLastNameInput: function(event){
        this.setState({
            lastName : event.target.values
        })
    },
    handleUserNameInput: function(event){
        this.setState({
            userName : event.target.values
        })
    },
    handleEmailInput: function(event){
        this.setState({
            email: event.target.value
        });
    },

    validateEmail: function (event) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(event);
    },

    isEmpty: function (value) {
        return !_.isEmpty(value);
    },

    render: function() {
        return (
            <div className="create_account_screen">

                <div className="create_account_form">
                    <h1>Sign Up For PLC</h1>
                    <p></p>
                    <form onSubmit={this.saveAndContinue}>

                        <Input
                            text="User Name"
                            ref="userName"
                            type="text"
                            userValidator="true"
                            minCharacters="4"
                            requireCapitals="1"
                            requireNumbers="1"
                            validate={this.isEmpty}
                            defaultValue={this.state.userName}
                            value={this.state.userName}
                            onChange={this.handleUserNameInput}
                            emptyMessage="User Name can't be empty"
                        />

                        <Input
                            text="First Name"
                            ref="firstName"
                            type="text"
                            validate={this.isEmpty}
                            defaultValue={this.state.firstName}
                            value={this.state.firstName}
                            onChange={this.handleFirstNameInput}
                            emptyMessage="First Name can't be empty"
                        />
                        <Input
                            text="Last Name"
                            ref="lastName"
                            type="text"
                            validate={this.isEmpty}
                            defaultValue={this.state.lastName}
                            value={this.state.lastName}
                            onChange={this.handleLastNameInput}
                            emptyMessage="Last Name can't be empty"
                        />

                        <Input
                            text="Email Address"
                            ref="email"
                            type="text"
                            defaultValue={this.state.email}
                            validate={this.validateEmail}
                            value={this.state.email}
                            onChange={this.handleEmailInput}
                            errorMessage="Email is invalid"
                            emptyMessage="Email can't be empty"
                        />

                        <Input
                            text="Phone Number"
                            ref="phoneNumber"
                            value={this.state.phoneNumber}
                            onChange={this.handlePhoneNumberInput}
                            emptyMessage="Company name can't be empty"
                        />

                        <Input
                            text="Password"
                            type="password"
                            ref="password"
                            validator="true"
                            minCharacters="8"
                            requireCapitals="1"
                            requireNumbers="1"
                            forbiddenWords={this.state.forbiddenWords}
                            value={this.state.password}
                            emptyMessage="Password is invalid"
                            onChange={this.handlePasswordInput}
                        />

                        <Input
                            text="Confirm password"
                            ref="passwordConfirm"
                            type="password"
                            validate={this.isConfirmedPassword}
                            value={this.state.confirmPassword}
                            onChange={this.handleConfirmPasswordInput}
                            emptyMessage="Please confirm your password"
                            errorMessage="Passwords don't match"
                        />

                        <button
                            type="submit"
                            className="button button_wide">
                            CREATE ACCOUNT
                        </button>

                    </form>
                </div>

            </div>
        );
    }

});

module.exports = SignUpForm;