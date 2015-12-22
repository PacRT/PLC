/**
 * Created by Hardik on 12/19/15.
 */
var Dropzone = require('react-dropzone');
//var PopularCategories = require('./app-popularCategories')


var UploadZone = React.createClass({
    onDrop: function (files) {
        console.log('Received files: ', files);
    },
    render: function () {

        var dropZoneStyle = {
            "text-align" : "center",
            "position"   : "relative",
            "top"        : "30%"
         };
        return (
            <div>
                <Dropzone onDrop={this.onDrop}>
                   <div style={dropZoneStyle}><a><div><i className="fa fa-upload fa-4x"></i></div><span>Document Drop Zone</span></a></div>
                </Dropzone>
            </div>
        );
    }
});

module.exports = UploadZone;
