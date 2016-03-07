/**
 * Created by Hardik on 3/4/16.
 */
var React = require('React');
var CircularProgress =  require('material-ui/lib/circular-progress');
var MetaDataActions = require('../../actions/app-metadata-actions');
var MetaDataStore = require('../../stores/app-metadata-store');

var AppDocMetaData = React.createClass({
    getInitialState: function(){
        return {
            store : MetaDataStore.getStore()
        }
    },
    componentDidMount : function(){
        MetaDataStore.addChangeListener(this._onChange);
        MetaDataActions.getDocMetaData(this.props.doc_url);
    },
    componentWillUnmount : function() {
        MetaDataStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState({
            store : MetaDataStore.getStore()
        });
    },
    render: function () {
        var list_style = {
            "fontSize": "14px",
            "lineHeight": "5px",
            "paddingBottom": "0px"
        };
        var _this = this;
        var meta_keys = this.props.meta_keys
        var meta_values = this.props.meta_values
        var val_div_style = {
            flex: "1 1 auto",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace  : "nowrap"

        }
        var key_div_style = {
            flex: "0 0 100px",
            color: "#000",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace  : "nowrap"
        }
        var meta_container = {
            "display" : "flex",
            "lineHeight" : "30px"
        }
        var circularProgressStyle = {
            display : "block",
            margin : "auto",
            "paddingTop" : "14%"
        }
        var MetaDataJSX = "";
        if(_.isEmpty(this.state.store)){
            MetaDataJSX = <CircularProgress style={circularProgressStyle}/>
        }else if(!_.isUndefined(this.state.store[this.props.doc_url]) && this.state.store[this.props.doc_url]["_keys"].length){
            MetaDataJSX = this.state.store[this.props.doc_url]["_keys"].map(function(key,index){
                return(
                    <div style={meta_container} key={index} >
                        <div style={key_div_style}>
                            { key }
                        </div>
                        <div style={val_div_style}>
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