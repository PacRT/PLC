/**
 * Created by Hardik on 12/22/15.
 */
'use strict';
var React = require('react');
var Grid = require('react-bootstrap/lib/Grid');
var FlatButton = require('material-ui').FlatButton;
var InviteActions = require('../../actions/app-invite-actions');
var Card = require('material-ui').Card;
var CardActions = require('material-ui').CardActions;
var CardHeader = require('material-ui').CardHeader;
var CardText = require('material-ui').CardText;
var NotificationActions = require('../../actions/app-notification');
var Chip = require('material-ui/Chip').default;
var Col = require('react-bootstrap').Col;
var TextField = require('material-ui/TextField').default;
var CircularProgress = require('material-ui/CircularProgress').default;
var ChipCmp = require('../utils/Chip');

var Invite = React.createClass({
    getInitialState: function () {
        return {
            "show_spinner": false,
            "emails": []
        }
    },
    _updateEmails: function(emails){
        this.setState({
            emails: emails
        })
    },
    _sendInvites: function () {
        var emails = this.state.emails;
        if (emails.length > 0) {
            var api_promise = InviteActions.sendInvites(emails);
            this.setState({
                show_spinner: true
            });
            api_promise.then(function (response) {
                this.setState({
                    show_spinner: false,
                    emails: []
                });
                document.getElementById("addEmails").addEventListener("keydown",this._handleEnterKey);
            }.bind(this));
        } else {
            var notification = {
                open: true,
                message: "Please add Email Ids"
            };
            NotificationActions.showNotification(notification);
        }
    },
    styles: {
        circularProgress: {
            display: "block",
            margin: "auto"
        }
    },
    render: function () {
        return (
            <div>
                <Col md={6} xs={12} mdOffset={3}>
                    <Card style={{"boxShadow": "none"}}>
                        <CardHeader
                            title="Invite People You know"
                            avatar="http://lorempixel.com/100/100/nature/"
                        />
                        <CardText>
                            {
                                this.state.show_spinner ?
                                    <CircularProgress size={60} thickness={5} style={this.styles.circularProgress}/> :
                                    <ChipCmp
                                        placeholder={'Add Emails'}
                                        updateList={this._updateEmails}/>
                            }
                        </CardText>
                        <CardActions>
                            <FlatButton label="Action1" className="invisible"/>
                            <FlatButton
                                label="Invite"
                                className="pull-right"
                                secondary={true}
                                onTouchTap={this._sendInvites}
                            />
                        </CardActions>
                    </Card>
                </Col>
            </div>
        );
    }
});

module.exports = Invite;
