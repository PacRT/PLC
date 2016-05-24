/**
 * Created by Hardik on 2/8/16.
 */
/**
 * Created by Hardik on 12/22/15.
 */
/** @jsx React.DOM */
var React = require('react');
var List = require('material-ui/List/List');
var ListItem = require('material-ui/List/ListItem');
var ActionInfo = require('material-ui/svg-icons/action/info');
var Announcement = require('material-ui/svg-icons/action/announcement');
var Divider = require('material-ui/Divider/Divider');
var ActionRemainderActions = require('../../actions/app-actionremainder-actions');
var ModalApp = require('./app-actionremainder-modal');

var ActionRemainder = React.createClass({
    /**
     * Opening a modal window to take appropriate action
     * @boolean openModel
     */
    handleActionRemainder : function(openModel){
        //ActionRemainderActions.openModal(openModel);
    },
    render: function () {
        var list_style = {
            "fontSize" : "14px",
            "lineHeight" : "5px",
            "paddingBottom" : "0px"
        };
        var immediate_action = {
            "fill" : "#d9534f"
        };
        var warning = {
            "fill" : "#f0ad4e"
        };
        var info = {
            "fill" : "#5cb85c"
        };
        return (
            <div>
                <List subheader="Action Remainder">
                    <ListItem onTouchTap={this.handleActionRemainder.bind(null,true)} style={list_style} primaryText="Car Insurance Renewal"
                              secondaryTextLines={1} secondaryText="2/6"
                              rightIcon={<Announcement style={immediate_action} />}  />
                    <ListItem style={list_style} primaryText="Property"
                              secondaryTextLines={1} secondaryText="Your status is visible to everyone you use with"
                              rightIcon={<Announcement style={warning} tooltip="Please Take Actions"/>}  />
                    <ListItem style={list_style} primaryText="Boat Registration"
                              secondaryTextLines={1} secondaryText="Your status is visible to everyone you use with"
                              rightIcon={<Announcement style={warning} tooltip="Please Take Actions" />}  />
                    <ListItem style={list_style} primaryText="Qtly Estimated Tax"
                              secondaryTextLines={1} secondaryText="Your status is visible to everyone you use with"
                              rightIcon={<Announcement style={info} tooltip="Please Take Actions" />}  />
                </List>
                <Divider />
                <List subheader="Warranty Status">
                    <ListItem style={list_style} primaryText="All mail" rightIcon={<ActionInfo />} />
                    <ListItem style={list_style} primaryText="Trash" rightIcon={<ActionInfo />} />
                    <ListItem style={list_style} primaryText="Spam" rightIcon={<ActionInfo />} />
                    <ListItem  style={list_style} primaryText="Follow up" rightIcon={<ActionInfo />} />
                </List>
                <ModalApp/>
            </div>
        );
    }
});

module.exports = ActionRemainder;
