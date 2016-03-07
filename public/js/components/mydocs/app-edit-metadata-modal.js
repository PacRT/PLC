/**
 * Created by Hardik on 3/5/16.
 */
var React = require('react');
var MetaDataStore = require('../../stores/app-metadata-store');
var EditMetaDataActions = require('../../actions/app-metadata-actions');
var FlatButton  = require('material-ui/lib/flat-button');
var Dialog  = require('material-ui/lib/dialog');
var EditIcon = require('material-ui/lib/svg-icons/editor/mode-edit');
var AppEditMedataModal = React.createClass({
    getInitialState: function(){
        return  {
            "metadata_store" : MetaDataStore.getStore(),
            "is_modal_open" : MetaDataStore.is_modal_open()
        }
    },
    componentDidMount: function() {
        MetaDataStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        MetaDataStore.removeChangeListener(this._onChange);
    },
    _closeModal : function(){
        EditMetaDataActions.closeEditMetaDataModal();
    },
    _onChange : function(){
        var metadata_store = MetaDataStore.getStore();
        var is_modal_open =  MetaDataStore.is_modal_open();
        this.setState({
            "metadata_store" : metadata_store,
            "is_modal_open"  : is_modal_open
        });
    },
    render : function(){
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
        return (
            <Dialog
                style={{maxHeight:'100%','maxWidth':'100%'}}
                title="Edit"
                actions={actions}
                modal={true}
                open={this.state.is_modal_open}>
                this is edit modal
            </Dialog>
        )
    }

});

module .exports = AppEditMedataModal;