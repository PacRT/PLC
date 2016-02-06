/** @jsx React.DOM */
var React       = require('react');
var Template    = require('./app-template');
var UploadZone  = require('./uploadzone/app-uploadzone');
var NavBar      = require('./navbar/app-navbar');
var Notification = require('./notification/app-notification');
var HomePage    = require('./home/app-home');
var APP = React.createClass({
  render: function () {
      var style={
          "marginTop":"50px"
      }
    return (
      <div>
        <NavBar />
        <div className="container" style={style}>
            {this.props.children || <HomePage/>}
             <Notification/>
        </div>
      </div>
    );
  }
});


exports.APP = APP;



