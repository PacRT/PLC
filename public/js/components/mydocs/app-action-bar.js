/**
 * Created by hmistry on 5/22/16.
 */
var React = require('react');
var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var MyDocsStore = require('../../stores/app-mydocs-store');
var CreateForwardPkgActions = require('../../actions/app-create-forward-package-actions');
var ForwardPkgModalStore = require('../../stores/app-forward-package-modal-store');
var ForwardPkgModal = require('../create-forward-package/forward-package-modal');
var Tooltip = require("react-bootstrap/lib/Tooltip");
var OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");
var CreateFwdPkgTT =  <Tooltip id="tooltip"><strong>Create & Forward Package</strong></Tooltip>;
var UploadTT =  <Tooltip id="tooltip"><strong>Upload Docs</strong></Tooltip>;
var ReportsTT =  <Tooltip id="tooltip"><strong>Reports</strong></Tooltip>;
var MessageTT =  <Tooltip id="tooltip"><strong>Messages</strong></Tooltip>;
var UploadAction = require('../../actions/app-uploadzone-actions');
var ActionBarApp = React.createClass({
    getInitialState: function () {
        return {
            store: MyDocsStore.getDocStore(),
            is_drawer_open : false

        }
    },
    componentDidMount: function () {
        MyDocsStore.addChangeListener(this._onChange);
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
            var file_index = this.state.store.selected_docs[index];
            var doc_json = {
                "file_name" : this.state.store.files_name[file_index],
                "docs_link" : "/docs" + this.state.store.docs_link[file_index].split("/docs")[1]
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
    _openUploadDrawer : function(){
        UploadAction.openCloseUploadDrawer(true);
    },
    render :function(){
        return(
         <div>
             <div style={{paddingLeft:'1em',position:"fixed",width:"77.2%","bottom":0}} className="hidden-sm hidden-xs">
                <Toolbar style={{"background":"none"}}>
                    <ToolbarGroup>
                        <div style={{paddingLeft:'1em',position:"fixed",width:"66.2%","bottom":0,"textAlign": "center"}}>
                            <div className="dock">
                                <ul>
                                    <OverlayTrigger placement="top" overlay={ReportsTT}>
                                        <li>
                                            <a><img src="/assets/css/images/seo-report.svg" alt="Reports"/></a>
                                        </li>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={CreateFwdPkgTT}>
                                        <li>
                                            <a onClick={this._createPkg}>
                                                <img  src="/assets/css/images/export.svg" alt="Forward Docs"></img>
                                            </a>
                                        </li>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={UploadTT}>
                                        <li>
                                            <a  onClick={this._openUploadDrawer}>
                                                <img  src="/assets/css/images/upload.svg" alt="Upload Docs"></img>
                                            </a>
                                        </li>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={MessageTT}>
                                        <li>
                                                <a>
                                                    <img src="/assets/css/images/envelope.svg" alt="Messages"/>
                                                </a>
                                        </li>
                                    </OverlayTrigger>
                                </ul>
                            </div>
                        </div>
                        {/* <FlatButton label="Reports"  />
                        <FlatButton label="Forward"  />
                        <FlatButton label="Forward Docs" onTouchTap={this._createPkg}  />
                        <FlatButton label="FedEx"  />
                        <FlatButton label="UPS"  />
                        <FlatButton label="Messages"  />*/}
                    </ToolbarGroup>
                </Toolbar>
                <ForwardPkgModal/>
            </div>
         </div>
        )
    }
});

module.exports = ActionBarApp;
