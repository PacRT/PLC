/** @jsx React.DOM */
var React = require('react');
var Template = require('./app-template');
var UploadZone = require('./uploadzone/app-uploadzone');
var NavBar = require('./navbar/app-navbar');

var APP = React.createClass({
  render: function () {
    return (
      <Template>
          <div className="container">
              <NavBar />
              {this.props.children || <UploadZone /> }
          </div>
      </Template>
    );
  }
});


exports.APP = APP;



