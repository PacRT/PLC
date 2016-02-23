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
                lineHeight: desktopKeylineIncrement+'px',
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
        var imgOrPdf = "";
        var pdfStyle = {
            "width" : "200px",
            "height" : "200px"
        }
        if(this.props.img.indexOf(".pdf") == -1){
            imgOrPdf =  <img style={styles.image} src={this.props.img}/>
        }else{
            imgOrPdf =  <canvas id={this.props.img} />
            var _this = this;
            var oReq = new XMLHttpRequest();
            oReq.open("GET", this.props.img, true);
            oReq.responseType = "arraybuffer";

            oReq.onload = function (oEvent) {
                var arrayBuffer = oReq.response; // Note: not oReq.responseText
                if (arrayBuffer) {
                    var byteArray = new Uint8Array(arrayBuffer);
                    PDFJS.getDocument(byteArray).then(function(pdf) {
                        pdf.getPage(1).then(function(page) {
                            var canvas = document.getElementById(_this.props.img);
                            var desiredWidth = 200;
                            var viewport = page.getViewport(1.50);
                            var scale = desiredWidth / viewport.width;
                            var scaledViewport = page.getViewport(scale);
                            var width = scaledViewport.width;// || this.width / this.height * params.height;
                            var height = scaledViewport.height;// || this.height / this.width * params.width;
                            var context = canvas.getContext('2d')
                            canvas. width = width;
                            canvas.height = height;
                            var renderContext = {
                                canvasContext: context,
                                viewport: scaledViewport
                            };
                            var result = page.render(renderContext);
                            console.log(result);
                        })
                    });
                }
            };
            oReq.send(null);

        };
        var link_style = {
            "cursor" : "pointer"
        };
        return (
            <div>
                <a style={link_style} href={this.props.img} target="_blank">
                    <Paper
                        zDepth={this.state.zDepth}
                        onMouseEnter={this._onMouseEnter}
                        onMouseLeave={this._onMouseLeave}
                        style={Object.assign(
                styles.root,
                this.props.lastChild && styles.rootWhenLastChild)}
                    >
                        {imgOrPdf}
                        <div>
                            <input disabled value={this.props.heading} style={styles.text_field_style}/>
                        </div>
                    </Paper>
                </a>
            </div>
        )
    }
});

module.exports = DocTile;