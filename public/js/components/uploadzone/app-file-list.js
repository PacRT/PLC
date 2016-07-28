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
var SelectFileCategory = require('./app-select-file-category');
var PopularCategories = require('./app-popular-categories');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Card = require('material-ui/lib/card/card');

var FileList = React.createClass({
    getInitialState : function() {
        return {
            category: []
        }
    },
    handleChange:function(fileIndex,event, index, value){
        this.props.handleChange(event,index,value, fileIndex);

    },
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
                            <Col md={12} xs={12} >
                                <Col md={6} xs={12}>
                                    <input disabled value={file.name} style={text_field_style}/>
                                </Col>
                                <Col md={4} xs={12}>
                                    <PopularCategories category={file["category"]} handle={this.handleChange.bind(null,index)}/>
                                </Col>
                                <Col md={2} xs={12}>
                                    <FontIcon
                                        onTouchTap={this.props.removeHandle.bind(null,index)}
                                        className="fa fa-remove pull-right"
                                        style={remove_icon_style}
                                    />
                                </Col>
                                <Divider style={divider_style}/>
                            </Col>

                        </div>
                    );
                },this);
            return (
                <Card zDepth={1} style={{"boxShadow": "none"}}>
                    { file_rows }
                </Card>
            )
        }else{
            return "";
        }
    },
    render: function () {
        var fileList = this.getFileList();
        return (
            <div>
                <SelectFileCategory progress={this.props.progress}
                                    handleChange={this.props.handleChange}
                                    selectCat={true}
                                    getFileList={this.getFileList}
                                    modal_open={this.props.open_modal}
                                    cancelHandle={this.props.cancelHandle}
                                    uploadHandle={this.props.uploadHandle}>
                </SelectFileCategory>
            </div>
        );
    }
});

module.exports = FileList;
