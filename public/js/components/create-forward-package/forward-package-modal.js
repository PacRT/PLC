/**
 * Created by Hardik on 3/13/16.
 */
var React = require('react');
var CreateForwardPkgStore = require('../../stores/app-forward-package-modal-store');
var createForwardPkgActions = require('../../actions/app-create-forward-package-actions');
var FlatButton = require('material-ui/lib/flat-button');
var Dialog = require('material-ui/lib/dialog');
var TextField = require('material-ui/lib/text-field');
var SendContent = require('material-ui/lib/svg-icons/content/send');
var Tags = require('materialize-tags');
var Drawer = require('material-ui/lib/left-nav');
var AppBar = require('material-ui/lib/app-bar');
var TextField = require('material-ui/lib/text-field');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var Divider = require('material-ui/lib/divider');
var Paper = require('material-ui/lib/paper');
var NavigationClose = require('material-ui/lib/svg-icons/navigation/close');
var IconButton = require('material-ui/lib/icon-button');
var ForwardPackageModal = React.createClass({
    getInitialState: function(){
        return  {
            "store" : CreateForwardPkgStore.getStore(),
            "is_modal_open"  : CreateForwardPkgStore.isModalOpen(),
            "package_name"   : ""
        }
    },
    componentDidMount: function() {
        CreateForwardPkgStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        CreateForwardPkgStore.removeChangeListener(this._onChange);
    },
    _closeModal : function(){
        createForwardPkgActions.closeForwardPkgModal();
    },
    _onChange : function(){
      var store = CreateForwardPkgStore.getStore();

        var is_modal_open = CreateForwardPkgStore.isModalOpen();
        this.setState({
            store :  store,
            is_modal_open : is_modal_open
        })
    },
    _handleTextFieldChange : function (event) {
        this.setState({
            "package_name" : event.target.value
        })
    },
    _createAndForwardPkg : function(){
        var packages = this.state.store.packages;
        var _this = this;
        packages.map(function(package){
            package["recepients"] = $("#recipients").materialtags('items');
            package["package_type"] = _this.state.package_name;
        });
        createForwardPkgActions.createPackages(packages);
    },
    getStyles:function(){
      var drawerStyle = {
          "height" : "65%",
          "width"  : "400px",
          "top"    : "garbage",
          "right"  : "2em",
          "bottom" : "0",
          "transition": "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"
      }
        return {
            "drawerStyle" : drawerStyle,
            "appBar" : {
                "backgroundColor" : "#222"
            },
            "send" : {
                "fill" : "#ffffff",
                "marginTop" : "1.1em"
            }

        };
    },
    render : function(){
        console.log("rendering");
        setTimeout(function(){
            $('#recipients').materialtags({});
        },500)
        var  actions = [
            <FlatButton
                label="Close"
                onTouchTap={this._closeModal}
            />,
            <FlatButton
                secondary={true}
                disabled={false}
                icon={<SendContent />}
                onTouchTap={this._createAndForwardPkg}
            />
        ];
        var DialogBody = <TextField
            floatingLabelText={"Recipients' Email"}
            ref={"recipients"}
            defaultValue={""}
        />;
        var NoDocsMessage =  <div>
            <ListItem primaryText="No Docs.">
            </ListItem>
        </div>
        var styles = this.getStyles();
        return(

            <Drawer id="popup" width={500} style={styles["drawerStyle"]} openRight={true} open={this.state.is_modal_open}>
                <AppBar id="appBar" style={styles["appBar"]} title="Forward Docs"
                        iconElementRight={<SendContent style={styles["send"]}
                        onTouchTap={this._createAndForwardPkg} />}
                        iconElementLeft={<IconButton onTouchTap={this._closeModal}><NavigationClose  /></IconButton>}
                />
                <div className="col-md-12">
                        <List subheader="Added Docs">
                            {
                                this.state.store.packages[0]["packages_added"].length  ? this.state.store.packages[0].packages_added.map(function(pkg){
                                    return(
                                        <div>
                                            <ListItem primaryText={pkg.file_name}>
                                            </ListItem>
                                            <Divider />
                                        </div>
                                    )
                                }) : NoDocsMessage

                            }

                        </List>
                    <TextField
                        fullWidth={true}
                        onChange={ this._handleTextFieldChange }
                        defaultvalue={this.state.package_name}
                        floatingLabelText="Package Name To Save"
                    />
                    <div className="input-field">
                        <label for="tags" className="hola">Email/Paperless Ids</label>
                        <input type="text" id="recipients" value="" />
                    </div>
                </div>

                {/*<Dialog
                 style={{maxHeight:'100%','maxWidth':'100%'}}
                 title="Forward it to Email/Paperless Account"
                 actions={actions}
                 modal={true}
                 open={this.state.is_modal_open}>
                 <div class="input-field">
                 <label for="tags" class="hola">Email Ids</label>
                 <input type="text" id="recipients" value="" data-role="materialtags" />
                 </div>


                 </Dialog>*/}
            </Drawer>

        )

    }
});

module.exports = ForwardPackageModal;