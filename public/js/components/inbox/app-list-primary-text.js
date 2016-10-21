/**
 * Created by hmistry on 6/5/16.
 */
var React = require("react");
var Colors = require('material-ui//styles/colors');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var AppPrimaryText = React.createClass({
    getInitialState : function(){
        return {
            "key" : Math.random()
        }
    },
    componentDidMount:function(){
        this.setState({
            "key" : Math.random()
        });
    },
    render : function(){
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={4}>{this.props.sender}</Col>
                    <Col xs={6} md={4}> <span style={{color: Colors.lightBlack}}>{this.props.thread_name}</span></Col>
                    <Col xsHidden md={4}> <span style={{color: Colors.lightBlack}}>{this.props.date_updated}</span></Col>
                </Row>
            </Grid>
        )
    }
});

module.exports = AppPrimaryText;