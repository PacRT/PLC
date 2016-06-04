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

var AppThreadList = require('./app-thread-list');
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
                <AppThreadList/>
            </div>
        )
    }
});

module.exports = AppInbox;