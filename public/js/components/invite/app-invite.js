/**
 * Created by Hardik on 12/22/15.
 */
'use strict';
var React = require('react');
var Grid = require('react-bootstrap/lib/Grid');
var ReactTags =  require('react-tag-input').WithContext;
var FlatButton  = require('material-ui/lib/flat-button');
var InviteActions = require('../../actions/app-invite-actions');
var Card = require('material-ui/lib/card/card');
var CardActions = require('material-ui/lib/card/card-actions');
var CardHeader = require('material-ui/lib/card/card-header');
var CardText = require('material-ui/lib/card/card-text');
var NotificationActions = require('../../actions/app-notification');
var Invite = React.createClass({
    getInitialState: function(){
        return  {
            "invitation_emails_tag" : []
        }
    },
    _addEmails : function(email){
        email = email.toLowerCase();
        var invitation_emails_tag = this.state.invitation_emails_tag;
        var emails = invitation_emails_tag.filter(function(email_tag){return email_tag["text"] === email});
        if(this.validateEmail(email)){
            if(!emails.length){
                invitation_emails_tag.push({
                    id:new Date().getTime(),
                    text: email.toLowerCase()
                });
                this.setState({invitation_emails_tag: invitation_emails_tag});
            }
        }else{
            InviteActions.enterValidEmailNotification();
        }
    },
    validateEmail : function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    _handleDeleteEmails : function(i){
        var emails = this.state.invitation_emails_tag;
        emails.splice(i, 1);
        this.setState({invitation_emails_tag: emails});
    },
    _sendInvites : function(){
        var emails = this.state.invitation_emails_tag.map(function(item){return item['text']})

        if(emails.length > 0){
            InviteActions.sendInvites(emails);
        }else{
            var notification = {
                open : true,
                message : "Please add Email Ids"
            }
            NotificationActions.showNotification(notification);
        }
    },
    render: function () {
        var placeHolder = "Add Emails!";
        return (
            <div>
                <Grid>
                    <Card style={{"box-shadow": "none"}}>
                        <CardHeader
                            title="Invite People You know"
                            avatar="http://lorempixel.com/100/100/nature/"
                        />
                        <CardText>
                            <ReactTags tags={this.state.invitation_emails_tag}
                                       handleAddition={this._addEmails}
                                       handleDelete={this._handleDeleteEmails}
                                       placeholder={placeHolder}
                            />
                        </CardText>
                        <CardActions>
                            <FlatButton
                                label="Invite"
                                className="pull-right"
                                secondary={true}
                                onTouchTap={this._sendInvites}
                            />
                        </CardActions>
                    </Card>

                </Grid>
            </div>
        );
    }
});

module.exports = Invite;
