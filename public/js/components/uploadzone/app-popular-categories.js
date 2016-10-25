/**
 * Created by Hardik on 12/20/15.
 */
var React = require('react');
var SelectField = require('material-ui').SelectField;
var MenuItem = require('material-ui').MenuItem;
var categories = require('../../constants/app-upload-categories-constants');

var PopularCategories = React.createClass({
    getInitialState:function(){
        return {
            "categories" : categories
        }
    },
    getMenuItems :function(){
        var menuItems = categories.map(function(key) {
            return <MenuItem primaryText={key}/>
        });
        return menuItems;
    },
    render: function () {
        var drop_menu_style = {
            "marginBottom" : "20px",
            "top" : "-32px"
        };
        /**
         * to Disable Style on Doc Meta Data Style
         */
        if(this.props.hasOwnProperty("drop_menu_style") && !this.props["drop_menu_style"] ){
            drop_menu_style = {};
        }
        return (
            <div>
                <SelectField floatingLabelStyle={{"color": "rgba(0, 0, 0, 0.870588)","fontWeight":"500", "zIndex" : 0}}
                             underlineStyle={{"borderColor" : "rgba(0, 0, 0, 0.87)"}}
                             iconStyle={{"fill": "rgba(0, 0, 0, 0.870588)"}}
                             value={this.props.category} onChange={this.props.handle}
                             style={drop_menu_style} floatingLabelText="Categories">
                    {
                        this.state.categories.map(function(key,index) {
                            return <MenuItem key={index+1} value={key} primaryText={key}/>
                        })
                    }
                </SelectField>
            </div>
        );
    }
});

module.exports = PopularCategories;
