/**
 * Created by Hardik on 1/4/16.
 */
var React = require('react');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var Input = require('../utils/Input.js');

var Login = React.createClass({
    getInitialState: function(){
        return {
            userName : null,
            password : null
        }
    },
    handleUserNameInput : function(){
        this.setState({
            userName : event.target.value
        });
    },
    handlePasswordInput : function(){
        this.setState({
            userName : event.target.value
        });
    },
    _handleSubmit: function(){

    },
    render: function () {
        return (
            <div>
                <Grid>
                    <Row className="show-grid" Onsubmit={this._handleSubmit}>
                        <Col xs={12} md={4} mdOffset={4}>
                            <h1>Login</h1>
                            <form autocomplete="off" >
                                <Input
                                    text="User Name"
                                    ref="userName"
                                    type="text"
                                    onChange={this.handleUserNameInput}
                                    emptyMessage="User Name can't be empty"
                                    errorMessage="User Already Exists"
                                />

                                <Input
                                    text="Password"
                                    type="password"
                                    ref="password"
                                    onChange={this.handlePasswordInput}
                                />
                                <button
                                    type="submit"
                                    className="button button_wide">
                                    Log In
                                </button>

                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

module.exports = Login;
