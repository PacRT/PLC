var React = require('react');
var MenuItem = require('material-ui/MenuItem/MenuItem');
var DropDownMenu = require('material-ui/DropDownMenu/DropDownMenu');
var Toolbar = require('material-ui/Toolbar/Toolbar');
var ToolbarGroup = require('material-ui/Toolbar/ToolbarGroup');
var ToolbarSeparator = require('material-ui/Toolbar/ToolbarSeparator');
var ToolbarTitle = require('material-ui/Toolbar/ToolbarTitle');
var TextField = require('material-ui/TextField/TextField');
var Search = require('material-ui/svg-icons/action/search');
var orange500 = require('material-ui/styles/colors');
var FlatButton = require('material-ui/FlatButton/FlatButton');
var MyDocsActions = require('../../actions/app-mydocs-actions');

var AutoComplete = require('material-ui/AutoComplete');
var categories = require('../../constants/app-upload-categories-constants');

var  SearchBarApp = React.createClass({
    getInitialState: function(){
        return  {
            value: 2,
            timeout: null,
            filter_value : ""
        }
    },
    handleChange : function(event, index, value) {
        this.setState({
            value : value
        });
    },
    handleFilterValueChange: function (event) {
        this.setState({
            filter_value: event.target.value
        });
        if(this.state.filter_value != "")
            this._filterDocs(event);
        else
            MyDocsActions.getMyDocs(0,"MY_DOCS");
    },
    _filterDocs: function (event) {
        /*if(event.target.value.length >= 4){
         RegistrationActions.isUserExists(event.target.value);
         }*/
        clearTimeout(this.state.timeout);
        var filter_value = event.target.value;
        var _this = this;
        // Make a new timeout set to go off in 800ms
        this.state.timeout = setTimeout(function () {
            if (filter_value.length >= 4)
                MyDocsActions.filterDocs(filter_value);
        }, 500,filter_value);
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
                            value={this.state.filter_value}
                            onChange={this.handleFilterValueChange}
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
