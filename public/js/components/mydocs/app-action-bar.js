/**
 * Created by hmistry on 5/22/16.
 */
var React = require('react');
var Toolbar = require('material-ui/Toolbar/Toolbar');
var ToolbarGroup = require('material-ui/Toolbar/ToolbarGroup');
var ToolbarSeparator = require('material-ui/Toolbar/ToolbarSeparator');
var ToolbarTitle = require('material-ui/Toolbar/ToolbarTitle');
var TextField = require('material-ui/TextField/TextField');
var FlatButton = require('material-ui/FlatButton/FlatButton');
var MyDocsStore = require('../../stores/app-mydocs-store');
var CreateForwardPkgActions = require('../../actions/app-create-forward-package-actions');
var CreateForwardPkgStore = require('../../stores/app-create-forward-package-store');
var ForwardPkgModal = require('../create-forward-package/forward-package-modal');

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
        var packages = [];
        var pkg_json = {
            "package_type" : "Package1",
            "packages_added" : [],
            "recepients" : []

        };
        for(var index in this.state.store.selected_docs){
            var doc_json = {
                "file_name" : this.state.store.files_name[index],
                "docs_link" : "/docs" + this.state.store.docs_link[index].split("/docs")[1]
            }
            pkg_json["packages_added"].push(doc_json);
        }
        packages.push(pkg_json);
        CreateForwardPkgActions.openForwardPkgModal(packages);
    },
    render :function(){
        return(
            <div style={{paddingLeft:'44px',position:"fixed",width:"79%","bottom":0}}>
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
                <ForwardPkgModal/>
            </div>
        )
    }
});

module.exports = ActionBarApp;
