/** @jsx React.DOM */
var React       = require('react');
var Template    = require('./app-template');
var UploadZone  = require('./uploadzone/app-uploadzone');
var NavBar      = require('./navbar/app-navbar');
var Notification = require('./notification/app-notification');
var APP = React.createClass({
  render: function () {
    return (
      <Template>
          <div className="container">
              <NavBar />
              {this.props.children || <UploadZone /> }
              <Notification/>
          </div>
      </Template>
    );
  }
});


exports.APP = APP;



