'use strict';
var React = require('react');
var Popover = require('material-ui/lib/popover/popover');
var IconButton =  require('material-ui/lib/icon-button');
var Colors = require('material-ui/lib/styles/colors');
var NotificationsIcon = require('material-ui/lib/svg-icons/social/notifications');
var RaisedButton = require('material-ui/lib/raised-button');
var ActionRemainderBar = require('../action-remainder/app-actionremainder');
var Colors = require('material-ui/lib/styles/colors');
var DropDown = require('material-ui/lib/svg-icons/navigation/arrow-drop-down');

var NotificationPopUp = React.createClass({
    getInitialState : function () {
        return {
            open_popup : false
        }
    },
    handleTouchTap : function(event){
        this.setState({
            open_popup: true,
            anchorEl: event.currentTarget
        });
    },
    handleRequestClose : function() {
        this.setState({
            open_popup: false
        });
    },
    render : function(){
        var styles = {
            popover: {
                "marginTop" : "3px"
            }
        }
        return (
            <div>
                <IconButton tooltip="Notifications"  style={{ "fill": "rgb(255,255,255)" }} onTouchTap={this.handleTouchTap}>
                    <NotificationsIcon   color={Colors.white} />
                </IconButton>
                <Popover
                    open={this.state.open_popup}
                    anchorEl={this.state.anchorEl}
                    style={ styles.popover}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                <ActionRemainderBar />
                </Popover>
            </div>

        )
    }
});

module.exports = NotificationPopUp;
