/**
 * Created by Hardik on 12/22/15.
 */
/** @jsx React.DOM */
var React = require('react');
var UnderConstruction = require('../app-underconstruction')

var MyDocs = React.createClass({

    render: function () {
        return (
            <div>

                <h1>My Docs</h1>
               <UnderConstruction />
            </div>
        );
    }
});

module.exports = MyDocs;
