/**
 * Created by hmistry on 5/22/16.
 */
var React = require('react');
var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
var TextField = require('material-ui/lib/text-field');
var FlatButton = require('material-ui/lib/flat-button');
var MyDocsStore = require('../../stores/app-mydocs-store');

var ActionBarApp = React.createClass({
    getInitialState: function () {
        return {
            store: MyDocsStore.getDocStore()
        }
    },
    componentDidMount: function () {
        MyDocsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        MyDocsStore.resetDocStore();
        MyDocsStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        this.setState({
            store: MyDocsStore.getDocStore()
        });
    },
    _createPkg : function(){
        console.log(this.state.store.selected_docs);
    },
    render :function(){
        return(
            <div style={{paddingLeft:'44px',position:"absolute",width:"79%","paddingBottom":"4em"}}>
                <Toolbar>
                    <ToolbarGroup>
                        <FlatButton label="Reports"  />
                        <FlatButton label="Forward"  />
                        <FlatButton label="Create Package" onTouchTap={this._createPkg}  />
                        <FlatButton label="FedEx"  />
                        <FlatButton label="UPS"  />
                        <FlatButton label="Messages"  />
                    </ToolbarGroup>
                </Toolbar>
            </div>
        )
    }
});

module.exports = ActionBarApp;
