/**
 * Created by Hardik on 2/9/16.
 */
/** @jsx React.DOM */
var React = require('react');
var ModalStore =  require('../../stores/app-actionremainder-store');
var Dialog  = require('material-ui/lib/dialog');
var FlatButton  = require('material-ui/lib/flat-button');

var ActionRemainderModal = React.createClass({
    getInitialState: function(){
        return {
            "modal_store" : ModalStore.getStore()
        }
    },
    componentDidMount: function() {
        ModalStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        ModalStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        var modal_store = ModalStore.getStore();
        this.setState({
            modal_store : modal_store
        });
    },
    handleClose: function(){
        var modal_store = {
            is_modal_open : false
        }
        this.setState({modal_store : modal_store});
    },
    render: function () {
        var  actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={false}
                onTouchTap={this.handleClose}
            />,
        ];
        return (
            <div>
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={true}
                    open={this.state.modal_store.is_modal_open}
                >
                    Please take necessary action to resolve it.
                </Dialog>
            </div>
        );
    }
});

module.exports = ActionRemainderModal;
