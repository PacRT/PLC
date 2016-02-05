/**
 * Created by Hardik on 12/22/15.
 */
/** @jsx React.DOM */
var React = require('react');
var UnderConstruction = require('../app-underconstruction')
var API_URL = require('../../utils/getAPIURL');

var MyDocs = React.createClass({
    getInitialState: function(){
        var partial_url = "/docs/localhost/8080/7,296a791ac7.pdf";
        var docurl = API_URL.get(partial_url);
        console.log(docurl);
        return {
            docurl : docurl
        }
    },
    render: function () {
        return (
            <div>
                <h1>My Docs</h1>
                <div className="col-xs-6 col-md-3">
                    <a href={this.state.docurl} className="thumbnail">
                        <img src={this.state.docurl}/>
                    </a>
                </div>

               <UnderConstruction />
            </div>
        );
    }
});

module.exports = MyDocs;
