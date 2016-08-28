/**
 * Created by Hardik on 2/4/16.
 */
'use strict';
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactBoostrap = require("react-bootstrap");
var Navbar = ReactBoostrap.Navbar;
var Nav = ReactBoostrap.Nav;
var NavItem = ReactBoostrap.NavItem;
var LoginStore = require('../../stores/app-login-store');
var LoginActions = require('../../actions/app-login-actions');
var NavBarActions = require('../../actions/app-navbar-actions');
var AccountCircle =  require('material-ui/lib/svg-icons/action/account-box');
var Badge = require('material-ui/lib/badge');
var NotificationPopUp = require('./app-notification-popup');

var NavBar = React.createClass({
    getInitialState: function () {
        return this._getLoginState();

    },
    _getLoginState: function () {
        return {
            userLoggedIn: LoginStore.isLoggedIn(),
            user_full_name :  LoginStore.getUserFullName(),
            isOpen : false,
            welcome_msg : "Welcome, "+ localStorage.getItem("FULL_NAME") + "!"
        }
    },
    componentDidMount: function () {
        LoginStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        this.setState({
           isOpen : false
        });
        LoginStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState(this._getLoginState());
    },
    logout: function (event) {
        event.preventDefault();
        LoginActions.logoutUser();
    },
    toggleNav : function(event){
        this.setState({
            isOpen : true
        });
    },
    getBrandName: function () {
        if (!this.state.userLoggedIn) {
            return (
                <Link to="/"><i className="fa fa-paper-plane-o"></i>PaperLess Club</Link>
            )
        } else {
            return (
                <Link to="mydocs"><i className="fa fa-paper-plane-o"></i>PaperLess Club</Link>
            )
        }
    },
    _goToLocation : function (location) {
        NavBarActions.goToLocation(location)
    },
    getClassName : function(currentPath){
       if(location.pathname === "/"+currentPath){
           return "active";
       }
      return "";
    },
    getNavBar: function () {
        var cardHeaderStyle = {
            "fill"      : "rgb(255, 255, 255)"
        };
        var full_name_style = {
            color: "rgb(255,255,255)"
        }
        if (!this.state.userLoggedIn) {
            return ( "" )
        } else {
            return (
                <div>

                    <Nav>
                        <NavItem className={this.getClassName('mydocs')}    onClick={this._goToLocation.bind(null, 'mydocs')}>My Docs</NavItem>
                        <NavItem className={this.getClassName('invite')}     onClick={this._goToLocation.bind(null, 'invite')}>Invite</NavItem>
                        <NavItem className={this.getClassName('inbox')}     onClick={this._goToLocation.bind(null, 'inbox')}>Inbox</NavItem>
                        <NavItem className={this.getClassName('sentitems')} onClick={this._goToLocation.bind(null, 'sentitems')}>Sent Items</NavItem>
                        <NavItem onClick={this.logout}>Logout</NavItem>
                    </Nav>
                    <Nav pullRight>
                           <span style={full_name_style}> {this.state.welcome_msg} </span>
                            <Badge
                                    badgeContent={10}
                                    secondary={true}
                                    badgeStyle={{top:0, right: 18}}
                                    style={{padding: "0px 15px 0px 0px" }}
                                >
                                    <NotificationPopUp/>
                                </Badge>
                            <AccountCircle style={cardHeaderStyle}/>
                    </Nav>
                </div>

            )
        }
    },
    render: function () {
        return (
            <Navbar inverse className="navbar-fixed-top">
                <Navbar.Header>
                    <Navbar.Brand>
                        {this.getBrandName()}
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {this.getNavBar()}
                </Navbar.Collapse>
            </Navbar>
        );
    }
});

module.exports = NavBar;
