/**
 * Created by Hardik on 10/20/16.
 */
var React = require('react');
var Grid = require('react-bootstrap/lib/Grid');
var InviteActions = require('../../actions/app-invite-actions');
var Chip = require('material-ui/Chip').default;
var TextField = require('material-ui/TextField').default;

var ChipCmp = React.createClass({
    getInitialState: function () {
        return {
            "email":"",
            "chipData": []
        }
    },
    componentDidMount: function(){
        document.getElementById("addEmails").addEventListener("keydown",this._handleEnterKey);
    },
    _handleEnterKey: function(){
        switch(event.keyCode){
            case 13:
                this._addEmails();
                break;
        }
    },
    _addEmails: function () {
        var email = this.state.email.toLowerCase();
        var chipData = this.state.chipData;
        var emails = chipData.filter(function (email_tag) {
            return email_tag.label === email
        });
        if (this.validateEmail(email) || !this.props.validateEmail) {
            if (!emails.length) {
                chipData.push({
                    key: new Date().getTime(),
                    label: email.toLowerCase()
                });
                this.setState({
                    chipData: chipData,
                    email: ""
                });
                this.props.updateList(chipData.map(function(data){return data.label}));
            }
        } else {
            InviteActions.enterValidEmailNotification();
        }
    },
    validateEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    handleRequestDelete : function(key){
        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
        this.chipData.splice(chipToDelete, 1);
        this.setState({chipData: this.chipData});
        this.props.updateList(this.chipData.map(function(data){return data.label}));
    },
    styles: {
        chip: {
            margin: 4
        },
        wrapper: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        textField: {
            width: '100%',
            marginTop: '20px'
        }
    },
    renderChip: function (data) {
        return (
            <Chip
                key={data.key}
                onRequestDelete={this.handleRequestDelete.bind(null,data.key)}
                style={this.styles.chip}
            >
                {data.label}
            </Chip>
        );
    },
    updateEmailValue: function(event) {
        this.setState({
            email: event.target.value
        });
    },
    render: function () {
        return (
            <div>
                <div style={this.styles.wrapper}>
                    {this.state.chipData.map(this.renderChip, this)}
                </div>
                <TextField
                    id="addEmails"
                    style={this.styles.textField}
                    value={this.state.email}
                    hintText={this.props.placeholder}
                    onChange={this.updateEmailValue}
                />
            </div>
        );
    }
});

module.exports = ChipCmp;
