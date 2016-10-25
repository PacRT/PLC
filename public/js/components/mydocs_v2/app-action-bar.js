/**
 * Created by hmistry on 5/22/16.
 */
var React = require('react');
var Toolbar = require('material-ui/Toolbar').Toolbar;
var ToolbarGroup = require('material-ui/Toolbar').ToolbarGroup;
var Tooltip = require("react-bootstrap/lib/Tooltip");
var Popover = require("react-bootstrap/lib/Popover");
var OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");

var MyDocsStore = require('../../stores/app-mydocs-store');
var CreateForwardPkgActions = require('../../actions/app-create-forward-package-actions');
var ForwardPkgModal = require('../create-forward-package/forward-package-modal');

var CreateFwdPkgTT = <Tooltip id="tooltip2"><strong>Forward Packages</strong></Tooltip>;
var UploadTT =  <Tooltip id="tooltip3"><strong>Upload Docs</strong></Tooltip>;
var ReportsTT =  <Tooltip id="tooltip4"><strong>Reports</strong></Tooltip>;
var MessageTT =  <Tooltip id="tooltip5"><strong>Messages</strong></Tooltip>;
var UploadAction = require('../../actions/app-uploadzone-actions');

var ActionBarApp = React.createClass({
    getInitialState: function () {
        return {
            upload_drawer : false,
            package_drawer : false
        }
    },
    componentWillReceiveProps: function(newProps, oldProps){
        console.log(newProps, oldProps);
    },
    _createPkg : function(){
        var packages = [];
        var pkg_json = {
            "package_type" : "Package1",
            "packages_added" : [],
            "recepients" : []

        };
        var selectedDocs = this.props.mydocs.filter(function(docs){
            return docs.isSelected;
        })
        for(var index in selectedDocs){
            var doc_json = {
                "file_name": selectedDocs[index].docname,
                "docs_link": selectedDocs[index].doc_url.split("/api/v1")[1]
            }
            pkg_json["packages_added"].push(doc_json);
        }
        packages.push(pkg_json);
        CreateForwardPkgActions.openForwardPkgModal(packages,!this.state.package_drawer);
        if(!this.state.package_drawer)
            UploadAction.openCloseUploadDrawer(false);
        this.setState({
            "package_drawer" : !this.state.package_drawer,
            "upload_drawer"  : false
        })
    },
    _openUploadDrawer : function(){
        UploadAction.openCloseUploadDrawer(!this.state.upload_drawer);
        if(!this.state.upload_drawer)
            CreateForwardPkgActions.closeForwardPkgModal();
        this.setState({
            "package_drawer" : false,
            "upload_drawer" : !this.state.upload_drawer
        });

    },
    render :function(){
        return(
         <div >
             <div style={{paddingLeft:'1em',position:"fixed",width:"77.2%","bottom":0}} className="hidden-sm hidden-xs">
                <Toolbar style={{"background":"none"}}>
                    <ToolbarGroup>
                        <div style={{paddingLeft:'1em',position:"fixed",width:"66.2%","bottom":0,"textAlign": "center"}}>
                            <div className="dock">
                                <ul>
                                        <li>
                                            <OverlayTrigger placement="top" overlay={ReportsTT}>
                                                <a><img src="/assets/css/images/seo-report.svg" alt="Reports"/></a>
                                            </OverlayTrigger>
                                        </li>
                                        <li id="forwardPackages">
                                            <OverlayTrigger container={document.getElementsByClassName('actionBar')[0]} placement="top" overlay={CreateFwdPkgTT}>
                                                <a onClick={this._createPkg}>
                                                    <img  src="/assets/css/images/export.svg" alt="Forward Docs"></img>
                                                </a>
                                            </OverlayTrigger>
                                        </li>
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
                    </ToolbarGroup>
                </Toolbar>
                <ForwardPkgModal/>
            </div>
         </div>
        )
    }
});

module.exports = ActionBarApp;
