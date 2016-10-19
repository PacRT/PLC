/**
 * Created by Hardik on 12/22/15.
 */
'use strict';
var React = require('react');
var SearchBarApp = require('./../mydocs_v2/app-searchbar');
var ActionBarApp = require('./../mydocs_v2/app-action-bar');

var DocGrid = require('./app-doc-grid');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var DocPreview = require('./../mydocs_v2/app-doc-preview');
var EditMetaData = require('./app-edit-metadata-modal');
var Table = require('material-ui/lib/table/table');
var UploadZone = require('../uploadzone/app-uploadzone');
var MyDocs = React.createClass({
    render: function () {
        return (
            <div>
                <SearchBarApp title="My Docs"/>
                    <Grid>

                        <Col md={12} xs={12} style={{"paddingBottom" : "5em"}}>
                            <DocGrid view="MY_DOCS"/>
                            <ActionBarApp title="Take An Action"/>
                        </Col>
                    </Grid>
                    <DocPreview hybridView={false}/>
                <EditMetaData/>
                <UploadZone/>
            </div>
        )
    }
});

module.exports = MyDocs;
