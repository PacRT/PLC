/**
 * Created by Hardik on 12/22/15.
 */
'use strict';
var React = require('react');
var Badge = require('material-ui/lib/badge');
var IconButton = require('material-ui/lib/icon-button');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var ReactTags =  require('react-tag-input').WithContext;
var FlatButton  = require('material-ui/lib/flat-button');
var InviteActions = require('../../actions/app-invite-actions');
var Card = require('material-ui/lib/card/card');
var CardActions = require('material-ui/lib/card/card-actions');
var CardHeader = require('material-ui/lib/card/card-header');
var CardMedia = require('material-ui/lib/card/card-media');
var CardTitle = require('material-ui/lib/card/card-title');
var CardText = require('material-ui/lib/card/card-text');

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
                                onTouchTap={this.addComment}
                            />
                        </CardActions>
                    </Card>

                </Grid>
            </div>
        );
    }
});

module.exports = Invite;
