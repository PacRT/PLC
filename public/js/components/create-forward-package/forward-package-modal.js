/**
 * Created by Hardik on 3/13/16.
 */
var React = require('react');
var CreateForwardPkgStore = require('../../stores/app-forward-package-modal-store');
var createForwardPkgActions = require('../../actions/app-create-forward-package-actions');
var SendContent = require('material-ui/svg-icons/content/send').default;
var Drawer = require('material-ui/Drawer').default;
var AppBar = require('material-ui/AppBar').default;
var TextField = require('material-ui/TextField').default;
var List = require('material-ui/List').default;
var ListItem = require('material-ui/List').ListItem;
var Divider = require('material-ui/Divider').default;
var NavigationClose = require('material-ui/svg-icons/navigation/close').default;
var IconButton = require('material-ui/IconButton').default;
var ReactTags = require('react-tag-input').WithContext;
var Subheader = require('material-ui/Subheader').default;
var ForwardPackageModal = React.createClass({
    getInitialState: function () {
        return {
            "emails": [],
            "store": CreateForwardPkgStore.getStore(),
            "is_modal_open": CreateForwardPkgStore.isModalOpen(),
            "package_name": ""
        }
    },
    componentDidMount: function () {
        CreateForwardPkgStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        CreateForwardPkgStore.removeChangeListener(this._onChange);
    },
    _closeModal: function () {
        createForwardPkgActions.closeForwardPkgModal();
    },
    _onChange: function () {
        var store = CreateForwardPkgStore.getStore();

        var is_modal_open = CreateForwardPkgStore.isModalOpen();
        this.setState({
            store: store,
            is_modal_open: is_modal_open
        })
    },
    _handleTextFieldChange: function (event) {
        this.setState({
            "package_name": event.target.value
        })
    },
    _addEmails: function (email) {
        var emails = this.state.emails;
        emails.push({
            id: new Date().getTime(),
            text: email
        });
        this.setState({emails: emails});
    },
    _handleDeleteEmails: function (i) {
        var emails = this.state.emails;
        emails.splice(i, 1);
        this.setState({emails: emails});
    },
    _createAndForwardPkg: function () {
        var packages = this.state.store.packages;
        var _this = this;
        var recipients = [];
        this.state.emails.forEach(function (item) {
            recipients.push(item.text);
        });
        packages.map(function (package_1) {
            package_1["recepients"] = recipients;
            package_1["package_type"] = _this.state.package_name;
        });
        createForwardPkgActions.createPackages(packages);
    },
    getStyles: function () {
        var drawerStyle = {
            "height": "65%",
            "width": "400px",
            "top": "garbage",
            "right": "2em",
            "bottom": "0",
            "transition": "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"
        }
        return {
            "drawerStyle": drawerStyle,
            "appBar": {
                "backgroundColor": "#222"
            },
            "send": {
                "fill": "#ffffff",
                "marginTop": "1.1em"
            }

        };
    },
    render: function () {
        var placeHolder = "Add Email Ids/Paperless Ids";
        var NoDocsMessage = <div>
            <ListItem primaryText="No Docs.">
            </ListItem>
        </div>
        var styles = this.getStyles();
        var emails = this.state.emails;
        return (

            <Drawer id="popup" width={500} containerStyle={styles["drawerStyle"]} openSecondary={true}
                    open={this.state.is_modal_open}>
                <AppBar id="appBar" style={styles["appBar"]} title="Forward Docs"
                        iconElementRight={<SendContent style={styles["send"]}
                                                       onTouchTap={this._createAndForwardPkg}/>}
                        iconElementLeft={<IconButton onTouchTap={this._closeModal}><NavigationClose  /></IconButton>}
                />
                <div className="col-md-12">
                    <List>
                        <Subheader>Added Docs</Subheader>
                        {
                            this.state.store.packages[0]["packages_added"].length ? this.state.store.packages[0].packages_added.map(function (pkg) {
                                return (
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
                        defaultValue={this.state.package_name}
                        floatingLabelText="Package Name To Save"
                    />
                    <ReactTags tags={emails}
                               handleAddition={this._addEmails}
                               handleDelete={this._handleDeleteEmails}
                               placeholder={placeHolder}
                    />
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