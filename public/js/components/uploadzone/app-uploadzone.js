/**
 * Created by Hardik on 12/19/15.
 */
var Dropzone = require('react-dropzone');
var Col = require('react-bootstrap/lib/Col');
var Image = require('react-bootstrap/lib/Image');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var ProgressBar = require('react-bootstrap/lib/ProgressBar');
var RaisedButton = require('material-ui/lib/raised-button');
var ToolBar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');

var UploadZone = React.createClass({
    getInitialState: function () {
        return this.state = {
            "files" : []
        };
    },
    onDrop: function (files) {
        this.setState({
            files: files
        });
    },
    getFilePreview :function(){
        var style = {
            margin: 12
        };
        var toolbar_style={
            "marginRight" : "0px"
        }
       if(this.state.files.length){
           return (
               <div>
                  <ToolBar>
                      <ToolbarGroup  float="left">
                          <ToolbarTitle text="Upload Files.." />
                      </ToolbarGroup>
                      <ToolbarGroup float="right">
                          <RaisedButton label="Cancel" style={toolbar_style} />
                          <RaisedButton label="Upload All"  style={toolbar_style}/>
                      </ToolbarGroup>
                  </ToolBar>

                   <div>
                       <table className="table table-striped">
                           <tbody>
                               {this.state.files.map((file) =>
                                   <tr>
                                       <td>
                                            <Col xs={6} md={2}>
                                                <Image src={file.preview} thumbnail responsive/>
                                            </Col>
                                           <p className="size">Processing {file.name}</p>
                                           <ProgressBar active now={45} style={style} />
                                           <div className="pull-right">
                                               <RaisedButton label="Cancel" style={style}/>
                                               <RaisedButton label="Start"  style={style}/>
                                           </div>

                                       </td>
                                   </tr>
                               )}
                           </tbody>
                       </table>
                   </div>
               </div>
           )
       }else{
           return "";
       }
    },
    render: function () {

        var dropZoneStyle = {
            "textAlign" : "center",
            "position"   : "relative",
            "top"        : "30%"
         };
        var file_preview = this.getFilePreview();
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={3}>
                            <Dropzone onDrop={this.onDrop}>

                                <div style={dropZoneStyle}>
                                    <a>
                                        <div>
                                            <i className="fa fa-upload fa-4x"></i>
                                        </div>
                                        <span>Document Drop Zone</span>
                                    </a>
                                </div>
                            </Dropzone>
                        </Col>
                        <Col xs={12} md={9}>
                            {file_preview}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

module.exports = UploadZone;
