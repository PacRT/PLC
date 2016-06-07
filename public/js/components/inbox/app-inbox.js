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


var InboxActions = require('../../actions/app-inbox-actions');
var InboxStore = require('../../stores/app-inbox-store');

var AppThreadList = require('./app-thread-list');
var AppInbox = React.createClass({
    getInitialState : function(){
      return {
          "key" : Math.random(),
          "store" : []
      }
    },
    componentDidMount: function() {
        InboxActions.getThreads();
        InboxStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        InboxStore.resetStore();
        InboxStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        var inbox_store = InboxStore.getStore();
        this.setState({
            store : inbox_store
        });
    },
    _markThreadRead : function(threadIndex){
      InboxActions.markThreadRead(threadIndex);
    },
    render : function(){
        return (
            <div>
                <AppThreadList threads={this.state.store}
                               markThreadRead={this._markThreadRead}
                />
            </div>
        )
    }
});

module.exports = AppInbox;