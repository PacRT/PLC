/**
 * Created by Hardik on 2/26/16.
 */
var React = require('react');
var IconMenu = require('material-ui/lib/menus/icon-menu');
var MenuItem = require('material-ui/lib/menus/menu-item');
var IconButton = require('material-ui/lib/icon-button');
var MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
var SvgIcon =  require('material-ui/lib/svg-icon');
var Colors = require('material-ui/lib/styles/colors');
var FontIcon = require('material-ui/lib/font-icon');
var RemoveRedEye = require('material-ui/lib/svg-icons/image/remove-red-eye');
var Edit = require('material-ui/lib/svg-icons/editor/mode-edit');

var Delete = require('material-ui/lib/svg-icons/action/delete');
var Menu = require('material-ui/lib/menus/menu');

var ContentCopy = require('material-ui/lib/svg-icons/content/content-copy');
var ContentLink = require('material-ui/lib/svg-icons/content/link');
var Delete = require('material-ui/lib/svg-icons/action/delete');
var Download = require('material-ui/lib/svg-icons/file/file-download');
var PersonAdd = require('material-ui/lib/svg-icons/social/person-add');
var RemoveRedEye = require('material-ui/lib/svg-icons/image/remove-red-eye');
var TileActions = require('../../actions/app-doc-tile-actions');

var TileActionsMenu = React.createClass({
    _openPreview : function(){
        TileActions.openPreview({url:this.props.doc_url,title:this.props.title})
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
        var iconStyles = {
            marginRight: "200px"
        };
        var menuStyle = {

        };
        return(
            <IconMenu
                iconButtonElement={<IconButton iconStyle={{'width':'20px', 'height' : '15px'}}><MoreVertIcon/></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}>

                <MenuItem primaryText="Preview" onTouchTap={this._openPreview} leftIcon={<RemoveRedEye/>} />
                <MenuItem leftIcon={<Edit/>} primaryText="Edit" />
                <MenuItem leftIcon={<Delete/>} primaryText="Delete" />

            </IconMenu>
        )

    }
});

module.exports = TileActionsMenu;