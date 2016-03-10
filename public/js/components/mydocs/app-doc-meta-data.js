/**
 * Created by Hardik on 3/4/16.
 */
var React = require('React');
var CircularProgress = require('material-ui/lib/circular-progress');
var MetaDataActions = require('../../actions/app-metadata-actions');
var MetaDataStore = require('../../stores/app-metadata-store');

var AppDocMetaData = React.createClass({
    getInitialState: function () {
        return {
            store: MetaDataStore.getStore()
        }
    },
    componentDidMount: function () {
        MetaDataStore.addChangeListener(this._onChange);
        MetaDataActions.getDocMetaData(this.props.doc_url);
    },
    componentWillUnmount: function () {
        MetaDataStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        this.setState({
            store: MetaDataStore.getStore()
        });
    },
    _getStyles: function () {
        return {
            val_div_style: {
                flex: "1 1 auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"

            },
            key_div_style: {
                flex: "0 0 100px",
                color: "#000",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            },
            meta_container : {
                "display": "flex",
                "lineHeight": "30px"
             },
            circularProgressStyle : {
                display: "block",
                margin: "auto",
                "paddingTop": "14%"
            }
        }
    },
    render: function () {

        var _this = this;
        var styles = this._getStyles();
        var MetaDataJSX = "";
        if (_.isEmpty(this.state.store[this.props.doc_url])) {
            console.log("circular")
            MetaDataJSX = <CircularProgress style={styles.circularProgressStyle}/>
        } else if (!_.isUndefined(this.state.store[this.props.doc_url]) && this.state.store[this.props.doc_url]["_keys"].length) {
            MetaDataJSX = this.state.store[this.props.doc_url]["_keys"].map(function (key, index) {
                return (
                    <div style={styles.meta_container} key={index}>
                        <div style={styles.key_div_style}>
                            { key }
                        </div>
                        <div style={styles.val_div_style}>
                            { _this.state.store[_this.props.doc_url]["_values"][index] }
                        </div>
                    </div>
                )

            });
        }
        return (
            <div>
                {MetaDataJSX}
            </div>
        )

    }
});

module.exports = AppDocMetaData;