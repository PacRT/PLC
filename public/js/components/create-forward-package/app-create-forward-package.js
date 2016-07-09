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
var CreateForwardPkgStore = require('../../stores/app-create-forward-package-store');
var RaisedButton = require('material-ui/lib/raised-button');
var CreateForwardPkgActions = require('../../actions/app-create-forward-package-actions');
var ForwardPkgModal = require('./forward-package-modal');
var SelectGridContainer = require("./app-select-grid-container");
var DocTile = require("../mydocs/app-doc-tile");
var categories = require('../../constants/app-upload-categories-constants');

var CreatePackageApp = React.createClass({
    getInitialState: function () {
        var store = CreateForwardPkgStore.getCreateFwdPkgStore();
        return {
            docs_link: store.docs_link,
            files_name: store.files_name,
            transformed_links : store.transformed_links,
            cursor: store.cursor,
            packages_added: [],
            package_type: "",
            packages: [],
            selected_tile : store.selected_tiles
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
            transformed_links : store.transformed_links,
            cursor: store.cursor,
            selected_tile : store.selected_tiles
        })
    },
    openForwardPkg: function () {
        var packages = this.state.packages;
        packages.push({
            "package_type": this.state.package_type,
            "packages_added": this.state.packages_added
        });
        CreateForwardPkgActions.openForwardPkgModal(packages);
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
            },
            packageList : {
                right : "40px",
                "position" : "fixed"
            }
        }
    },
    _handleSelectedValue: function (value) {
        this.setState({
            package_type: value
        });
        CreateForwardPkgActions.getDocsByType(this.state.cursor, value);
    },
    handleChange: function (value) {
        this.setState({
            value: value
        });
    },
    _addMorePackage: function () {
        var packages = this.state.packages;
        var packages_added = [];
        var _this = this;
        this.state.selected_tile.map(function(index){
            var doc_obj = {
                "file_name": _this.state.files_name[index],
                "doc_url": _this.state.docs_link[index]
            };
            packages_added.push(doc_obj);
        });
        packages.push({
            "package_type": this.state.package_type,
            "packages_added": packages_added
        });
        CreateForwardPkgStore.resetDocStore();
        var store = CreateForwardPkgStore.getCreateFwdPkgStore();
        this.setState({
            packages: packages,
            packages_added: [],
            package_type: "",
            docs_link: store.docs_link,
            files_name: store.files_name,
            cursor: store.cursor
        });
    },
    onCheckBox: function (index, event) {
        var packages_added = this.state.packages_added;
        if (event.target.checked) {
            var doc_obj = {
                "file_name": this.state.files_name[index],
                "doc_url": this.state.docs_link[index]
            };
            packages_added.push(doc_obj);
        }
        else {
            var file_name = this.state.files_name[index];
            packages_added = _.reject(packages_added, function (package_added) {
                return package_added["file_name"] == file_name;
            });
        };
        this.setState({
            packages_added: packages_added
        });
    },
    render: function () {
        var styles = this._getStyles();
        var packages = categories;
        var _this = this;
        var ListedItems = [];
        _.each(this.state.packages, function (package_1, index) {
            var package_type = package_1.package_type;
            var packages_added = package_1.packages_added;
            var nestedItems = [];
            //_.each(packages_added, function(package_added, j){})
            _.each(packages_added, function (package_added, j) {
                nestedItems.push(
                    <ListItem
                        key={j}
                        primaryText={package_added.file_name}
                    />
                )
            });
            var listed_item = <ListItem
                primaryText={package_type}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={nestedItems}
            />;
            ListedItems.push(listed_item);
        });
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
                            dataSource={packages}
                            searchText={this.state.package_type}
                        />

                        {
                            this.state.docs_link.length == 0 ? "" :<SelectGridContainer>
                                {
                                    this.state.transformed_links.map(function (url, index) {
                                        return(
                                            <DocTile
                                                key={index}
                                                tile_index={index}
                                                heading={_this.state.files_name[index]}
                                                img={url}
                                                isPreviewMode={true}
                                            />
                                        )
                                    })
                                }

                            </SelectGridContainer>
                        }
                    </Col>
                    <Col md={4} style={styles.packageList}>
                        <List subheader="Packages Created So far!">
                            {
                                _.each(ListedItems, function (item, index) {
                                    return ({
                                        item
                                    })
                                })
                            }
                        </List>

                                <div className="pull-right">
                                    <RaisedButton style={styles.raisedButton} onTouchTap={this._addMorePackage}
                                                  label="Add More" disabled={this.state.docs_link.length == 0}/>
                                    <RaisedButton style={styles.raisedButton} onTouchTap={this.openForwardPkg}
                                                  label="Forward" disable={ListedItems.length == 0}/>
                                </div>
                    </Col>
                </Col>
                <ForwardPkgModal/>
            </div>
        )

    }
});

module.exports = CreatePackageApp
