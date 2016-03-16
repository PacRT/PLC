/**
 * Created by Hardik on 3/10/16.
 */
var React = require('react');
var AutoComplete = require('material-ui/lib/auto-complete');
var ListItem = require('material-ui/lib/lists/list-item');
var Divider = require('material-ui/lib/divider');
var Checkbox = require('material-ui/lib/checkbox');
var List = require('material-ui/lib/lists/list');
var Tooltip = require('material-ui/lib/tooltip');
var Col = require('react-bootstrap/lib/Col');
var CreateForwardPkgActions = require('../../actions/app-create-forward-package-actions');
var CreateForwardPkgStore = require('../../stores/app-create-forward-package-store');
var RaisedButton = require('material-ui/lib/raised-button');
var CreateForwardPkgActions = require('../../actions/app-create-forward-package-actions');
var ForwardPkgModal = require('./forward-package-modal');

var CreatePackageApp = React.createClass({
    getInitialState: function () {
        var store = CreateForwardPkgStore.getCreateFwdPkgStore();
        console.log(store);
        return {
            docs_link: store.docs_link,
            files_name: store.files_name,
            cursor: store.cursor
        }
    },
    componentDidMount: function () {
        CreateForwardPkgStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        CreateForwardPkgStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        var store = CreateForwardPkgStore.getCreateFwdPkgStore();
        this.setState({
            docs_link: store.docs_link,
            files_name: store.files_name,
            cursor: store.cursor
        })
    },
    openForwardPkg: function () {
        CreateForwardPkgActions.openForwardPkgModal();
    },
    _getStyles: function () {
        return {
            inkBarStyle: {
                "backgroundColor": "black"
            },
            search_bar: {
                "width": "100%"
            },
            underlineStyle: {
                borderColor: "#222"
            },
            floatingLabelStyle: {
                "color": "#222",
                "fontWeight": "400"
            },
            innerDivStyle: {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            },
            listDivWrapper: {
                "paddingTop": "15px"
            },
            checkBoxStyle: {
                fill: "#222"
            },
            raisedButton: {
                marginLeft: "15px",
                marginTop: "15px"
            }
        }
    },
    _handleSelectedValue: function (value) {
        CreateForwardPkgActions.getDocsByType(this.state.cursor, 3);
    },
    handleChange: function (value) {
        this.setState({
            value: value
        });
    },
    _addMorePackage: function () {

    },
    render: function () {
        var styles = this._getStyles();
        var fruit = [
            "Tax Package",
            "Education Package"
        ];
        var _this = this;
        return (
            <div>
                <Col md={12}>
                    <Col md={8}>
                        <AutoComplete
                            onNewRequest={this._handleSelectedValue}
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            disableFocusRipple={true}
                            style={styles.search_bar}
                            floatingLabelText="Search Package Types"
                            filter={AutoComplete.fuzzyFilter}
                            dataSource={fruit}
                        />
                        {
                            this.state.docs_link.length == 0 ? "" : this.state.docs_link.map(function (url, index) {
                                return (
                                    <Col style={styles.listDivWrapper} key={index} md={6}>
                                        <List>
                                            <ListItem style={styles.innerDivStyle}
                                                      innerDivStyle={styles.innerDivStyle}
                                                      primaryText={<div>
                                                          <Tooltip show={true} label="tooltip label" horizontalPosition="left"
                                                            verticalPosition="top" touch={true} />
                                                           <div style={styles.innerDivStyle}>{_this.state.files_name[index]}</div></div>}
                                                      leftCheckbox={<Checkbox iconStyle={styles.checkBoxStyle}/>}/>
                                        </List>
                                    </Col>
                                )
                            })
                        }
                        <Col md={12}>
                            {
                                this.state.docs_link.length == 0 ? "" :
                                    <div className="pull-right">
                                        <RaisedButton style={styles.raisedButton} onTouchTap={this._addMorePackage}
                                                      label="Add More"/>
                                        <RaisedButton style={styles.raisedButton} onTouchTap={this.openForwardPkg}
                                                      label="Forward"/>
                                    </div>

                            }
                        </Col>
                    </Col>
                    <Col md={4}>
                        <List subheader="Packages Created So far!">
                            <ListItem
                                primaryText="Inbox"
                                initiallyOpen={true}
                                primaryTogglesNestedList={true}
                                nestedItems={[
                                        <ListItem
                                            key={1}
                                            primaryText="Starred"
                                        />,
                                        <ListItem
                                            key={2}
                                            primaryText="Sent Mail"
                                            disabled={true}
                                        />
                                    ]}
                            />
                        </List>
                    </Col>
                </Col>
                <ForwardPkgModal/>
            </div>
        )

    }
});

module.exports = CreatePackageApp