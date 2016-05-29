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
var CreateForwardPkgActions = require('../../actions/app-create-forward-package-actions');
var ForwardPkgModalStore = require('../../stores/app-forward-package-modal-store');
var ForwardPkgModal = require('../create-forward-package/forward-package-modal');

var ActionBarApp = React.createClass({
    getInitialState: function () {
        return {
            store: MyDocsStore.getDocStore(),
            is_drawer_open : false

        }
    },
    componentDidMount: function () {
        MyDocsStore.addChangeListener(this._onChange)
        ForwardPkgModalStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        MyDocsStore.resetDocStore();
        MyDocsStore.removeChangeListener(this._onChange);
        ForwardPkgModalStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        this.setState({
            store: MyDocsStore.getDocStore(),
            is_drawer_open : ForwardPkgModalStore.isModalOpen()
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
        var is_open = this.state.is_drawer_open;
        CreateForwardPkgActions.openForwardPkgModal(packages,!is_open);
        this.setState({
            "is_drawer_open" : !is_open
        })
    },
    render :function(){
        return(
         <div>
             <div style={{paddingLeft:'1em',position:"fixed",width:"77.2%","bottom":0}}>
                <Toolbar>
                    <ToolbarGroup>
                        <FlatButton label="Reports"  />
                        <FlatButton label="Forward"  />
                        <FlatButton label="Forward Docs" onTouchTap={this._createPkg}  />
                        <FlatButton label="FedEx"  />
                        <FlatButton label="UPS"  />
                        <FlatButton label="Messages"  />
                    </ToolbarGroup>
                </Toolbar>
                <ForwardPkgModal/>
            </div>
             {/*<div style={{paddingLeft:'1em',position:"fixed",width:"77%","bottom":0}}>
                <ul className="dock">
                    <li>
                        <a href="#" title="Full RSS Feed">
                            <img src="https://placeholdit.imgix.net/~text?txtsize=12&txt=Reports&w=100&h=50&txttrack=1"/>
                        </a>
                    </li>
                    <li>
                        <a href="#" title="Feed via Emal">
                            <img src="https://placeholdit.imgix.net/~text?txtsize=12&txt=Forward&w=100&h=50&txttrack=1"/>
                        </a>
                    </li>
                    <li>
                        <a href="#" title="Follow me on Twitter">
                            <img src="https://placeholdit.imgix.net/~text?txtsize=12&txt=Forward%20Docs&w=100&h=50&txttrack=1"/>
                        </a>
                    </li>
                    <li>
                        <a href="#" title="I'm on Facebook">
                            <img src="http://placehold.it/100X50?txt=FedEx?txttrack=1"/>
                        </a>
                    </li>
                    <li>
                        <a href="#" title="Save me">
                            <img src="http://placehold.it/100?text=UPS?text"/>
                        </a>
                    </li>
                </ul>
             </div>*/}
         </div>
        )
    }
});

module.exports = ActionBarApp;
