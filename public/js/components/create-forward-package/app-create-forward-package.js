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
        return {
            docs_link: store.docs_link,
            files_name: store.files_name,
            cursor: store.cursor,
            packages_added: [],
            package_type: "",
            packages: []
        }
    },
    componentDidMount: function () {
        CreateForwardPkgStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        CreateForwardPkgStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        console.log('change');
        var store = CreateForwardPkgStore.getCreateFwdPkgStore();
        this.setState({
            docs_link: store.docs_link,
            files_name: store.files_name,
            cursor: store.cursor
        })
    },
    openForwardPkg: function () {
        CreateForwardPkgActions.openForwardPkgModal(this.state.packages);
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
        this.setState({
            package_type: value
        });
        CreateForwardPkgActions.getDocsByType(this.state.cursor, 3);
    },
    handleChange: function (value) {
        console.log('change-1');
        this.setState({
            value: value
        });
    },
    _addMorePackage: function () {
        packages = this.state.packages;
        packages.push({
            "package_type" : this.state.package_type,
            "packages_added" : this.state.packages_added
        });
        this.setState({
            packages: packages,
            packages_added: [],
            package_type: ""
        });
    },
    onCheckBox: function(index, event) {
        var packages_added = this.state.packages_added;
        if(event.target.checked){
            var doc_obj = {
                "file_name" : this.state.files_name[index],
                "doc_url"   : this.state.docs_link[index]
            }
            packages_added.push(doc_obj);
        }
        else{
            var file_name = this.state.files_name[index];
            packages_added = _.reject(packages_added,function(package){
                return package["file_name"] == file_name;
            });
        };
        this.setState({
            packages_added: packages_added,
        });
    },
    render: function () {
        var styles = this._getStyles();
        var fruit = [
            "Tax Package",
            "Education Package"
        ];
        var _this = this;
        var ListedItems = [];
        _.each(this.state.packages, function(package, index){
              var package_type = package.package_type;
              var packages_added = package.packages_added;
              var nestedItems = [];
              //_.each(packages_added, function(package_added, j){})
              _.each(packages_added, function(package_added, j){
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
        var added_doc_url = _.map(_this.state.packages_added, 'doc_url');
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
                                var checked = false;
                                if(added_doc_url.indexOf(url) != -1)
                                    checked = true;
                                return (
                                    <Col style={styles.listDivWrapper} key={index} md={6}>
                                        <List>
                                            <ListItem style={styles.innerDivStyle}
                                                      innerDivStyle={styles.innerDivStyle}
                                                      primaryText={<div>
                                                          <Tooltip show={true} label="tooltip label" horizontalPosition="left"
                                                            verticalPosition="top" touch={true} />
                                                           <div style={styles.innerDivStyle}>{_this.state.files_name[index]}</div></div>}
                                                      leftCheckbox={<Checkbox iconStyle={styles.checkBoxStyle} checked={checked}
                                                        onCheck={_this.onCheckBox.bind(null, index)}/>}/>
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
                            {
                              _.each(ListedItems, function(item, index){
                                  return({
                                      item
                                  })
                              })
                            }
                        </List>
                    </Col>
                </Col>
                <ForwardPkgModal/>
            </div>
        )

    }
});

module.exports = CreatePackageApp
