'use strict';
var React = require('react');
var Grid = require('react-bootstrap/lib/Grid');
var RaisedButton =  require('material-ui').RaisedButton;
var Card = require('material-ui').Card;
var CardActions = require('material-ui').CardActions;
var CardText = require('material-ui').CardText;
var CustomInput = require('./../utils/Input.js');
var Col = require('react-bootstrap/lib/Col');
var CardMedia =  require('material-ui').CardMedia;
var _ = require('lodash');
var LoginActions = require('../../actions/app-login-actions');

var ResetPassword = React.createClass({
    getInitialState: function(){
        return  {
            "invitation_emails_tag" : [],
            "password":"",
            "confirmPassword": "",
            "show_spinner" : false,
            forbiddenWords: ["password", "user", "username"],
            validatorVisible : true
        }
    },
    handlePasswordInput : function(index,event){
        switch (index){
            case 1:
                if (!_.isEmpty(this.state.confirmPassword)) {
                    this.refs.confirmPassword.isValid();
                }
                this.refs.confirmPassword.hideError();
                this.setState({
                   password : event.target.value
                });
                break;
            case 2:
                this.refs.password.isValid();
                this.setState({
                    confirmPassword : event.target.value
                });
                break;
        }
    },
    isConfirmedPassword: function (event) {
        return (event == this.state.password)
    },
    _handleSubmit : function(){
        var canProceed = this.refs.password.isValid() && this.refs.confirmPassword.isValid();
        if (canProceed) {
           LoginActions.resetPassword(this.props.location.hash.split("#/")[1], this.state.password);
        } else {
            this.refs.password.isValid();
            this.refs.confirmPassword.isValid();
        }
    },
    render: function () {
        var styles = {
            circularProgressStyle : {
                display: "block",
                margin: "auto"
            }
        }
        var CardBackGround = {
            "background" : "#eee",
            "borderWidth" : "0px",
            "borderColor" : "none",
            "borderStyle" : "none",
            "borderRadius" : "0px",
            "overflow": "visible"
        };
        var LoginButtonStyle = {
            "marginBottom" : "10px",
            "height" : "50px"
        }
        return (
            <div>
                <Col md={5} mdPush={4}>
                    <Card style={CardBackGround} id="reset_pwd_form">
                        <CardMedia >
                            <div className="login-icon" style={{width: "120px", height: "120px","maxWidth" : "120px","minWidth": "0px"}}>
                                <i className="fa fa-lock"></i>
                            </div>
                        </CardMedia>
                        <CardText>
                            <header className="ius-header-container">
                                <span id="ius-check-email-header" className="ius-header">
                                    Create a new password
                                </span>
                                <span id="ius-check-email-sub-header" className="ius-sub-header">
                                    Create a password you've never used before. This will help keep your account safe.
                                </span>
                            </header>
                            <CustomInput
                                text="Password"
                                type="password"
                                ref="password"
                                validator={this.state.validatorVisible}
                                minCharacters="8"
                                requireCapitals="1"
                                requireNumbers="1"
                                forbiddenWords={this.state.forbiddenWords}
                                value={this.state.password}
                                emptyMessage="Password is invalid"
                                onChange={this.handlePasswordInput.bind(null,1)}
                            />

                            <CustomInput
                                text="Confirm password"
                                ref="confirmPassword"
                                type="password"
                                validate={this.isConfirmedPassword}
                                value={this.state.confirmPassword}
                                onChange={this.handlePasswordInput.bind(null,2)}
                                emptyMessage="Please confirm your password"
                                errorMessage="Passwords don't match"
                            />
                        </CardText>
                        <CardActions style={LoginButtonStyle}>
                            <RaisedButton style={{ "width" : "100%"}}
                                          className="pull-right"
                                          secondary={true}
                                          label="Reset Password"
                                          onTouchTap={this._handleSubmit}/>
                        </CardActions>
                    </Card>
                </Col>
            </div>
        );
    }
});

module.exports = ResetPassword;
