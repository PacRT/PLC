/**
 * Created by Hardik on 2/26/16.
 */
var React = require('react');
var DocPreviewStore =  require('../../stores/app-doc-preview-store');
var Dialog  = require('material-ui/lib/dialog');
var FlatButton  = require('material-ui/lib/flat-button');

var DocPreview = React.createClass({
    getInitialState: function(){
        return {
            "preview_store" : DocPreviewStore.getStore(),
            "is_preview_open" : DocPreviewStore.isPreviewOpen()
        }
    },
    componentDidMount: function() {
        DocPreviewStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        DocPreviewStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        var preview_store = DocPreviewStore.getStore();
        this.setState({
            "preview_store" : preview_store,
            "is_preview_open" : DocPreviewStore.isPreviewOpen()
        });
    },
    handleClose: function(){
        this.setState({is_preview_open : false});
    },
    render: function () {
        var  actions = [
            <FlatButton
                label="Ok"
                secondary={true}
                disabled={false}
                onTouchTap={this.handleClose}
            />
        ];
        var previewJSX = "";
        if(this.state.preview_store.document_url.indexOf(".pdf") != -1){
            previewJSX = <iframe height="720px" width="700px" src={this.state.preview_store.document_url}  frameBorder="0" scrolling="yes">
                <p>It appears your web browser doesn't support iframes.</p>
            </iframe>

        }else{
            previewJSX = <img src={ this.state.preview_store.document_url } width='100%'/>
        }
        return (
            <div>
                <Dialog
                    style={{maxHeight:'100%','maxWidth':'100%'}}
                    title={this.state.preview_store.document_title}
                    actions={actions}

                    modal={true}
                    open={this.state.is_preview_open}>
                    {previewJSX}
                </Dialog>
            </div>
        );
    }
});

module.exports = DocPreview;
