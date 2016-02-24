/**
 * Created by Hardik on 2/23/16.
 */
var React = require('react');

var DocGridContainer = React.createClass({
    getInitialState : function(){
        return {
            tile_index : -1
        }
    },
    _selectThisTile: function(index) {
        this.setState({
            tile_index : index
        });
    },
    render: function() {
        var _this = this;
        var childrenWithProps = React.Children.map(this.props.children,function(child,index) {
            return React.cloneElement(child, {
                selectThisTile: _this._selectThisTile, "isSelected" : _this.state.tile_index == index
            });
        });

        return <div>{childrenWithProps}</div>
    }
});

module.exports  = DocGridContainer