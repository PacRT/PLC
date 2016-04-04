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
var EditMetaData = require('./app-edit-metadata-modal');

var MyDocs = React.createClass({
    render: function () {
        return (
            <div>
                <SearchBarApp title="My Docs"/>
                <Grid>
                    <Row>
                        <Col md={12} xs={12}>
                            <DocGrid view="MY_DOCS"/>
                        </Col>
                    </Row>
                </Grid>
                <DocPreview/>
                <EditMetaData/>
            </div>
        )
    }
});

module.exports = MyDocs;
