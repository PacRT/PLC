/**
 * Created by Hardik on 2/20/16.
 */
var React = require("react");
var grey200 = require('material-ui/lib/styles/colors').grey200;
var Paper = require('material-ui/lib/paper');
var StyleResizable = require('material-ui/lib/mixins').StyleResizable;
var Spacing = require('material-ui/lib/styles').Spacing;
var Transitions = require('material-ui/lib/styles').Transitions;
var Typography = require('material-ui/lib/styles').Typography;
var DocTile = React.createClass({
    propTypes: {
        firstChild: React.PropTypes.bool,
        heading: React.PropTypes.string,
        lastChild: React.PropTypes.bool
    },
    mixins: [StyleResizable],
    getInitialState: function() {
        return {
            zDepth: 0,
        };
    },
    _onMouseEnter: function() {
        this.setState({
            zDepth: 4,
        });
    },
    _onMouseLeave: function() {
        this.setState({
            zDepth: 0,
        });
    },
    getStyles: function() {
        var desktopKeylineIncrement = Spacing.desktopKeylineIncrement;
        var styles = {
            root: {
                transition: Transitions.easeOut,
                margin: '15px 15px 15px 0px'
            },
            rootWhenMedium: {
                float: 'left',
                width: 'auto',
                margin :"15px 15px 15px 0px"
            },
            image: {
                //Not sure why this is needed but it fixes a display
                //issue in chrome
                marginBottom: -6,
                display: "block",
                maxWidth:"100%",
                maxHeight:"225px",
                width: "auto",
                height: "auto"
            },
            heading: {
                fontSize: 14,
                paddingTop: 19,
                marginBottom: 13,
                letterSpacing: 0,
                "maxWidth":"auto",
                fontWeight: Typography.fontWeightMedium,
                color: Typography.textDarkBlack,
                backgroundColor: grey200,
                textAlign: 'center',
                margin: 0,
                padding: 0,
                lineHeight: `${desktopKeylineIncrement}px`,
            },
            rootWhenLastChild: {
                marginBottom: 0,
            },
            rootWhenMediumAndLastChild: {
                marginRight: 0,
                marginBottom: 0,
            },
            rootWhenMediumAndFirstChild: {
                marginLeft: 0,
            },
            text_field_style : {
                "width" : "100%",
                "textOverflow" : "ellipsis",
                "paddingLeft" : "10px",
                "color" :"black",
                "lineHeight" :"50px",
                "border" : "none",
                backgroundColor: grey200,
            }
        };
        if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
            this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
            styles.root = Object.assign(
                styles.root,
                styles.rootWhenMedium,
                this.props.firstChild && styles.rootWhenMediumAndFirstChild,
                this.props.lastChild && styles.rootWhenMediumAndLastChild
            );
        }


        return styles;
    },

    render : function(){
        var styles = this.getStyles();
        return (
            <Paper
                zDepth={this.state.zDepth}
                onMouseEnter={this._onMouseEnter}
                onMouseLeave={this._onMouseLeave}
                style={Object.assign(
                styles.root,
                this.props.lastChild && styles.rootWhenLastChild)}
            >
                <img style={styles.image} src={this.props.img}/>
                <div>
                    <input disabled value={this.props.heading} style={styles.text_field_style}/>
                </div>
            </Paper>
        )
    }
});

module.exports = DocTile;