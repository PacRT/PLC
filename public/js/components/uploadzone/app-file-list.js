/**
 * Created by Hardik on 2/7/16.
 */
/**
 * Created by Hardik on 12/20/15.
 */
var React = require('react');
var Paper = require('material-ui/lib/paper');
var Divider = require('material-ui/lib/divider');
var Col = require('react-bootstrap/lib/Col');
var Image = require('react-bootstrap/lib/Image');
var FontIcon = require('material-ui/lib/font-icon');
var FlatButton = require('material-ui/lib/flat-button');

var FileList = React.createClass({
    getFileList :function(){
        var text_field_style = {
            "width" : "80%",
            "textOverflow" : "ellipsis",
            "paddingLeft" : "10px",
            "color" :"black",
            "lineHeight" :"50px",
            "border" : "none"
        };
        var remove_icon_style  = {
            "paddingTop": "15px",
            "paddingRight": "3%",
            "fontSize" : "15px",
            "width"  : "10%"
        };
        var divider_style = {
            "marginTop": "0px"
        };
        var button_style = {
            "margin" : "12px",
            "fontSize" : "15px",
            "textTransform": "capitalize"
        };
        if(this.props.files.length){
            var file_rows = this.props.files.map(
                function iterator( file ,index) {
                    return(
                        <div key={"file"+index}>
                            <input disabled value={file.name} style={text_field_style}/>
                            <FontIcon
                                onTouchTap={this.props.removeHandle.bind(null,index)}
                                className="fa fa-remove pull-right"
                                style={remove_icon_style}
                            />
                            <Divider style={divider_style}/>
                        </div>
                    );
                },this);
            return (
                <Paper zDepth={1}>
                    {file_rows}
                    <FlatButton onTouchTap={this.props.cancelHandle} label="Cancel" style={button_style} />
                    <FlatButton onTouchTap={this.props.uploadHandle} label="Upload Files" style={button_style} secondary={true} />
                </Paper>
            )
        }else{
            return "";
        }
    },
    render: function () {
        var fileList = this.getFileList();
        return (
            <div>
                {fileList}
            </div>
        );
    }
});

module.exports = FileList;
