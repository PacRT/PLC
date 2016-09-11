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
var MyDocsActions = require('../../actions/app-mydocs-actions');

var DatePicker  = require('material-ui/lib/date-picker/date-picker');

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
    handleFilterValueChange: function (event) {
        this.setState({
            filter_value: event.target.value
        });
        if(event.target.value.length == 0)
            return MyDocsActions.getMyDocs(0,"MY_DOCS");
        this._filterDocs(event);
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
			<DatePicker
    selected={this.state.startDate}
    startDate={this.state.startDate}
    endDate={this.state.endDate}
    onChange={this.handleChangeStart} />
<DatePicker
    selected={this.state.endDate}
    startDate={this.state.startDate}
    endDate={this.state.endDate}
    onChange={this.handleChangeEnd} />
                        <ToolbarSeparator />
                          {/*<FlatButton
                              icon={<Search color={orange500} />}
                          />*/
                         /* <DropDownMenu menuStyle={{color:"red"}} className="pull-left" value={this.state.value} onChange={this.handleChange}>
                              <MenuItem value={1} primaryText="Document Name" />
                              <MenuItem value={2} primaryText="Category" />
                          </DropDownMenu>*/}
                        <TextField
                            value={this.state.filter_value}
                            onChange={this.handleFilterValueChange}
                            hintText="Search In My Docs"
                            style={{"paddingLeft": "1em"}}
                            underlineStyle={{"borderColor":"rgba(0, 0, 0, 0.870588)"}}
                            hintStyle={{"color":"rgba(0, 0, 0, 0.870588)"}}
                        />
                    </ToolbarGroup>
                    
                </Toolbar>
            </div>
        )
    }
});

module.exports = SearchBarApp
