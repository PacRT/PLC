/**
 * Created by Hardik on 4/3/16.
 */
var React = require("react");
var SearchBarApp = require('../mydocs/app-searchbar');
var DocGrid = require('../mydocs/app-doc-grid');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var DocPreview = require('../mydocs/app-doc-preview');

var AppInbox = React.createClass({
    render : function(){
        return (
            <div>
                <SearchBarApp title="Inbox"/>
                <Grid>
                    <Row>
                        <Col md={12} xs={12}>
                            <DocGrid view="INBOX"/>
                        </Col>
                    </Row>
                </Grid>
                <DocPreview/>
            </div>
        )
    }
});

module.exports = AppInbox;