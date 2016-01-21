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

var NavBar = React.createClass({

    render: function () {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#"><i className="fa fa-paper-plane-o"></i>PaperLess Club</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#/mydocs">My Docs</NavItem>
                        <NavItem eventKey={2} href="#/howto">How to</NavItem>
                        <NavItem eventKey={2} href="#/invite">Invite</NavItem>
                        <NavItem eventKey={2} href="#">Dev Zone</NavItem>
                        <NavItem eventKey={2} href="#">My Things</NavItem>
                        <NavItem eventKey={2} href="#/login">Login</NavItem>
                        <NavItem eventKey={2} href="#/registration">Sign Up</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
});




module.exports = NavBar;



