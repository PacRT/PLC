/**
 * Created by Hardik on 2/26/16.
 */
var React = require('react');
var Dialog  = require('material-ui').Dialog;
var FlatButton  = require('material-ui').FlatButton;

var DocPreview = React.createClass({
    handleClose: function(){
        this.props.closePreview({is_preview_open : false});
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
        if(this.props.doc_url.toLowerCase().indexOf(".pdf") != -1
            || this.props.doc_url.indexOf(".html") != -1
            || this.props.doc_url.indexOf(".htm") != -1
        ){
            previewJSX = <div className="embed-responsive embed-responsive-16by9"> <iframe width="700px" src={this.props.doc_url}  frameBorder="0" scrolling="yes">
                <p>It appears your web browser doesn't support iframes.</p>
            </iframe></div>

        }else{
            previewJSX = <img src={this.props.doc_url} width='100%'/>
        }
        
        return (
            <div>
                {this.props.hybridView ?
                    previewJSX :
                    <Dialog
                        style={{maxHeight:'100%','maxWidth':'100%'}}
                        title={this.props.title}
                        actions={actions}
                        modal={true}
                        open={this.props.is_preview_open}>
                        {previewJSX}
                    </Dialog>
                }
            </div>
        );
    }
});

module.exports = DocPreview;
