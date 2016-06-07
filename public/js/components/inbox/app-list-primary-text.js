/**
 * Created by hmistry on 6/5/16.
 */
var React = require("react");
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var ActionGrade = require('material-ui/lib/svg-icons/action/grade');
var ContentInbox = require('material-ui/lib/svg-icons/content/inbox');
var ContentDrafts = require('material-ui/lib/svg-icons/content/drafts');
var ContentSend = require('material-ui/lib/svg-icons/content/send');
var ThreadUnread = require('material-ui/lib/svg-icons/communication/email');
var ThreadRead = require('material-ui/lib/svg-icons/communication/mail-outline');
var Colors = require('material-ui/lib/styles/colors');
var Badge = require('material-ui/lib/badge');
var Divider = require('material-ui/lib/divider');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Checkbox = require('material-ui/lib/checkbox');

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