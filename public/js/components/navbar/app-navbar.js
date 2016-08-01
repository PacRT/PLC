/**
 * Created by Hardik on 2/4/16.
 */
'use strict';
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactBoostrap = require("react-bootstrap")
var Navbar = ReactBoostrap.Navbar;
var Nav = ReactBoostrap.Nav;
var NavItem = ReactBoostrap.NavItem;
var MenuItem = ReactBoostrap.MenuItem;
var NavDropdown = ReactBoostrap.NavDropdown;
var LeftNav = require('material-ui/lib/left-nav');
var MenuItem = require('material-ui/lib/menus/menu-item');
var LoginStore = require('../../stores/app-login-store');
var LoginActions = require('../../actions/app-login-actions');
var NavBarActions = require('../../actions/app-navbar-actions');
var AccountCircle =  require('material-ui/lib/svg-icons/action/account-box');
var NotificationsIcon = require('material-ui/lib/svg-icons/social/notifications');
var Badge = require('material-ui/lib/badge');
var IconButton =  require('material-ui/lib/icon-button');
var Colors = require('material-ui/lib/styles/colors');

var NavBar = React.createClass({
    getInitialState: function () {
        return this._getLoginState();

    },
    _getLoginState: function () {
        return {
            userLoggedIn: LoginStore.isLoggedIn(),
            user_full_name :  LoginStore.getUserFullName(),
            isOpen : false
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
                <Link to="dashboard"><i className="fa fa-paper-plane-o"></i>PaperLess Club</Link>
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
            "marginTop" : "15px",
            "fill"      : "rgb(255, 255, 255)"
        };
        var full_name_style = {
            position: "relative",
            color: "rgb(255,255,255)",
            top: "-0.75em",
            right: "10px"
        }
        if (!this.state.userLoggedIn) {
            return ( "" )
        } else {
            return (
                <div>
                    <Nav>
                        <Nav>
                            <NavItem className={this.getClassName('mydocs')}    onClick={this._goToLocation.bind(null, 'mydocs')}>My Docs</NavItem>
                            <NavItem className={this.getClassName('inbox')}     onClick={this._goToLocation.bind(null, 'inbox')}>Inbox</NavItem>
                            <NavItem className={this.getClassName('sentitems')} onClick={this._goToLocation.bind(null, 'sentitems')}>Sent Items</NavItem>
                            <NavItem onClick={this.logout}>Logout</NavItem>
                        </Nav>

                    </Nav>
                    <div className="pull-right" style={{ "height" : "0px"}}>
                       <span style={full_name_style}>Welcome, { localStorage.getItem("FULL_NAME") } ! </span>
                        <Badge
                            badgeContent={10}
                            secondary={true}
                            badgeStyle={{top:0, right: 18}}
                            style={{padding: "0px 27px 0px 0px",  top : "-8px"}}
                        >
                            <IconButton tooltip="Notifications"  style={{ "fill": "rgb(255,255,255)" }}>
                                <NotificationsIcon   color={Colors.white} />
                            </IconButton>
                        </Badge>
                        <AccountCircle style={cardHeaderStyle}/>
                    </div>
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
