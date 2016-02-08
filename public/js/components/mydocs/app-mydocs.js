/**
 * Created by Hardik on 12/22/15.
 */
/** @jsx React.DOM */
var React = require('react');
var UnderConstruction = require('../app-underconstruction')
var API_URL = require('../../utils/getAPIURL');
var MyDocsStore = require('../../stores/app-mydocs-store');
var MyDocsActions = require('../../actions/app-mydocs-actions');
var MyDocs = React.createClass({
    getInitialState: function(){
        return {
            "docs_url" : []
        }
    },
    componentDidMount: function() {
        MyDocsActions.getMyDocs();
        MyDocsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        MyDocsStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        var docs_url = MyDocsStore.getDocsURL();
        this.setState({
            docs_url : docs_url
        });
    },
    render: function () {
        return (
            <div>
                <h1>My Docs</h1>
                <div className="col-xs-6 col-md-12">
                    {
                        this.state.docs_url.map(function(url){
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
