var React = require('react');
var Dialog = require('material-ui').Dialog;
var FlatButton = require('material-ui').FlatButton;
var LinearProgress = require('material-ui').LinearProgress;

var SelectFileCategory = React.createClass({
    getInitialState : function(){
        return {
            modal_open : false
        }
    },
    _closeModal : function(){
        this.setState({
            modal_open : false
        });
        this.props.cancelHandle();
    },
    componentWillReceiveProps : function(props){
        this.setState({
            modal_open : props.modal_open
        });
    },
    render : function(){
        var actions = [
            <FlatButton onTouchTap={this._closeModal} label="Close" />,
            <FlatButton onTouchTap={this.props.uploadHandle} label="Upload Files" secondary={true} />
        ]
        var fileList = this.props.getFileList();
        return (
            <Dialog
                style={{maxHeight:'100%','maxWidth':'100%'}}
                title="Select category for following Files"
                actions={actions}
                modal={true}
                open={this.state.modal_open}>
                { fileList }
                {this.props.progress > 0 ? (
                    <LinearProgress mode="determinate" value={this.props.progress}/>
                ) :  <LinearProgress mode="determinate" value={0}/>}
            </Dialog>
        )
    }
});

module.exports = SelectFileCategory;