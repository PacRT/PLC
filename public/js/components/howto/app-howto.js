/**
 * Created by Hardik on 12/22/15.
 */
'use strict';
var React = require('react');
var UnderConstruction = require('../app-underconstruction')
var HowTo = React.createClass({

    render: function () {
        return (
            <div>
                <h1>How to</h1>
                <UnderConstruction />
            </div>
        );
    }
});

module.exports = HowTo;
