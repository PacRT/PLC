/**
 * Created by Hardik on 12/22/15.
 */
/** @jsx React.DOM */
var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var TextField = require('material-ui/lib/text-field');
var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');


var Invite = React.createClass({

    render: function () {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup key={1}>
                        <ToolbarTitle text="Invite People You know" />
                    </ToolbarGroup>
                </Toolbar>
                <center>

                    <TextField
                        style={{"display": "block"}}
                        hintText="Required Off Course :)"
                        floatingLabelText="Email" />

                    <TextField
                        style={{"display": "block"}}
                        hintText="Highly Encouraged"
                        floatingLabelText="Name" />
                    <br/>
                    <RaisedButton label="Invite"  style={{"margin-right": "10px"}} />
                    <RaisedButton label="Invite More" />
                </center>

            </div>
        );
    }
});

module.exports = Invite;
