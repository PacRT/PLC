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
var TableRow= require('material-ui/lib/table/table-row');
var TableRowColumn= require('material-ui/lib/table/table-row-column');
var DocMetaData = require('./app-doc-meta-data');

var DocTile = React.createClass({
    getInitialState: function () {
        return {
            tile: ""
        }
    },
    getStyles: function () {
        var desktopKeylineIncrement = Spacing.desktopKeylineIncrement;

        var styles = {
            root: {
                transition: Transitions.easeOut,
                margin: '15px 15px 15px 0px',
                maxHeight: '175px',
                width: '100%',
                "position" : "relative"
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
                marginBottom: 0
            },
            rootWhenMediumAndLastChild: {
                marginRight: 0,
                marginBottom: 0
            },
            rootWhenMediumAndFirstChild: {
                marginLeft: 0
            },
            text_field_style: {
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
                "backgroundColor": "rgba(0, 0, 0, 0.87)",
                "height": "45px",
                "position" : "absolute",
                "opacity" : 0.75,
                "bottom" : 0,
                "width" : "100%"
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
                "backgroundColor" :"#ffffff",
                "padding" : "0px 15px 0px 15px",
                "position" : "absolute",
                "top"   : "0",
                "right" : "-1px",
                "height" : "86%"
            }

        };
        if(this.props.isPreviewMode) {
            styles.tile_div["width"] = "100%";
        }
        return styles;
    },
    componentWillMount: function () {
        var imgStyles = {
            position: "relative",
            width: "100%",
            height: "175px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        };
        if (this.props.thumbnail) {
            imgStyles["backgroundImage"] = "url(" + atob(this.props.thumbnail) + ")";
            this.setState({
                tile: <div style={imgStyles}></div>
            })
        };
    },
    _selectDoc:function(index, event){
        if(['thumbnail'].indexOf(event.target.parentElement.getAttribute("id")) !== -1){
            this.props._selectDoc(index);
        }
    },
    _getMyDocsView : function(){
        var styles = this.getStyles();
        if(this.props.isSelected) {
            styles["tile_label"]["backgroundColor"] = "#4285f4";
            styles["text_field_style"]["color"] = grey200;
            styles["tile_label"]["opacity"] = 0.95;
        }
        else{
            styles["tile_label"]["backgroundColor"] = "rgba(0, 0, 0, 0.87)";
            styles["text_field_style"]["color"] = "black";
        }
        return (
            <Paper>
                <Col md={6} xs={12}>
                    <div style={styles.tile_div} onTouchTap={this._selectDoc.bind(null, this.props.doc_index)}>
                        <Paper
                            id="thumbnail"
                            zDepth={this.props.isSelected?4:0}
                            style={styles.root}
                        >
                            {this.state.tile}
                            <div style={styles.tile_label} id="verticalMenu">
                                <VerticalMenu
                                    openPreview={this.props.openPreview}
                                    doc_index={this.props.doc_index}
                                />
                            </div>
                        </Paper>
                    </div>
                    <div style={styles["meta-data-div"]}>
                        <DocMetaData
                            category={this.props.category}
                            docname={this.props.docname}
                            doc_index={this.props.doc_index}
                            doc_url={this.props.img}
                            updateDocMetaData={this.props.updateDocMetaData}
                            saveMetaData={this.props.saveMetaData}
                        />
                    </div>
                </Col>
            </Paper>
        )
    },
    render: function () {
        return (
          this._getMyDocsView()
        )
    }
});

module.exports = DocTile;
