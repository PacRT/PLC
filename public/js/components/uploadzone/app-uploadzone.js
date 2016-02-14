/**
 * Created by Hardik on 2/7/16.
 */
/** @jsx React.DOM */
var React = require('react');
var Dropzone = require('react-dropzone');
var Dropzone = require('react-dropzone');
var Col = require('react-bootstrap/lib/Col');
var Image = require('react-bootstrap/lib/Image');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var ProgressBar = require('react-bootstrap/lib/ProgressBar');
var Card = require('material-ui/lib/card/card');
var LinearProgress = require('material-ui/lib/linear-progress');
var CardHeader = require('material-ui/lib/card/card-header');
var FileList = require('./app-file-list');
var PopularCategories = require('./app-popular-categories');
var UploadzoneStore = require('../../stores/app-uploadzone-store');
var UploadzoneActions = require('../../actions/app-uploadzone-actions');

var UploadZone = React.createClass({
    getInitialState:function() {
        return {
            category: "",
            files: [],
            super_request: {},
            progress : UploadzoneStore.getProgress()
        }
    },
    componentDidMount: function() {
        UploadzoneStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        UploadzoneStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState({
            progress : UploadzoneStore.getProgress()
        });
    },
    handleChange:function(event, index, value){
        this.setState({
            "category" : value
        });
    },
    removeFile : function(index){
        var files = this.state.files;
        files.splice(index,1);
        this.setState({
            "files" : files
        });
    },
    onDrop: function (files) {
        var isFilePresent = this.state.files.length;
        var present_files = [];
        if(isFilePresent){
            present_files = this.state.files;
            files = present_files.concat(files);
        }
        this.setState({
            files: files
        });
    },
    updateProgress:function(percent){
        this.setState({
            progress : percent
        });
    },
    uploadFiles:function(){
        if(this.state.files.length)
            UploadzoneActions.uploadDocs(this.state.files,this.state.category);
        this.setState({
            files : [],
            progress : 0
        });
    },
    cancelUpload:function(){
        this.setState({
            files:[],
            progress :0,
        })
    },
    render: function () {
        var cardheader_style = {
            "height" : "100px",
            "lineHeight" : "100px",
            "display"  : "block",
            "textAlign" : "center",
            "verticalAlign" : "middle",
            "padding" : "0px"
        };
        var dropzone_style={
            "borderWidth" : "0px",
            "borderColor" : "none",
            "borderStyle" : "none",
            "borderRadius" : "0px",
        };
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={3}>
                            <Dropzone onDrop={this.onDrop} style={dropzone_style}>
                                <Card>
                                    <CardHeader
                                        style={cardheader_style}
                                        title="Document Upload Zone"
                                    />
                                </Card>
                                {this.state.progress > 0 ? (
                                    <LinearProgress mode="determinate" value={this.state.progress}/>
                                ) : null}
                            </Dropzone>
                            <PopularCategories category={this.state.category} handle={this.handleChange}/>
                            {
                                this.state.is_upload_complete ? null :
                                    (
                                        <FileList files={this.state.files}
                                                  removeHandle={this.removeFile}
                                                  cancelHandle={this.cancelUpload}
                                                  uploadHandle={this.uploadFiles}
                                        />
                                    )
                            }

                        </Col>
                        <Col xs={12} md={9}>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

module.exports = UploadZone;
