var React = require('react');

var IconMenu = require('material-ui/lib/menus/icon-menu');
var IconButton = require('material-ui/lib/icon-button');
var FontIcon = require('material-ui/lib/font-icon');
var NavigationExpandMoreIcon = require('material-ui/lib/svg-icons/navigation/expand-more');
var MenuItem = require('material-ui/lib/menus/menu-item');
var DropDownMenu = require('material-ui/lib/DropDownMenu');
var RaisedButton = require('material-ui/lib/raised-button');
var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
var SearchIcon =  require('material-ui/lib/svg-icons/action/search');
var TextField = require('material-ui/lib/text-field');


var  SearchBarApp = React.createClass({
    render :function(){
        return(
            <div>
                <Toolbar>
                    <ToolbarTitle text="My Docs" float="left" />
                    <ToolbarGroup float="right">
                        <ToolbarSeparator />
                        <TextField
                            hintText="Search..."
                        />
                        <DropDownMenu className="pull-right" value={1}>
                            <MenuItem value={1} primaryText="File Name" />
                            <MenuItem value={2} primaryText="Category" />
                            <MenuItem value={3} primaryText="Date" />
                        </DropDownMenu>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        )
    }
});

module.exports = SearchBarApp