var React = require('react');
var MenuItem = require('material-ui/lib/menus/menu-item');
var DropDownMenu = require('material-ui/lib/DropDownMenu');
var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
var TextField = require('material-ui/lib/text-field');
var Search = require('material-ui/lib/svg-icons/action/search');
var orange500 = require('material-ui/lib/styles/colors');
var FlatButton = require('material-ui/lib/flat-button');

var AutoComplete = require('material-ui/lib/auto-complete');
var categories = require('../../constants/app-upload-categories-constants');

var  SearchBarApp = React.createClass({
    getInitialState: function(){
        return  {
            value: 1
        }
    },
    handleChange : function(event, index, value) {
        this.setState({
            value : value
        });
    },
    render :function(){

        return(
            <div style={{paddingLeft:'44px'}}>
                <Toolbar>
                    <ToolbarTitle text={this.props.title} float="left" />

                      <ToolbarGroup float="right">
                        <ToolbarSeparator />
                          {/*<FlatButton
                              icon={<Search color={orange500} />}
                          />*/}
                          <DropDownMenu menuStyle={{color:"red"}} className="pull-left" value={this.state.value} onChange={this.handleChange}>
                              <MenuItem value={1} primaryText="Document Name" />
                              <MenuItem value={2} primaryText="Category" />
                          </DropDownMenu>
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
