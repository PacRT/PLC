var React = require('react');
var MenuItem = require('material-ui/lib/menus/menu-item');
var DropDownMenu = require('material-ui/lib/DropDownMenu');
var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
var TextField = require('material-ui/lib/text-field');

var  SearchBarApp = React.createClass({
    render :function(){
        return(
            <div style={{paddingLeft:'44px'}}>
                <Toolbar>
                    <ToolbarTitle text={this.props.title} float="left" />

                      <ToolbarGroup float="right">
                        <ToolbarSeparator />
                        <TextField
                            hintText="Search In My Docs"
                            style={{"paddingLeft": "1em"}}
                        />
                    </ToolbarGroup>
                    
                </Toolbar>
            </div>
        )
    }
});

module.exports = SearchBarApp
