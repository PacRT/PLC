/**
 * Created by Hardik on 12/20/15.
 */
var React = require('react');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
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
            "marginBottom" : "20px"
        };

        return (
            <div>
                <SelectField value={this.props.category} onChange={this.props.handle} style={drop_menu_style} floatingLabelText="Categories">
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
