/** @jsx React.DOM */
var React = require('react');
var SignUpForm = require('./signup-form.js');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Jumbotron = require('react-bootstrap/lib/Jumbotron');

var SignUp = React.createClass({

    render: function () {
        return (
            <div>
                <Jumbotron>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={8} md={6} mdOffset={3}>
                                <SignUpForm invitationId={this.props.location.hash}/>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>
            </div>

        );
    }
});

module.exports = SignUp;
