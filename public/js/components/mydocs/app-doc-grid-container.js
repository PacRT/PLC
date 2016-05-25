/**
 * Created by Hardik on 2/23/16.
 */
var React = require('react');
var MyDocsActions = require('../../actions/app-mydocs-actions');
var DocGridContainer = React.createClass({
    getInitialState : function(){
        return {
            "selected_tiles" : []
        }
    },
    _selectThisTile: function(index) {
        var selected_tiles = this.state.selected_tiles;
        if(selected_tiles.indexOf(index) == -1)
            selected_tiles.push(index);
        else
            selected_tiles.splice(selected_tiles.indexOf(index),1)
        this.setState({
            selected_tiles :selected_tiles
        });
        MyDocsActions.updateDocSelection(selected_tiles);
    },
    render: function() {
        var _this = this;
        var childrenWithProps = React.Children.map(this.props.children,function(child,index) {
            var isSelected = _this.state.selected_tiles.indexOf(index) != -1 ? true : false;
            return React.cloneElement(child, {
                selectThisTile: _this._selectThisTile, "isSelected" : isSelected
            });
        });

        return <div>{childrenWithProps}</div>
    }
});

module.exports  = DocGridContainer
