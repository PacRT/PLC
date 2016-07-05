/**
 * Created by hmistry on 6/9/16.
 */
var React = require('react');
var InboxPreviewStore =  require('../../stores/app-inbox-preview-store');
var Dialog  = require('material-ui/lib/dialog');
var FlatButton  = require('material-ui/lib/flat-button');
var InboxActions = require('../../actions/app-inbox-actions');
var InboxDocNotes = require('./app-inbox-doc-notes');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var AppInboxPreviewFile = React.createClass({
    getInitialState: function(){
        return {
            "store" : InboxPreviewStore.getStore()
        }
    },
    componentDidMount: function() {
        InboxPreviewStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        InboxPreviewStore.resetStore();
        InboxPreviewStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        var preview_store = InboxPreviewStore.getStore();
        this.setState({
            "store" : preview_store
        });
    },
    handleClose: function(){
        InboxActions.closePreview(false);
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
        if(this.state.store.doc_url.indexOf(".pdf") != -1){
            previewJSX = <iframe height="720px" width="700px" src={this.state.store.doc_url}  frameBorder="0" scrolling="yes">
                <p>It appears your web browser doesn't support iframes.</p>
            </iframe>

        }else{
            previewJSX = <img src={ this.state.store.doc_url } width='100%'/>
        }

        return (
            <div>
                    <Dialog
                        contentStyle={{ "maxHeight" :'100%','maxWidth':'none','width':'80%'}}
                        title={this.state.store.file_name}
                        actions={actions}
                        modal={true}
                        open={this.state.store.is_preview_open}>
                        <Row className="show-grid">
                            <Col xs={6} md={8}>
                                {previewJSX}
                            </Col>
                            <Col xs={6} md={4}>
                                <InboxDocNotes doc_url={this.state.store.doc_url}
                                               thread_id={this.state.store.thread_id}
                                               pkg_id={this.state.store.pkg_id}
                                />
                            </Col>
                        </Row>
                    </Dialog>

            </div>
        );
    }
});

module.exports = AppInboxPreviewFile;
