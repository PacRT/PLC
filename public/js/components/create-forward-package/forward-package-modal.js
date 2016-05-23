/**
 * Created by Hardik on 3/13/16.
 */
var React = require('react');
var CreateForwardPkgStore = require('../../stores/app-forward-package-modal-store');
var createForwardPkgActions = require('../../actions/app-create-forward-package-actions');
var FlatButton = require('material-ui/lib/flat-button');
var Dialog = require('material-ui/lib/dialog');
var TextField = require('material-ui/lib/text-field');
var SendContent = require('material-ui/lib/svg-icons/content/send');
var Tags = require('materialize-tags');

console.log(Tags);
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
        packages.map(function(package){
            package["recepients"] = $("#recipients").materialtags('items');
        });
        createForwardPkgActions.createPackages(packages);
    },
    render : function(){
        console.log("rendering");
        setTimeout(function(){
            $('#recipients').materialtags({});
        },500)
        var  actions = [
            <FlatButton
                label="Close"
                onTouchTap={this._closeModal}
            />,
            <FlatButton
                secondary={true}
                disabled={false}
                icon={<SendContent />}
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
                <div class="input-field">
                    <label for="tags" class="hola">Email Ids</label>
                    <input type="text" id="recipients" value="" data-role="materialtags" />
                </div>


            </Dialog>

        )

    }
});

module.exports = ForwardPackageModal;