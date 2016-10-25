'use strict';
var React = require('react');
var Popover = require('material-ui/Popover').default;
var IconButton =  require('material-ui/IconButton').default;
var NotificationsIcon = require('material-ui/svg-icons/social/notifications').default;
var ActionRemainderBar = require('../action-remainder/app-actionremainder');
var Colors = require('material-ui/styles/colors');

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
        };
        return (
            <div>
                <IconButton tooltip="Notifications"  style={{ "fill": "rgb(255,255,255)" }} onTouchTap={this.handleTouchTap}>
                    <NotificationsIcon   color={Colors.fullWhite} />
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
