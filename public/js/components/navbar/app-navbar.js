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
var NavBar = React.createClass({
    getInitialState: function () {
        return this.state = this._getLoginState();
    },
    _getLoginState: function () {
        return {
            userLoggedIn: LoginStore.isLoggedIn(),
            isOpen : false
        };
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
    getNavBar: function () {
        if (!this.state.userLoggedIn) {
            return ( "" )
        } else {
            return (
                <Nav>
                    {/* <ul>
                        <li><Link to="/mydocs">My Docs</Link></li>
                        <li><Link to="/howto">How to</Link></li>
                        <li><Link to="/invite">Invite</Link></li>
                        <li><Link to="/devzone">Dev Zone</Link></li>
                        <li><Link to="/mythings">My Things</Link></li>
                        <li><Link to="/logout" onClick={this.logout}>Log out</Link></li>

                     <NavItem eventKey={2}  onClick={this._goToLocation.bind(null, 'devzone')}>Dev Zone</NavItem>
                     <NavItem eventKey={2}  onClick={this._goToLocation.bind(null, 'mythings')}>My Things</NavItem>
                    </ul>*/}
                    <Nav>
                        <NavItem eventKey={1}  onClick={this._goToLocation.bind(null, 'mydocs')}>My Docs</NavItem>
                        <NavItem eventKey={2}  onClick={this._goToLocation.bind(null, 'inbox')}>Inbox</NavItem>
                        <NavItem eventKey={2}  onClick={this._goToLocation.bind(null, 'sentitems')}>Sent Items</NavItem>
                        <NavItem eventKey={2}  onClick={this.logout}>Logout</NavItem>
                    </Nav>

                </Nav>
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
