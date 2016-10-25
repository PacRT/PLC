/**
 * Created by Hardik on 3/4/16.
 */
var React = require('react');
var TextField = require('material-ui/TextField').default;
var FlatButton  = require('material-ui/FlatButton').default;
var Edit = require('material-ui/svg-icons/editor/mode-edit').default;
var PopularCategories = require('../uploadzone/app-popular-categories');
var AppDocMetaData = React.createClass({
    getInitialState: function(){
      return {
          hover: false,
          show_button: false
      }
    },
    _saveMetaData : function(){
        this.props.saveMetaData(this.props.doc_index);
        this.setState({
            show_button :  false
        })
    },
    _getStyles: function () {
        return {
            val_div_style: {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize : "15px"
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
                "lineHeight": "30px",
             },
            circularProgressStyle : {
                display: "block",
                margin: "auto",
                "paddingTop": "14%"
            },
            floatingLabelStyle: {
                "zIndex" : 0
            },
            floatingLabelFocusStyle: {
                "zIndex" : 0
            },
            save:{"display":"none"},
            editIcon : {"height":"20px","width":"20px","position" : "relative","top":"35px","fill":"rgba(0, 0, 0, 0.298039)","display":"none"}
        }
    },
    _showEditIcon : function(showIcon){
        this.setState({
            "hover" : showIcon
        })
    },
    _handleSelectBoxChange : function(doc_index,event, index, value){
        this.props.updateDocMetaData(doc_index,value, "category");
        this.setState({
            show_button :  true
        })
    },
    _handleTextFieldChange: function(key, event){
        this.props.updateDocMetaData(this.props.doc_index, event.target.value, "filename");
        this.setState({
            show_button :  true
        });
    },
    render: function () {
        var _this = this;
        var styles = this._getStyles();
        if(this.state.hover){
            styles['editIcon']['display'] = "block";
        }
        if(this.state.show_button){
            styles['save']['display'] = "block";
        }

        return (
            <div key={'metadata_'+this.props.doc_index}>
                <div style={styles.meta_container}>
                    <PopularCategories drop_menu_style={false}
                                       category={this.props.category}
                                       handle={_this._handleSelectBoxChange.bind(null,this.props.doc_index)}/>
                    <Edit style={styles['editIcon']}/>
                </div>
                <div style={styles.meta_container}>
                    <TextField
                        defaultValue={this.props.docname}
                        floatingLabelText={ "Document Name" }
                        onChange={ _this._handleTextFieldChange.bind(null, this.props.doc_url) }
                        style={styles.val_div_style}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        onFocus={_this._showEditIcon.bind(null,true)}
                        onBlur={_this._showEditIcon.bind(null,false)}
                        inputStyle={styles.val_div_style}
                    />
                    <Edit style={styles['editIcon']}/>
                </div>
                <div className="pull-right" style={styles['save']}>
                    <FlatButton
                        label="Save Changes"
                        secondary={true}
                        onTouchTap={this._saveMetaData}
                    />
                </div>
            </div>
        )
    }
});

module.exports = AppDocMetaData;
