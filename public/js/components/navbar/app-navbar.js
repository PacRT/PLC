/**
 * Created by Hardik on 2/4/16.
 */
/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactBoostrap = require("react-bootstrap")
var Navbar = ReactBoostrap.Navbar;
var Nav = ReactBoostrap.Nav;
var NavItem = ReactBoostrap.NavItem;
var MenuItem = ReactBoostrap.MenuItem;
var NavDropdown = ReactBoostrap.NavDropdown;
var LoginStore = require('../../stores/app-login-store');
var LoginActions = require('../../actions/app-login-actions');

var NavBar = React.createClass({
    getInitialState: function () {
        return this.state = this._getLoginState();
    },
    _getLoginState : function(){
        return {
            userLoggedIn: LoginStore.isLoggedIn()
        };
    },
    componentDidMount: function() {
        LoginStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        LoginStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(this._getLoginState());
    },
    logout:function(event) {
        event.preventDefault();
        LoginActions.logoutUser();
    },
    getBrandName:function(){
        if (!this.state.userLoggedIn) {
            return (
                <a href="#"><i className="fa fa-paper-plane-o"></i>PaperLess Club</a>
            )
        }else{
            return (
                <a href="#/home"><i className="fa fa-paper-plane-o"></i>PaperLess Club</a>
            )
        }
    },
    getNavBar : function(){
        if (!this.state.userLoggedIn) {
                return (
                    <Nav>
                        <NavItem href="#/login">Login</NavItem>
                        <NavItem href="#/registration">Signup</NavItem>
                    </Nav>
                )
            } else {
                return (
                    <Nav>
                        <NavItem eventKey={1} href="#/mydocs">My Docs</NavItem>
                        <NavItem eventKey={2} href="#/howto">How to</NavItem>
                        <NavItem eventKey={2} href="#/invite">Invite</NavItem>
                        <NavItem eventKey={2} href="#/devzone">Dev Zone</NavItem>
                        <NavItem eventKey={2} href="#/mythings">My Things</NavItem>
                        <NavItem eventKey={2} onClick={this.logout} href="#/logout">Logout</NavItem>
                    </Nav>
                )
        }
     },
    render: function () {
        return (
            <Navbar inverse className="navbar-fixed-top">
                <div className="container">
                    <Navbar.Header>
                        <Navbar.Brand>
                            {this.getBrandName()}
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        {this.getNavBar()}
                    </Navbar.Collapse>
                </div>
            </Navbar>
        );
    }
});

module.exports = NavBar;



