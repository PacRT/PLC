/**
 * Created by Hardik on 8/30/16.
 */
'use strict';
var React = require('react');
var TextField = require('material-ui/lib/text-field');
var Card =  require('material-ui/lib/card/card');
var CardActions =  require('material-ui/lib/card/card-actions');
var CardMedia =  require('material-ui/lib/card/card-media');
var FlatButton =  require('material-ui/lib/raised-button');
var CardText =  require('material-ui/lib/card/card-text');
var Col = require('react-bootstrap/lib/Col');
var LoginActions = require('../../actions/app-login-actions');
var CircularProgress = require('material-ui/lib/circular-progress');

var ForgotPassword = React.createClass({
    getInitialState: function(){
        return {
            "email" : "",
            "show_spinner" : false
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
            this.setState({
                show_spinner : false,
                email : ""
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
    render: function () {
        var floatingLableStyle = {
            "fontWeight" : "500",
            color: "#505050"
        };
        var CardBackGround = {
            "background" : "#eee",
            "borderWidth" : "0px",
            "borderColor" : "none",
            "borderStyle" : "none",
            "borderRadius" : "0px"
        };
        var TextFieldStyle = {
            "width" : "100%"
        };
        var LoginButtonStyle = {
            "marginBottom" : "10px",
            "height" : "50px"
        }
        var styles = {
            circularProgressStyle : {
                display: "block",
                margin: "auto"
            }
        }
        return (
            <div>
                <Col md={4} mdPush={4}>
                    <center>
                        <Card style={CardBackGround} id="send_reset_link">
                            <CardMedia >
                                <div className="login-icon" style={{width: "120px", height: "120px","maxWidth" : "120px","minWidth": "0px"}}>
                                    <i className="fa fa-lock"></i>
                                </div>
                            </CardMedia>
                            <CardText>
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
                            </CardText>
                            <CardActions style={LoginButtonStyle}>
                                <FlatButton style={{ "width" : "100%"}}  disabled={this.state.show_spinner} label="Send Me My Password" secondary={true} onTouchTap={this._sendPasswordResetLink}/>
                            </CardActions>
                        </Card>
                    </center>
                </Col>
            </div>
        );
    }
});

module.exports = ForgotPassword;
