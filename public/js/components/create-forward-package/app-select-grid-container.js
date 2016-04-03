var React = require('react');
var CreateForwardPkgActions = require('../../actions/app-create-forward-package-actions');

var SelectGridContainer = React.createClass({
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
        CreateForwardPkgActions.updateSelectedTile(selected_tiles);
    },
    render: function() {
        var _this = this;
        var childrenWithProps = React.Children.map(this.props.children,function(child,index) {
            var isSelected = _this.state.selected_tiles.indexOf(index) != -1 ? true : false;
            console.log(_this.state.selected_tiles,index)
            return React.cloneElement(child, {
                selectThisTile: _this._selectThisTile, "isSelected" : isSelected
            });
        });

        return <div>{childrenWithProps}</div>
    }
});

module.exports  = SelectGridContainer