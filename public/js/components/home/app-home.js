/** @jsx React.DOM */
var React = require('react');
var Jumbotron  = require('react-bootstrap/lib/Jumbotron');
var RaisedButton = require('material-ui/lib/raised-button');
var HomePage = React.createClass({
    render: function () {
        return (
            <div>
                <Jumbotron>
                    <h1>Welcome to <i>PaperLess Club</i></h1>
                    <p>Say Bye Bye to Paper!</p>
                   <RaisedButton  label="Learn More"  secondary={true}/>
                </Jumbotron>
            </div>
        );
    }
});

module.exports = HomePage;
