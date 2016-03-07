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
var EditMetaDataActions = require('../../actions/app-metadata-actions');

var TileActionsMenu = React.createClass({
    _openPreview : function(){
        TileActions.openPreview({url:this.props.doc_url,title:this.props.title})
    },
    _openEditModal : function(meta_keys,meta_values){
        EditMetaDataActions.openEditMetaDataModal(meta_keys, meta_values);
    },
    render: function(){
        var style = {
            menu: {
                marginRight: 32,
                marginBottom: 32,
                float: 'left',
                position: 'relative',
                zIndex: 0,
            },
            rightIcon: {
                textAlign: 'center',
                lineHeight: '24px',
            }
        };
        var meta_keys = this.props.meta_keys
        var meta_values = this.props.meta_values
        return(
            <IconMenu
                iconButtonElement={<IconButton iconStyle={{'width':'20px', 'height' : '15px'}}><MoreVertIcon/></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}>

                <MenuItem primaryText="Preview" onTouchTap={this._openPreview} leftIcon={<RemoveRedEye/>} />
                <MenuItem onTouchTap={this._openEditModal.bind(null,meta_keys,meta_values)} leftIcon={<Edit/>} primaryText="Edit" />
                <MenuItem leftIcon={<Delete/>} primaryText="Delete" />

            </IconMenu>
        )

    }
});

module.exports = TileActionsMenu;