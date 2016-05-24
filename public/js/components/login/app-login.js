/**
 * Created by Hardik on 1/4/16.
 */
var React = require('react');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Input = require('../utils/Input.js');
var LoginActions = require('../../actions/app-login-actions');
var _ = require("underscore");
var TextField = require('material-ui/TextField/TextField');
var AccountCircle =  require('material-ui/svg-icons/action/account-circle');
var Card =  require('material-ui/Card/Card');
var CardActions =  require('material-ui/Card/CardActions');
var CardMedia =  require('material-ui/Card/CardMedia');
var FlatButton =  require('material-ui/FlatButton/FlatButton');
var CardText =  require('material-ui/Card/CardText');
var Colors = require('material-ui/styles/colors');

var Login = React.createClass({
    getInitialState: function(){
        return {
            userName : "",
            password : ""
        }
    },
    handleUserNameInput : function(event){
        this.setState({
            userName : event.target.value
        });
    },
    handlePasswordInput : function(event){
        this.setState({
            password : event.target.value
        });
    },
    isEmpty: function (value) {
        return !_.isNull(value);
    },
    _handleSubmit: function(event){

        var can_login =!_.isNull(this.state.userName) && !_.isNull(this.state.password)
        if(can_login){
            LoginActions.loginUser(this.state.userName,this.state.password);
        }else{
            this.refs.userName.isValid();
            this.refs.password.isValid();
        }
    },
    _openSignup : function(){
        LoginActions.openSignUpForm();
    },
    render: function () {
        var floatingLableStyle = {
            "fontWeight" : "500",
            color: "#505050"
        };
        var CardBackGround = {
            "background" : "#eee"
        };
        var cardHeaderStyle = {
            "height" : "50px",
            "marginTop" : "20px"
        };
        var underlineStyle = {
            "borderColor" : Colors.orange500
        };
        var TextFieldStyle = {
            "width" : "100%"
        };
        var LoginButtonStyle = {
            "marginBottom" : "10px",
            "height" : "50px"
        }
        return (
            <div>
                <Card style={CardBackGround}>
                    <CardMedia >
                        <AccountCircle style={cardHeaderStyle}/>
                    </CardMedia>
                    <CardText>
                        <TextField
                            onChange={this.handleUserNameInput}
                            value={this.state.userName}
                            style={TextFieldStyle}
                            floatingLabelText="Email or Username"
                            floatingLabelStyle={floatingLableStyle}
                            underlineFocusStyle={underlineStyle}
                        />
                        <TextField
                            value={this.state.password}
                            onChange={this.handlePasswordInput}
                            style={TextFieldStyle}
                            floatingLabelText="Password"
                            floatingLabelStyle={floatingLableStyle}
                            underlineFocusStyle={underlineStyle}
                            type="password"
                        />
                    </CardText>
                    <CardActions style={LoginButtonStyle}>
                        <FlatButton className="pull-right" label="Login" onTouchTap={this._handleSubmit}/>
                        {/*   <FlatButton className="pull-right" label="Sign Up" onTouchTap={this._openSignup}x/>*/}

                    </CardActions>
                </Card>
            </div>
        );
    }
});

module.exports = Login;
