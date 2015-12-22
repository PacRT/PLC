/**
 * Created by Hardik on 12/20/15.
 */
var PopularCategories = React.createClass({
    render: function () {
        return (
            <div>
                <Dropzone onDrop={this.onDrop}>
                    <div style={dropZoneStyle}  >Document Drop Zone</div>
                </Dropzone>
            </div>
        );
    }
});

module.exports = PopularCategories;
