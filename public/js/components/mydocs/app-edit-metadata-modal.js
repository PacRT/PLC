/**
 * Created by Hardik on 3/5/16.
 */
var React = require('react');
var EditMetaDataStore= require('../../stores/app-edit-metadata-store');
var EditMetaDataActions = require('../../actions/app-metadata-actions');
var FlatButton  = require('material-ui/lib/flat-button');
var Dialog  = require('material-ui/lib/dialog');
var EditIcon = require('material-ui/lib/svg-icons/editor/mode-edit');
var CircularProgress = require('material-ui/lib/circular-progress');

var AppEditMedataModal = React.createClass({
    getInitialState: function(){
        return  {
            "store" : EditMetaDataStore.getStore(),
            "is_modal_open"  : EditMetaDataStore.is_modal_open()
        }
    },
    componentDidMount: function() {
        EditMetaDataStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        EditMetaDataStore.removeChangeListener(this._onChange);
    },
    _closeModal : function(){
        EditMetaDataActions.closeEditMetaDataModal();
    },
    _onChange : function(){
        var metadata_store = EditMetaDataStore.getStore();
        var is_modal_open =  EditMetaDataStore.is_modal_open();
        this.setState({
            "store" : metadata_store,
            "is_modal_open"  : is_modal_open
        });
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
            }
        }
    },
    render : function(){

        var _this = this;
        var styles = this._getStyles();
        var  actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this._closeModal}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={false}
                onTouchTap={this._closeModal}
            />
        ];
        var DialogBody = "";
        if(_.isEmpty(this.state.store)){
            DialogBody = <CircularProgress style={styles.circularProgressStyle}/>
        }else{
            DialogBody =  this.state.store["_keys"].map(function (key, index) {
                return (
                    <div style={styles.meta_container} key={index}>
                        <div style={styles.key_div_style}>
                            { key }
                        </div>
                        <div style={styles.val_div_style}>
                            { _this.state.store["_values"][index] }
                        </div>
                    </div>
                )

            })
        }
        return (
            <Dialog
                style={{maxHeight:'100%','maxWidth':'100%'}}
                title="Edit"
                actions={actions}
                modal={true}
                open={this.state.is_modal_open}>
                {
                    DialogBody
                }
            </Dialog>
        )
    }

});

module .exports = AppEditMedataModal;