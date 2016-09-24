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
var NavigationClose = require('material-ui/lib/svg-icons/navigation/close');
var Drawer = require('material-ui/lib/left-nav');
var AppBar = require('material-ui/lib/app-bar');
var IconButton = require('material-ui/lib/icon-button');

var UploadZone = React.createClass({
    getInitialState:function() {
        return {
            category: "",
            files: [],
            super_request: {},
            progress : UploadzoneStore.getProgress(),
            open_modal : false,
            open_upload_drawer : UploadzoneStore.isUploadDrawOpen()
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
            progress : UploadzoneStore.getProgress(),
            open_upload_drawer : UploadzoneStore.isUploadDrawOpen()
        });
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
    getThumbnail : function(file, index){
      return  new Promise(function(resolve, reject){
          var reader = new FileReader();
          // Closure to capture the file information.
          reader.onload = function(e) {
                  if(["image/jpeg","image/png","image/gif"].indexOf(file.type) != -1){
                      file["thumbnail"] = btoa(e.target.result);
                      resolve(file);
                  }else if(["application/pdf"].indexOf(file.type) != -1){
                      var arrayBuffer = e.target.result;
                      var byteArray = new Uint8Array(arrayBuffer);
                      PDFJS.getDocument(byteArray).then(function(pdf) {
                          pdf.getPage(1).then(function(page) {
                              var canvas = document.createElement('canvas');
                              var desiredHeight = 400;
                              var viewport = page.getViewport(1);
                              var scale = desiredHeight / viewport.height;
                              var scaledViewport = page.getViewport(scale);
                              var context = canvas.getContext('2d')
                              var renderContext = {
                                  canvasContext: context,
                                  viewport:scaledViewport
                              };
                              page.render(renderContext).promise.then(function(){
                                 file["thumbnail"] = btoa(canvas.toDataURL());
                                  resolve(file);
                              },function(error){
                                  console.log("Error Occurred while rendering pdf page!!!");
                              });
                          })
                      });
                  }
              };
          // Read in the image file as a data URL.
          if(["image/jpeg","image/png","image/gif"].indexOf(file.type) != -1){
              reader.readAsDataURL(file);
          }else if(["application/pdf"].indexOf(file.type) != -1){
              reader.readAsArrayBuffer(file);
          }
      });
    },
    onDrop: function (files) {
        var isFilePresent = this.state.files.length;
        var present_files = [];
        if(isFilePresent){
            present_files = this.state.files;
            files = present_files.concat(files);
        };
        var that = this;
        var promises = [];
        for (var i = 0, f; f = files[i]; i++) {
            var thumbnailPromise = this.getThumbnail(f, i);
            promises.push(thumbnailPromise);
        }
        Promise.all(promises).then(function(updatedFiles){
            updateFiles(updatedFiles);
        });
        function updateFiles(files_with_thumbnails){
            that.setState({
                files: files_with_thumbnails,
                open_modal : true
            });
        };
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
                    files: [],
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
    _closeDrawer : function(){
        UploadzoneActions.openCloseUploadDrawer(false);
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
        var drawerStyle = {
            "height" : "65%",
            "width"  : "400px",
            "top"    : "garbage",
            "right"  : "2em",
            "bottom" : "0",
            "transition": "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"
        };
        var appBar = {
                "backgroundColor" : "#222"
        }
        return (
            <div>
                <Drawer id="popup" width={500} style={drawerStyle} openRight={true} open={this.state.open_upload_drawer}>
                    <AppBar id="appBar" style={appBar} title="Upload Docs"
                            iconElementLeft={<IconButton onTouchTap={this._closeDrawer}><NavigationClose/></IconButton>}
                    />
                    <Col xs={12} md={12} style={{ "marginTop" : "100px"}}>
                                <Dropzone onDrop={this.onDrop} style={dropzone_style}>
                                    <Card>
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
                    </Drawer>
            </div>
        );
    }
});

module.exports = UploadZone;
