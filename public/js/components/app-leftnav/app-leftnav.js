var React = require('react');
var LeftNav = require('material-ui/lib/left-nav');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var Divider = require('material-ui/lib/divider');
var Colors = require('material-ui/lib/styles/Colors');
var Spacing = require('material-ui/lib/styles/Spacing');
var Typography = require('material-ui/lib/styles/Typography');
var Router = require('react-router');
var Link = Router.Link;
var SelectableContainerEnhance = require('material-ui/lib/hoc/selectable-enhance').SelectableContainerEnhance;
var SelectableList = SelectableContainerEnhance(List);
var browserHistory = require('react-router').browserHistory;

var AppLeftNav = React.createClass({
    getInitialState:function(){
        return {
            selectedLocation : '/get-started/prerequisites'
        }
    },
    propTypes: {
        docked: React.PropTypes.bool.isRequired,
        onRequestChangeList: React.PropTypes.func.isRequired,
        open: React.PropTypes.bool.isRequired,
        style: React.PropTypes.object,
        onRequestChangeLeftNav: React.PropTypes.func.isRequired,
    },
    contextTypes: {
        muiTheme: React.PropTypes.object,
        router: React.PropTypes.func
    },
    handleRequestChangeLink: function (event, value) {
        window.location = value;
    },
    handleTouchTapHeader: function () {
        this.setState({
            leftNavOpen: false
        });
    },
    getStyles: function () {
        return {
            logo: {
                cursor: 'pointer',
                fontSize: 24,
                color: Typography.textFullWhite,
                lineHeight: `${Spacing.desktopKeylineIncrement}px`,
                fontWeight: Typography.fontWeightLight,
                backgroundColor: Colors.cyan500,
                paddingLeft: Spacing.desktopGutter,
                marginBottom: 8
            }
        };
    },
    handleRequestChangeList:function(event, value) {
        this.setState({
            selectedLocation: value,
            "docked" : true
        });
        browserHistory.push(value);
    },
    render: function () {
        var LeftNavStyle = {
            "top": "65px"
        }
        return (

            <LeftNav
                docked={true}
                style={LeftNavStyle}
                open={true}
                onRequestChange={this.props.onRequestChangeLeftNav}
            >
                <SelectableList
                    valueLink={{value: this.state.selectedLocation, requestChange: this.handleRequestChangeList}}>

                    <ListItem primaryText="DashBoard" value="dashboard"/>
                    <ListItem primaryText="My Docs" value="mydocs"/>
                    <ListItem primaryText="How to" value="howto"/>
                    <ListItem primaryText="Invite" value="invite"/>
                    <ListItem primaryText="Dev Zone" value="devzone"/>
                    <ListItem primaryText="My THings" value="mythings"/>

                    </SelectableList>

            </LeftNav>
        )
        }

        });

        module.exports = AppLeftNav