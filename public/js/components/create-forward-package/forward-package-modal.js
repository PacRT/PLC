/**
 * Created by Hardik on 3/13/16.
 */
var React = require('react');
var CreateForwardPkgStore = require('../../stores/app-forward-package-modal-store');
var createForwardPkgActions = require('../../actions/app-create-forward-package-actions');
var FlatButton = require('material-ui/lib/flat-button');
var Dialog = require('material-ui/lib/dialog');
var TextField = require('material-ui/lib/text-field');

var ForwardPackageModal = React.createClass({
    getInitialState: function(){
        return  {
            "store" : CreateForwardPkgStore.getStore(),
            "is_modal_open"  : CreateForwardPkgStore.isModalOpen()
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
    _createAndForwardPkg : function(){
        var packages = this.state.store.packages;
        var recipients = this.refs.recipients.getValue().split(";");
        packages.map(function(package){
            package["recepients"] = recipients;
        });
        createForwardPkgActions.createPackages(packages);
    },
    render : function(){
        var  actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this._closeModal}
            />,
            <FlatButton
                label="Submit"
                secondary={true}
                disabled={false}
                onTouchTap={this._createAndForwardPkg}
            />
        ];
        var DialogBody = <TextField
            floatingLabelText={"Recipients' Email"}
            ref={"recipients"}
            defaultValue={""}
        />;
        return(
            <Dialog
                style={{maxHeight:'100%','maxWidth':'100%'}}
                title="Forward it to Email/Paperless Account"
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

module.exports = ForwardPackageModal;