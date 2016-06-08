/**
 * Created by Hardik on 2/26/16.
 */
var React = require('react');
var IconMenu = require('material-ui/lib/menus/icon-menu');
var MenuItem = require('material-ui/lib/menus/menu-item');
var IconButton = require('material-ui/lib/icon-button');
var MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
var Edit = require('material-ui/lib/svg-icons/editor/mode-edit');
var Delete = require('material-ui/lib/svg-icons/action/delete');
var RemoveRedEye = require('material-ui/lib/svg-icons/image/remove-red-eye');
var TileActions = require('../../actions/app-doc-tile-actions');
var MetaDataActions = require('../../actions/app-metadata-actions');
var DocMetaDataStore = require('../../stores/app-metadata-store');

var TileActionsMenu = React.createClass({
    _openPreview : function(){
        var hybrid = false;
        TileActions.openPreview({url:this.props.doc_url,title:this.props.title},hybrid)
    },
    _openEditModal : function(doc_url){
        var hybrid = true;
        TileActions.openPreview({url:this.props.doc_url,title:this.props.title},hybrid)
        MetaDataActions.openEditMetaDataModal(doc_url, DocMetaDataStore.getStore()[doc_url]);
    },
    render: function(){
        var style = {
            menu: {
                marginRight: 32,
                marginBottom: 32,
                float: 'left',
                position: 'relative',
                zIndex: 0
            },
            rightIcon: {
                textAlign: 'center',
                lineHeight: '24px'
            },
            iconStyle: {}
        };
        if(this.props.isPreviewMode) {
            style["iconStyle"]["visibility"] = "hidden";
        }
        return(
            <div>
                <IconButton onTouchTap={this._openPreview} style={{"float":"right"}}  tooltip="Preview" tooltipPosition="bottom-center"  iconStyle={{"fill" : "#ffffff"}}>
                    <RemoveRedEye />
                </IconButton>
                <IconButton onTouchTap={this._openEditModal.bind(null,this.props.doc_url)} style={{"float":"right"}} tooltip="Edit" tooltipPosition="bottom-center" iconStyle={{"fill" : "#ffffff"}}>
                    <Edit/>
                </IconButton>
                {/* <IconMenu
                    style={style.iconStyle}
                    iconButtonElement={<IconButton iconStyle={{'width':'20px', 'height' : '15px'}}><MoreVertIcon/></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                    <MenuItem primaryText="Preview" onTouchTap={this._openPreview} leftIcon={<RemoveRedEye/>} />
                    <MenuItem disabled={this.props.view == "INBOX"} onTouchTap={this._openEditModal.bind(null,this.props.doc_url)} leftIcon={<Edit/>} primaryText="Edit" />
                    <MenuItem disabled={this.props.view == "INBOX"} leftIcon={<Delete/>} primaryText="Delete" />
                </IconMenu>*/}
            </div>
        )

    }
});

module.exports = TileActionsMenu;
