/**
 * Created by Hardik on 12/22/15.
 */
/** @jsx React.DOM */
var React = require('react');
var SearchBarApp = require('./app-searchbar');
var DocGrid = require('./app-doc-grid');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var DocPreview = require('./app-doc-preview');
var MyDocs = React.createClass({
    render: function () {
        return (
            <div>
                <SearchBarApp/>
                <Grid>
                    <Row>
                        <Col md={12} xs={12}>
                            <DocGrid/>
                        </Col>
                    </Row>
                </Grid>
                <DocPreview/>
            </div>
        )
    }
});

module.exports = MyDocs;
