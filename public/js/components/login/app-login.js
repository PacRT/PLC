/**
 * Created by Hardik on 1/4/16.
 */
var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var TextField = require('material-ui/lib/text-field');

var Login = React.createClass({

    render: function () {
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={3} mdOffset={4}>
                            <h1>Login</h1>
                            <form autocomplete="off">
                                <TextField
                                    style={{"display": "block"}}
                                    floatingLabelText="Email" />
                                <TextField
                                    style={{"display": "block"}}
                                    floatingLabelText="Password"
                                    type="password" />
                                <RaisedButton label="Login"  style={{"float":"right"}}/>
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

module.exports = Login;
