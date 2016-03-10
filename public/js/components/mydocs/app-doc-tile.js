/**
 * Created by Hardik on 2/20/16.
 */
var React = require("react");
var grey200 = require('material-ui/lib/styles/colors').grey200;
var Paper = require('material-ui/lib/paper');
var Spacing = require('material-ui/lib/styles').Spacing;
var Transitions = require('material-ui/lib/styles').Transitions;
var Typography = require('material-ui/lib/styles').Typography;
var Col = require('react-bootstrap/lib/Col');
var DocTileActions = require('../../actions/app-doc-tile-actions');
var VerticalMenu = require('./app-tile-action-menu');
var DocMetaData = require('./app-doc-meta-data');
var DocTile = React.createClass({
    getInitialState: function () {
        return {
            tile: "",
            _keys : [],
            _values : []
        }
    },
    getStyles: function () {
        var desktopKeylineIncrement = Spacing.desktopKeylineIncrement;

        var styles = {
            root: {
                transition: Transitions.easeOut,
                margin: '15px 15px 15px 0px',
                maxHeight: '175px',
                width: '100%'
            },
            rootWhenMedium: {
                float: 'left',
                width: '100%',
                margin: "15px 15px 15px 0px"
            },
            image: {
                //Not sure why this is needed but it fixes a display
                //issue in chrome
                marginBottom: -6,
                display: "table-cell",
                maxWidth: "auto",
                maxHeight: "175px",
                width: "auto",
                height: "auto"
            },
            heading: {
                fontSize: 14,
                paddingTop: 19,
                marginBottom: 13,
                letterSpacing: 0,
                "maxWidth": "auto",
                fontWeight: Typography.fontWeightMedium,
                color: Typography.textDarkBlack,
                backgroundColor: grey200,
                textAlign: 'center',
                margin: 0,
                padding: 0,
                lineHeight: desktopKeylineIncrement + 'px',
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
            text_field_style: {
                "width": "80%",
                "textOverflow": "ellipsis",
                "display": "block",
                "whiteSpace": "nowrap",
                "paddingLeft": "10px",
                "color": "black",
                "border": "none",
                "overflow": "hidden",
                "lineHeight": "50px",
                "float": "left"
            },
            tile_label: {
                "backgroundColor": grey200
            },
            tile_menu: {
                width: "20%"
            },
            tile_div:{
                width: "50%",
                float: "left"
            },
            "meta-data-div":{
                "width" : "50%",
                "float" : "left",
                "margin" : "15px 0px 15px 0px",
                "backgroundColor" :"#eeeeee",
                "padding" : "15px 15px 15px 15px",
                "position" : "absolute",
                "top"   : "0",
                "right" : "-1px",
                "height" : "86%"
            }

        };
        return styles;
    },
    componentWillMount: function () {
        var imgStyles = {
            position: "relative",
            width: "100%",
            height: "128px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }
        var encoded_id = encodeURIComponent(this.props.img);
        if (this.props.img.indexOf(".pdf") == -1) {
            imgStyles["backgroundImage"] = "url(" + this.props.img + ")";
            this.setState({
                tile: <div style={imgStyles} id={encoded_id}></div>
            })
        } else {
            this.setState({
                tile: <div id={encoded_id}></div>
            });
            function convertCanvasToImage(canvas, id) {
                var div1 = document.getElementById(id);
                //div1.style = imgStyles;
                div1.style["backgroundImage"] = "url(" + canvas.toDataURL() + ")";
                div1.style["position"] = "relative";
                div1.style["width"] = "100%";
                div1.style["height"] = "128px";
                div1.style["backgroundRepeat"] = "no-repeat";
                div1.style["backgroundSize"] = "cover";
            }

            DocTileActions.createPDFThumbnail(this.props.img, encoded_id, convertCanvasToImage);

        }
        ;
    },
    render: function () {
        var styles = this.getStyles();
        return (
            <Paper>
                <Col md={6} xs={12}>
                    <div style={styles.tile_div}>
                        <Paper
                            zDepth={this.props.isSelected?4:0}
                            style={styles.root}
                            onTouchTap={this.props.selectThisTile.bind(null,this.props.tile_index)}
                        >
                            {this.state.tile}
                            <div style={styles.tile_label}>
                                <div style={styles.text_field_style}>
                                    {this.props.heading}
                                </div>
                                <VerticalMenu doc_url={this.props.img} title={this.props.heading}
                                              style={styles.tile_menu}/>
                            </div>
                        </Paper>
                    </div>
                    <div style={styles["meta-data-div"]}>
                       <DocMetaData doc_url={this.props.img}/>
                    </div>
                </Col>
            </Paper>

        )
    }
});

module.exports = DocTile;