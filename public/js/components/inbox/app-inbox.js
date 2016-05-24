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
var Table = require('material-ui/Table/Table');
var TableHeaderColumn = require('material-ui/Table/TableHeaderColumn');
var TableRow= require('material-ui/Table/TableRow');
var TableHeader= require('material-ui/Table/TableHeader');
var TableRowColumn= require('material-ui/Table/TableRowColumn');
var TableBody= require('material-ui/Table/TableBody');

var AppInbox = React.createClass({
    getInitialState : function(){
      return {
          "key" : Math.random()
      }
    },
    componentDidMount:function(){
        this.setState({
            "key" : Math.random()
        });
    },
    render : function(){
        return (
            <div>
                <SearchBarApp title="Inbox" />
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
                            <DocGrid view="INBOX" key={this.state.key}/>
                        </Col>

                </Grid>
                <DocPreview/>
            </div>
        )
    }
});

module.exports = AppInbox;