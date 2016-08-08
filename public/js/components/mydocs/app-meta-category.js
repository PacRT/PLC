/**
 * Created by Hardik on 8/7/16.
 */
var React = require('react');
var TextField = require('material-ui/lib/text-field');
var MetaCategory = require('../../constants/app-meta-catergory-constants');
var DatePicker  = require('material-ui/lib/date-picker/date-picker');
var _ = require('lodash');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item')
var MetaFieldStore = require('../../stores/app-meta-category-store');

var AppMetaCategory = React.createClass({
    getInitialState : function(){
      return {
          category : MetaCategory.hasOwnProperty(this.props.category) ? MetaCategory[this.props.category] : [],
          store : MetaFieldStore.getStore()
      }
    },
    componentDidMount: function() {
        MetaFieldStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        MetaFieldStore.removeChangeListener(this._onChange);
    },
    _onChange : function(){
        this.setState({
            "store" : MetaFieldStore.getStore()
        });
    },
    _handleTextFieldChange : function(key, value, event){
        var store = this.state.store;
        store[key] = event.target.value;
        this.setState({
           "store" : store
        });
    },
    _buildTextField : function(key, value, type){
        return  <TextField
            ref={key}
            type={type}
            defaultValue={this.state.store[key]}
            onChange={this._handleTextFieldChange.bind(null, key, value)}
            floatingLabelText={ key }
        />
    },
    _handleDropDown : function(key, event, index, value){
        var store = this.state.store;
        store[key] = value;
        this.setState({
            "store" : store
        });
    },
    _handleDate : function(key, date, date2){
        var store = this.state.store;
        store[key] = date2+"";
        this.setState({
            "store" : store
        });
    },
    _buildDropDown : function(key, values){
        var drop_menu_style = {
            "marginBottom" : "20px",
            "top" : "-32px"
        };
        return  <SelectField floatingLabelStyle={{"color": "rgba(0, 0, 0, 0.870588)","fontWeight":"500"}}
                 underlineStyle={{"border-color" : "rgba(0, 0, 0, 0.87)"}}
                 iconStyle={{"fill": "rgba(0, 0, 0, 0.870588)"}}
                 onChange={this._handleDropDown.bind(null, key)}
                 value={this.state.store[key]}
                 style={drop_menu_style} floatingLabelText={key}>
                    {
                        values["values"].map(function(value,index) {
                            return <MenuItem key={index+1} value={value} primaryText={value}/>
                        })
                    }
                </SelectField>
    },
    _buildDatePicker: function (key, values) {
        return  <DatePicker onChange={this._handleDate.bind(null,key)} value={this.state.store[key]} hintText={key}/>
    },
    _buildField : function(key, values){
        if(key != "fields")
            if(_.isObject(values)){
                return this._buildDropDown(key, values)
            }
            switch(values){
                case 'text':
                    return this._buildTextField(key,values, 'text');
                    break;
                case 'date':
                    return this._buildDatePicker(key);
                    break;
                case 'email':
                    return this._buildTextField(key,values, 'email');
                    break;
                case 'number':
                    return this._buildTextField(key,values, 'number');
                    break;
            }
    },
    render : function(){
        var metaBody = this.state.category.map(function(metaObject, index){
            var key = Object.keys(metaObject)[0];
            var values = metaObject[key];
            return(
                this._buildField(key, values)
            )
        }.bind(this));
        return(
            <div>
                { metaBody }
            </div>
        )
    }

});

module.exports = AppMetaCategory;