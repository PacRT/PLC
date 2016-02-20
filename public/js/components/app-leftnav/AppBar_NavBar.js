/**
 * Created by Hardik on 2/17/16.
 */
var React = require('react');

var AppBar = require('material-ui/lib/app-bar');
var IconButton = require('material-ui/lib/icon-button');
var Spacing = require('material-ui/lib/styles');
var StyleResizable = require('material-ui/lib/mixins');

var Colors = require('material-ui/lib/styles/Colors');
var getMuiTheme = require('material-ui/lib/styles/getMuiTheme');

var AppLeftNav = require('./app-leftnav');

var githubButton = (
    <IconButton
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true}
    />
);
var AppBar_NavBar = React.createClass({


    getInitialState: function () {
        return {
            leftNavOpen: false
        };
    },


    componentWillMount: function () {
        this.setState({
            muiTheme: this.state.muiTheme,
        });
    },


    handleTouchTapLeftIconButton: function () {
        this.setState({
            leftNavOpen: !this.state.leftNavOpen,
        });
    },

    handleChangeRequestLeftNav: function (open) {
        this.setState({
            leftNavOpen: open,
        });
    },

    handleRequestChangeList: function (event, value) {
        this.props.history.push(value);
        this.setState({
            leftNavOpen: false,
        });
    },

    render: function () {

         var   children =  this.props.children;


        var leftNavOpen = this.state.leftNavOpen;


        var title = "Paperless Club";

        var docked = false;
        var showMenuIconButton = true;
        var darkWhite = Colors.darkWhite;

        var styles = {
            appBar: {
                position: 'fixed',
                // Needed to overlap the examples
                zIndex:  100,
                top: 0,
                background : "black"
            },
            root: {
                paddingTop: Spacing.desktopKeylineIncrement,
                minHeight: 400,
            },
            content: {
                margin: Spacing.desktopGutter,
            },
            contentWhenMedium: {
                margin: `${Spacing.desktopGutter * 2}px ${Spacing.desktopGutter * 3}px`,
            },
            footer: {
                backgroundColor: Colors.grey900,
                textAlign: 'center',
            },
            a: {
                color: darkWhite,
            },
            p: {
                margin: '0 auto',
                padding: 0,
                color: Colors.lightWhite,
                maxWidth: 335,
            },
            iconButton: {
                color: darkWhite,
            },
        };

        return (
            <div>
                <AppBar
                    onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
                    zDepth={0}
                    iconElementRight={githubButton}
                    style={styles.appBar}
                    showMenuIconButton={showMenuIconButton}
                    title={title}
                />
                <AppLeftNav
                    style={styles.leftNav}
                    docked={true}
                    onRequestChangeLeftNav={this.handleChangeRequestLeftNav}
                    onRequestChangeList={this.handleRequestChangeList}
                    open={leftNavOpen}
                />
            </div>

        )
    }

});


module.exports = AppBar_NavBar;