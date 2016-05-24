/**
 * Created by Hardik on 12/22/15.
 */
/** @jsx React.DOM */
var React = require('react');
var RaisedButton = require('material-ui/RaisedButton');
var TextField = require('material-ui/TextField/TextField');
var Divider = require('material-ui/Divider/Divider');
var Badge = require('material-ui/Badge/Badge');
var IconButton = require('material-ui/IconButton/IconButton');
var NotificationsIcon = require('material-ui/svg-icons/social/notifications');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');


var Invite = React.createClass({

    render: function () {
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={5} mdOffset={4}>
                           <h4>
                               Invite People You Know
                               <IconButton tooltip="Invitations Left" tooltipPosition="bottom-right">
                                   <Badge
                                       badgeContent={5}
                                       secondary={true}
                                       badgeStyle={{top: 12, right: 12, left:25}}>

                                   </Badge>
                               </IconButton>
                           </h4>
                            <Divider />
                         </Col>
                        <Col xs={12} md={5} mdOffset={4}>

                            <TextField
                                style={{"display": "block"}}
                                hintText="Required Off Course :)"
                                floatingLabelText="Email" />

                            <TextField
                                style={{"display": "block"}}
                                hintText="Highly Encouraged"
                                floatingLabelText="Name" />
                            <br/>
                            <RaisedButton label="Invite"  style={{"marginRight": "10px"}} />
                            <RaisedButton label="Invite More" />
                        </Col>


                    </Row>
                </Grid>

            </div>
        );
    }
});

module.exports = Invite;
