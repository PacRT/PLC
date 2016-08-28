/**
 * Created by Hardik on 3/4/16.
 */
var React = require('react');
var CircularProgress = require('material-ui/lib/circular-progress');
var MetaDataActions = require('../../actions/app-metadata-actions');
var MetaDataStore = require('../../stores/app-metadata-store');
var TextField = require('material-ui/lib/text-field');
var FlatButton  = require('material-ui/lib/flat-button');
var EditMetaDataActions = require('../../actions/app-metadata-actions');
var TableRowColumn= require('material-ui/lib/table/table-row-column');
var TableRow= require('material-ui/lib/table/table-row');
var Edit = require('material-ui/lib/svg-icons/editor/mode-edit');
var _ = require('lodash');
var PopularCategories = require('../uploadzone/app-popular-categories');
var AppDocMetaData = React.createClass({
    getInitialState: function () {
        return {
            store: MetaDataStore.getStore(),
            category: '',
            file_name: '',
            doc_url: '',
            hover : false,
            show_button : false

        }
    },
    componentDidMount: function () {
        MetaDataStore.addChangeListener(this._onChange);
        MetaDataActions.getDocMetaData(this.props.doc_url);
    },
    componentWillUnmount: function () {
        MetaDataStore.resetStore();
        MetaDataStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        this.setState({
            store: MetaDataStore.getStore()
        });
    },
    _editModal : function(){
        var meta = {};
        var change = false;
        var values = this.state.store[this.props.doc_url]["_values"];
        if(this.state.category != ''){
            meta['category'] = this.state.category;
            meta['doc_url'] = this.props.doc_url;
            meta['file_name'] = values[1];
            change = true;
        };
        if(this.state.file_name != ''){
            meta['file_name'] = this.state.file_name;
            meta['doc_url'] = this.props.doc_url;
            meta['category'] = values[0];
            change = true;
        };
        if(change){
            EditMetaDataActions.updateDocMetaData(meta);
        };
    },
    _getStyles: function () {
        return {
            val_div_style: {
                flex: "1 1 auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"

            },
            key_div_style: {
                flex: "0 0 100px",
                color: "#000",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            },
            meta_container : {
                "display": "flex",
                "lineHeight": "30px"
             },
            circularProgressStyle : {
                display: "block",
                margin: "auto",
                "paddingTop": "14%"
            },
            floatingLabelStyle: {
                "zIndex" : 0
            },
            floatingLabelFocusStyle: {
                "zIndex" : 0
            },
            save:{"display":"none"},
            editIcon : {"height":"20px","width":"20px","position" : "relative","top":"35px","fill":"rgba(0, 0, 0, 0.298039)","display":"none"}
        }
    },
    _showEditIcon : function(showIcon){
        this.setState({
            "hover" : showIcon
        })
    },
    _handleSelectBoxChange : function(doc_index,event, index, value){
        var store = this.state.store;
        store[this.props.doc_url]["_values"][doc_index] = value;
        this.setState({
            store :  store,
            doc_url: this.props.doc_url,
            show_button :  true,
            category : value
        })
    },
    _handleTextFieldChange: function(key, doc_url, event){
        if(key=='Category'){
            this.setState({
                category: event.target.value
            });
        }else{
            this.setState({
                file_name: event.target.value
            })
        };
        this.setState({
            doc_url: doc_url,
            show_button :  true
        });
    },
    render: function () {
        var _this = this;
        var styles = this._getStyles();
        var MetaDataJSX = "";
        if(this.state.hover){
            styles['editIcon']['display'] = "block";
        }
        if(this.state.show_button){
            styles['save']['display'] = "block";
        }

        if (_.isEmpty(this.state.store[this.props.doc_url])) {
            MetaDataJSX = <CircularProgress style={styles.circularProgressStyle}/>
        } else if (!_.isUndefined(this.state.store[this.props.doc_url]) && this.state.store[this.props.doc_url]["_keys"].length) {
            var keys = this.state.store[this.props.doc_url]["_keys"]
            keys[keys.indexOf('file_name')] = 'name';
            var values = this.state.store[this.props.doc_url]["_values"]
            var doc_url = this.props.doc_url;
            var last_index = values.length - 1;

            MetaDataJSX = keys.map(function (key, index) {
                if(_this.props.view != "INBOX"){
                    return (
                        <div style={styles.meta_container} key={index}>
                            { key !== "Category" ?  <TextField
                                disabled={_this.props.view == "INBOX"}
                                defaultValue={ values[index] }
                                floatingLabelText={ key }
                                onChange={ _this._handleTextFieldChange.bind(null, key, doc_url) }
                                style={{marginTop:"-4px", "fontSize" : "15px"}}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                onFocus={_this._showEditIcon.bind(null,true)}
                                onBlur={_this._showEditIcon.bind(null,false)}

                                /> : <PopularCategories drop_menu_style={false} category={values[index]} handle={_this._handleSelectBoxChange.bind(null,index)}/>
                            }

                            <Edit style={styles['editIcon']}/>

                        </div>
                    )
                }else{
                    var style= "";
                    if(last_index === index){
                        style = {
                            "paddingLeft" : "288px"
                        }
                    }
                    return(
                        <TableRowColumn style={style}>
                            { values[index] }
                        </TableRowColumn>
                    )
                }

            });
        }
        return (
            <div>
                {MetaDataJSX}
                {this.props.view != "INBOX" ?
                    <div className="pull-right" style={styles['save']}>
                        <FlatButton
                            disabled={this.props.view == "INBOX"}
                            label="Save Changes"
                            secondary={true}
                            disabled={false}
                            onTouchTap={this._editModal}
                        />
                    </div>:""}
            </div>
        )
    }
});

module.exports = AppDocMetaData;
