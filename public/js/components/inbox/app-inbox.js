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
var Table = require('material-ui/lib/table/table');
var TableHeaderColumn = require('material-ui/lib/table/table-header-column');
var TableRow= require('material-ui/lib/table/table-row');
var TableHeader= require('material-ui/lib/table/table-header');
var TableRowColumn= require('material-ui/lib/table/table-row-column');
var TableBody= require('material-ui/lib/table/table-body');

var AppInbox = React.createClass({
    render : function(){
        return (
            <div>
                <SearchBarApp title="Inbox"/>
                <Grid>

                        <Col md={12} xs={12} style={{"paddingLeft" : "30px","marginTop": "10px"}}>
                            <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Thumbnail</TableHeaderColumn>
                                    <TableHeaderColumn>Type</TableHeaderColumn>
                                    <TableHeaderColumn>Document</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                                </Table>
                            <DocGrid view="INBOX"/>
                        </Col>

                </Grid>
                <DocPreview/>
            </div>
        )
    }
});

module.exports = AppInbox;