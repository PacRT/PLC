var React = require('react');
var Toolbar = require('material-ui').Toolbar;
var ToolbarGroup = require('material-ui').ToolbarGroup;
var ToolbarSeparator = require('material-ui').ToolbarSeparator;
var ToolbarTitle = require('material-ui').ToolbarTitle;
var TextField = require('material-ui/TextField').default;
var MyDocsActions = require('../../actions/app-mydocs-actions');
var categories = require('../../constants/app-upload-categories-constants');
var DateRangePicker = require('react-dates').DateRangePicker;

var SearchBarApp = React.createClass({
    getInitialState: function () {
        return {
            value: 1,
            focusedInput: null,
            startDate: null,
            endDate: null
        }
    },
    handleChange: function (event, index, value) {
        this.setState({
            value: value
        });
    },
    handleFilterValueChange: function (event) {
        this.setState({
            filter_value: event.target.value
        });
        if (event.target.value.length == 0)
            return MyDocsActions.getMyDocs(0, "MY_DOCS");
        this._filterDocs(event);
    },
    handleSelect: function (date) {
        console.log(date); // Momentjs object
    },
    _filterDocs: function (event) {
        /*if(event.target.value.length >= 4){
         RegistrationActions.isUserExists(event.target.value);
         }*/
        clearTimeout(this.state.timeout);
        var filter_value = event.target.value;
        var dateRange = {};
        if( this.state.startDate && this.state.endDate){
             dateRange = {
                'gte': this.state.startDate.unix()+'',
                'lte': this.state.endDate.unix()+''
            }
        }
        // Make a new timeout set to go off in 800ms
        this.state.timeout = setTimeout(function () {
            if (filter_value.length >= 4)
                MyDocsActions.filterDocs(filter_value, dateRange);
        }, 500, filter_value, dateRange);
    },
    onDatesChange: function (dateRange) {
        this.setState({
            startDate: dateRange.startDate,
            endDate: dateRange.endDate
        });
        if(dateRange || this.state.value.length >=4 ){
            var dateRange = {};
            if(dateRange.startDate){
                dateRange = {
                    'gte': this.state.startDate.unix()+'',
                    'lte': this.state.endDate.unix()+''
                };
            };
            MyDocsActions.filterDocs( this.state.value, dateRange);
        }
    },
    onFocusChange: function (focusedInput) {
        this.setState({focusedInput: focusedInput});
    },
    isOutsideRange: function(){
        return false;
    },
    render: function () {

        return (
            <div style={{paddingLeft: '44px'}}>
                <Toolbar>
                    <ToolbarGroup firstChild={true} style={{marginLeft: "-10px"}}>
                        <ToolbarTitle text={this.props.title}/>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarGroup>
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <div className="hidden-sm hidden-xs">
                                <DateRangePicker
                                    showClearDates
                                    startDatePlaceholderText={'From'}
                                    endDatePlaceholderText={'To'}
                                    isOutsideRange={this.isOutsideRange}
                                    onDatesChange={this.onDatesChange}
                                    onFocusChange={this.onFocusChange}
                                    focusedInput={this.state.focusedInput}
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                />
                            </div>
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
                                underlineStyle={{"borderColor": "rgba(0, 0, 0, 0.870588)"}}
                                hintStyle={{"color": "rgba(0, 0, 0, 0.870588)"}}
                            />
                        </ToolbarGroup>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        )
    }
});

module.exports = SearchBarApp
