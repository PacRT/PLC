/**
 * Created by Hardik on 2/7/16.
 */
'use strict';
var React = require('react');
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
var UploadzoneStore = require('../../stores/app-uploadzone-store');
var UploadzoneActions = require('../../actions/app-uploadzone-actions');

var UploadZone = React.createClass({
    getInitialState:function() {
        return {
            category: "",
            files: [],
            super_request: {},
            progress : UploadzoneStore.getProgress(),
            open_modal : true
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
        console.log( UploadzoneStore.getProgress());
    },
    handleChange:function(event, index, value,fileIndex){
        var files = this.state.files;
        files[fileIndex]["category"] = value;
        this.setState({
           "files" : files
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
        };
        this.setState({
            files: files,
            open_modal : true
        });
    },
    updateProgress:function(percent){
        this.setState({
            progress : percent
        });
    },
    uploadFiles:function(){
        var result = "";
        var _this = this;
        if(this.state.files.length){
            result = UploadzoneActions.uploadDocs(this.state.files);
            result.then(function(res){
                if(_.has(res[0],"err")){
                    _this.setState({
                        progress : 0,
                        open_modal: false
                    });
                }
                _this.setState({
                    progress : 0,
                    open_modal: true
                });
            },function(err){
                _this.setState({
                    progress : 0,
                    open_modal: false
                });
            }).catch(function(err){
                _this.setState({
                    progress : 0,
                    open_modal: false
                });
            });
        }

    },
    cancelUpload:function(){
        this.setState({
            files:[],
            progress :0,
            open_modal : false
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
                                <Card style={{"boxShadow": "none"}}>
                                    <CardHeader
                                        style={cardheader_style}
                                        title="Document Upload Zone"
                                    />
                                </Card>
                                
                            </Dropzone>
                             {
                                    this.state.is_upload_complete ? null :
                                        (
                                            <FileList files={this.state.files}
                                                      removeHandle={this.removeFile}
                                                      cancelHandle={this.cancelUpload}
                                                      uploadHandle={this.uploadFiles}
                                                      open_modal={this.state.open_modal}
                                                      handleChange={this.handleChange}
                                                      progress={this.state.progress}
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
