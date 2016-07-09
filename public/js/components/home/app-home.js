'use strict';
var React = require('react');
var Jumbotron = require('react-bootstrap/lib/Jumbotron');
var RaisedButton = require('material-ui/lib/raised-button');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var LoginApp = require('../login/app-login');
var HomePage = React.createClass({
    render: function () {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col md={8} xs={12}>
                            <Jumbotron>
                                <h2>Welcome to <i>PaperLess Club</i></h2>
                                <p>Say Bye Bye to Paper!</p>
                                <RaisedButton label="Learn More" secondary={true}/>

                            </Jumbotron>
                        </Col>
                        <Col md={4} xs={12}>
                            <LoginApp/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

module.exports = HomePage;
