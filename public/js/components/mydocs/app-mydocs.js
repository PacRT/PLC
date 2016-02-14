/**
 * Created by Hardik on 12/22/15.
 */
/** @jsx React.DOM */
var React = require('react');
var MyDocsStore = require('../../stores/app-mydocs-store');
var MyDocsActions = require('../../actions/app-mydocs-actions');
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
        return (
            <div>
                <h1>My Docs</h1>
                <div className="col-xs-6 col-md-12">
                    {
                        this.state.store.docs_link.map(function(url){
                            return(
                                <div key={url} className="col-xs-6 col-md-3">
                                    <a href={url} className="thumbnail">
                                        <img src={url}/>
                                    </a>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        );
    }
});

module.exports = MyDocs;
