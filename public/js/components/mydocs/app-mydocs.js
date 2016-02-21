/**
 * Created by Hardik on 12/22/15.
 */
/** @jsx React.DOM */
var React = require('react');
var MyDocsStore = require('../../stores/app-mydocs-store');
var MyDocsActions = require('../../actions/app-mydocs-actions');
var SearchBarApp = require('./app-searchbar');
var DocTile = require('./app-doc-tile');
var MyDocs = React.createClass({
    getInitialState: function(){
        return {
            "store" : MyDocsStore.getDocStore()
        }
    },
    componentDidMount: function() {
        MyDocsActions.getMyDocs(this.state.store.cursor);
        MyDocsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        MyDocsStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        var doc_store = MyDocsStore.getDocStore();
        this.setState({
            store : doc_store
        });
    },
    render: function () {
        console.log(this.state.store.docs_link);
        var _this = this;
        return (
            <div>
                <SearchBarApp/>

                    {
                        this.state.store.docs_link.map(function(url,index){
                            return(
                                <DocTile
                                    heading={_this.state.store.files_name[index]}
                                    img={url}
                                    firstChild={true}
                                />
                            )
                        })
                    }
            </div>
        );
    }
});

module.exports = MyDocs;
