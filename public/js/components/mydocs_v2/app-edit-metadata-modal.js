/**
 * Created by Hardik on 3/5/16.
 */
var React = require('react');
var FlatButton  = require('material-ui/FlatButton').default;
var Dialog  = require('material-ui/Dialog').default;
var CircularProgress = require('material-ui/CircularProgress').default;
var TextField = require('material-ui/TextField').default;
var DocPreview = require('./app-doc-preview');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var _ = require('lodash');
var MetaCategory = require('./app-meta-category');

var AppEditMedataModal = React.createClass({
    handleClose: function(){
        this.props.closePreview();
    },
    _handleTextFieldChange:function(index,event){
        var updated_value = event.target.value;
        var store = this.state.store;
        store["_values"][index] = updated_value;
        this.setState({
            store : store
        })
    },
    _getStyles: function () {
        return {
            val_div_style: {
                flex: "1 1 auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            },
            key_div_style: {
                flex: "0 0 100px",
                color: "#000",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            },
            meta_container : {
                "display": "flex",
                "lineHeight": "30px"
            },
            circularProgressStyle : {
                display: "block",
                margin: "auto",
                "paddingTop": "14%"
            }
        }
    },
    render : function(){

        var _this = this;
        var styles = this._getStyles();
        var meta_category = "";
        var  actions = [
            <FlatButton
                label="Close"
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Save"
                disabled={false}
                secondary={true}
                onTouchTap={this.handleClose}
            />
        ];
        var DialogBody = "";
        /*if(_.isEmpty(this.state.store)){
            DialogBody = <CircularProgress style={styles.circularProgressStyle}/>
        }else{
            DialogBody =  this.state.store["_keys"].map(function (key, index) {
                if(key!=='owner.uid' && key!="issuer.uid"){
                  return (
                      <div style={styles.meta_container} key={index}>
                          <TextField
                            ref={key}
                            defaultValue={ _this.state.store["_values"][index] }
                            onChange={_this._handleTextFieldChange.bind(null,index)}
                            floatingLabelText={ key }
                          />
                      </div>
                  )
                }
            });
            meta_category =  <MetaCategory category={this.state.store["_values"][0]}/>
        }*/
        return (
            <Dialog
                contentStyle={{ "maxHeight" :'100%','maxWidth':'none','width':'80%'}}
                title="Edit"
                actions={actions}
                modal={true}
                open={this.props.is_edit_modal_open}>
                    <Row className="show-grid">
                        <Col xs={6} md={8}>
                            <DocPreview doc_url={this.props.doc_url}
                                        hybridView={true}/>
                        </Col>
                        <Col xs={6} md={4}>
                            {DialogBody}
                            {meta_category}
                        </Col>
                    </Row>
            </Dialog>
        )
    }

});

module.exports = AppEditMedataModal;
