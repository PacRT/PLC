/**
 * Created by Hardik on 8/30/16.
 */
'use strict';
var React = require('react');
var TextField = require('material-ui/TextField').default;
var Card =  require('material-ui').Card;
var CardActions =  require('material-ui').CardActions;
var CardMedia =  require('material-ui').CardMedia;
var RaisedButton =  require('material-ui').RaisedButton;
var CardText =  require('material-ui').CardText;
var Col = require('react-bootstrap/lib/Col');
var LoginActions = require('../../actions/app-login-actions');
var CircularProgress = require('material-ui').CircularProgress;

var ForgotPassword = React.createClass({
    getInitialState: function(){
        return {
            "email" : "",
            "show_spinner" : false,
            "reset_view" : false,
            "show_check_email_msg" : false,
            "show_send_link_form" : true,
            "send_email" : ""
        }
    },
    componentDidMount : function () {
        document.getElementById("send_reset_link").addEventListener("keydown",this._handleEnterKey);
    },
    componentWillUnMount : function(){
        document.getElementById("send_reset_link").removeEventListener("keydown",this._handleEnterKey);
    },
    _sendPasswordResetLink : function(){
        var api_promise =  LoginActions.sendPasswordResetLink(this.state.email);
        this.setState({
            show_spinner : true
        });
        api_promise.then(function(response){
            var split_mail = this.state.email.split("@");
            var user_name = split_mail[0];
            this.setState({
                show_spinner : false,
                email : "",
                send_email : user_name[0]+"*****"+user_name[user_name.length - 1]+"@"+split_mail[1],
                show_check_email_msg : true,
                show_send_link_form : false
            });
        }.bind(this));
    },
    _handleEnterKey: function(event){
        switch(event.keyCode){
            case 13:
                this._sendPasswordResetLink();
                break;
        }
    },
    handleEmailInput : function(event){
        this.setState({
            email : event.target.value
        });
    },
    _resetView : function(){
        this.setState({
            "email" : "",
            "send_email": "",
            "show_spinner" : false,
            "reset_view" : false,
            "show_check_email_msg" : false,
            "show_send_link_form" : true
        });
    },
    _getCheckEmailMessageJSX : function(){
        return(
            <section id="ius-check-email-message" className="ius-section">
                <header className="ius-header-container"><span id="ius-check-email-header" className="ius-header">Check your email</span>
                    <span id="ius-check-email-sub-header" className="ius-sub-header">
                        We sent a verification email for your security. It might take a few minutes to arrive.
                    </span></header>
                <div>
                    <div className="ius-default-paragraph">
                        <span id="ius-email-address-send-header">We sent it to:</span>
                        <ul id="ius-email-addresses-sent" className="ius-emphasis ius-display-block">
                            <li data-type="data-row"> {this.state.send_email} </li>
                        </ul>
                    </div>
                    <span className="ius-default-paragraph">
                        <span id="ius-didnt-receive-email-text">Didn't get it?</span>
                        <a id="ius-try-again-link" onTouchTap={this._resetView}>Try again</a>
                    </span>
                </div>
            </section>
        )
    },
    _getSendPwdResetLinkForm : function(){
        var floatingLableStyle = {
            "fontWeight" : "500",
            color: "#505050"
        };
        var TextFieldStyle = {
            "width" : "100%"
        };
        var styles = {
            circularProgressStyle : {
                display: "block",
                margin: "auto"
            }
        }
        return (
            <div>
                <p className="text-center">
                    To reset your password, enter the email address you use to sign in to PaperlessClub.
                </p>
                {
                    this.state.show_spinner ?
                        <CircularProgress style={styles.circularProgressStyle}/> :
                        <TextField
                            onChange={this.handleEmailInput}
                            value={this.state.email}
                            style={TextFieldStyle}
                            type="email"
                            floatingLabelText="Email Id"
                            floatingLabelStyle={floatingLableStyle}
                        />
                }
            </div>
        )
    },
    render: function () {
        var CardBackGround = {
            "background" : "#eee",
            "borderWidth" : "0px",
            "borderColor" : "none",
            "borderStyle" : "none",
            "borderRadius" : "0px"
        };

        var LoginButtonStyle = {
            "marginBottom" : "10px",
            "height" : "50px"
        }
        var cardBody = "";
        var cardAction = "";
        if(this.state.show_send_link_form){
            cardBody = this._getSendPwdResetLinkForm();
            cardAction =  <CardActions style={LoginButtonStyle}>
            <RaisedButton style={{ "width" : "100%"}}
            disabled={this.state.show_spinner}
            label="Send Me My Password"
            secondary={true} onTouchTap={this._sendPasswordResetLink}/>
            </CardActions>

        }
        if(this.state.show_check_email_msg){
            cardBody = this._getCheckEmailMessageJSX();
        }
        return (
            <div>
                <Col md={4} mdPush={4}>
                        <Card style={CardBackGround} id="send_reset_link">
                            <CardMedia >
                                <div className="login-icon" style={{width: "120px", height: "120px","maxWidth" : "120px","minWidth": "0px"}}>
                                    <i className="fa fa-lock"></i>
                                </div>
                            </CardMedia>
                            <CardText>
                                {cardBody}
                            </CardText>
                            {cardAction}
                        </Card>
                </Col>
            </div>
        );
    }
});

module.exports = ForgotPassword;
