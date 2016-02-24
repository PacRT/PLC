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
var PureMixin = require('react-pure-render/mixin');
var Col = require('react-bootstrap/lib/Col');

var DocTile = React.createClass({
    getStyles: function() {
        var desktopKeylineIncrement = Spacing.desktopKeylineIncrement;
        var styles = {
            root: {
                transition: Transitions.easeOut,
                margin: '15px 15px 15px 0px',
                maxHeight : '175px',
                width: '100%'
            },
            rootWhenMedium: {
                float: 'left',
                width: '100%',
                margin :"15px 15px 15px 0px"
            },
            image: {
                //Not sure why this is needed but it fixes a display
                //issue in chrome
                marginBottom: -6,
                display: "table-cell",
                maxWidth:"auto",
                maxHeight:"175px",
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
        return styles;
    },

    render : function(){
        var styles = this.getStyles();
        var imgOrPdf = "";
        var imgStyles = {
            position: "relative",
            width:  "100%",
            height: "128px",
            backgroundRepeat:   "no-repeat",
            backgroundSize:     "cover"
        }
        var encoded_id = encodeURIComponent(this.props.img);
        if(this.props.img.indexOf(".pdf") == -1){
            imgStyles["backgroundImage"] = "url("+this.props.img+")";
            imgOrPdf =  <div style={imgStyles} ></div>
        }else{
            imgOrPdf = <canvas className="img-responsive" id={encoded_id} />
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
                            var canvas = document.getElementById(encoded_id);
                            var desiredHeight = 400;
                            var viewport = page.getViewport(1);
                            var scale = desiredHeight / viewport.height;
                            var scaledViewport = page.getViewport(scale);
                            var context = canvas.getContext('2d')
                            var renderContext = {
                                canvasContext: context,
                                viewport:scaledViewport
                            };
                            page.render(renderContext);

                            function convertCanvasToImage(canvas1) {
                                var image = new Image();
                                image.src = canvas1.toDataURL("image/png");
                                return image;
                            }
                        })
                    });
                }
            };
            oReq.send(null);

        };
        var link_style = {
            "cursor" : "pointer",
            float : "left"
        };
        return (
            <div>

                <Col md={3} xs={6}>
                    <Paper
                        onTouchTap={this.props.selectThisTile.bind(this,this.props.tile_index)}
                        zDepth={this.props.isSelected?3:0}
                        style={styles.root}
                    >
                        {imgOrPdf}
                        <div>
                            <input disabled value={this.props.heading} style={styles.text_field_style}/>
                        </div>
                    </Paper>
                </Col>
            </div>
        )
    }
});

module.exports = DocTile;