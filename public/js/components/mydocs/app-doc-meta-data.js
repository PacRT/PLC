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


var AppDocMetaData = React.createClass({
    getInitialState: function () {
        return {
            store: MetaDataStore.getStore(),
            category: '',
            file_name: '',
            doc_url: ''
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
        var values = this.state.store[this.props.doc_url]["_values"].slice(2);
        if(this.state.category != ''){
            meta['category'] = this.state.category;
            meta['doc_url'] = this.state.doc_url;
            meta['file_name'] = values[1];
            change = true;
        };
        if(this.state.file_name != ''){
            meta['file_name'] = this.state.file_name;
            meta['doc_url'] = this.state.doc_url;
            meta['category'] = values[0];
            change = true;
        };
        console.log(meta);
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
                "lineHeight": "30px",
             },
            circularProgressStyle : {
                display: "block",
                margin: "auto",
                "paddingTop": "14%"
            }
        }
    },
    _handleTextFieldChange: function(key, doc_url, event){
        if(key=='category'){
            this.setState({
                category: event.target.value
            });
        }
        else{
            this.setState({
                file_name: event.target.value
            })
        };
        this.setState({
            doc_url: doc_url
        });
    },
    render: function () {
        var _this = this;
        var styles = this._getStyles();
        var MetaDataJSX = "";
        if (_.isEmpty(this.state.store[this.props.doc_url])) {
            MetaDataJSX = <CircularProgress style={styles.circularProgressStyle}/>
        } else if (!_.isUndefined(this.state.store[this.props.doc_url]) && this.state.store[this.props.doc_url]["_keys"].length) {
            var keys = this.state.store[this.props.doc_url]["_keys"].slice(2);
            keys[keys.indexOf('file_name')] = 'name';
            var values = this.state.store[this.props.doc_url]["_values"].slice(2);
            var doc_url = this.props.doc_url;
            var last_index = values.length - 1;

            MetaDataJSX = keys.map(function (key, index) {
                if(_this.props.view != "INBOX"){
                    return (
                        <div style={styles.meta_container} key={index}>
                            <TextField
                                disabled={_this.props.view == "INBOX"}
                                defaultValue={ values[index] }
                                floatingLabelText={ key }
                                onChange={ _this._handleTextFieldChange.bind(null, key, doc_url) }
                                style={{marginTop:"-4px"}}
                            />
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
                    <div className="pull-right">
                        <FlatButton
                            disabled={this.props.view == "INBOX"}
                            label="Ok"
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
