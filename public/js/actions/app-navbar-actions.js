/**
 * Created by Hardik on 2/20/16.
 */
'use strict';
var browserHistory = require('react-router').browserHistory;

var NavBarActions = {
    goToLocation : function(location){
        browserHistory.push(location);
    }
}

module.exports = NavBarActions;
