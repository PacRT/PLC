/**
 * Created by Hardik on 1/4/16.
 */
var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var TextField = require('material-ui/lib/text-field');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var Input = require('../utils/Input.js');

var Login = React.createClass({

    render: function () {
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={4} mdOffset={4}>
                            <h1>Login</h1>
                            <form autocomplete="off">
                                <Input
                                    text="User Name"
                                    ref="userName"
                                    type="text"
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
