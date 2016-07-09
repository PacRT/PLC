'use strict';
var React = require('react');
var ActionRemainder = require('../action-remainder/app-actionremainder');
var UploadZone = require('../uploadzone/app-uploadzone');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var Dashboard = React.createClass({
    render: function () {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col md={12} xs={12}>
                            <Col md={3} xs={12}>
                                <UploadZone/>
                            </Col>
                            <Col md={3} xs={12} mdPush={6}  >
                                <ActionRemainder/>
                            </Col>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

module.exports = Dashboard;
