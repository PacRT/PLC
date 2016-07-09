/**
 * Created by hmistry on 6/10/16.
 */
/**
 * Created by Hardik on 4/3/16.
 */
var React = require("react");
var InboxActions = require('../../actions/app-inbox-actions');
var InboxThreadCommentStore =  require('../../stores/app-inbox-thread-comment-store');
var TextField = require('material-ui/lib/text-field');
var FlatButton  = require('material-ui/lib/flat-button');

var InboxDocNotes = React.createClass({
    getInitialState : function(){
        return {
            store: [],
            comment : ""
        }
    },
    componentDidMount: function() {
        InboxActions.getComment(this.props.doc_url, this.props.thread_id, this.props.pkg_id);
        InboxThreadCommentStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        InboxThreadCommentStore.resetStore();
        InboxThreadCommentStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        var comment_store = InboxThreadCommentStore.getStore();
        this.setState({
            "store" : comment_store,
            "comment" : ""
        });
    },
    handleChangeInput : function(event){
        this.setState({
           comment : event.target.value
        });
    },
    addComment : function(){
      InboxActions.addComment(this.props.thread_id, this.props.pkg_id, this.props.doc_url, this.state.comment);
    },
    render : function(){
        var _this = this;
        return (

                <div>
                    <div className="card">
                        <ul  className="list-group" style={{"overflowY": "scroll","maxHeight":"300px",'minHeight':"300px"}}>
                            {
                                _.has(this.state.store,"comments") ? this.state.store.comments.map(function(comment) {
                                    return (
                                        <li className="list-group-item" key={comment['date_added']}>
                                            <span className="circle">
                                                <img src="http://bigbeehive.com/demo/orientplay-angular/img/user/vector4.png" alt="user"/>
                                            </span>
                                            <span className="title">
                                                <a href="#">{localStorage.getItem('USER_NAME') }</a> <time>{comment['date_added']}</time>
                                                <p>{comment['comment']}</p>
                                            </span>
                                        </li>
                                    )
                                }) : ""
                            }
                        </ul>


                                <TextField
                                    style={{"display": "block"}}
                                    onChange={this.handleChangeInput}
                                    floatingLabelText="Post a comment"
                                    value={this.state.comment}/>
                        <div className="pull-right">
                            <FlatButton
                                label="Post"
                                secondary={true}
                                onTouchTap={this.addComment}
                            />
                        </div>


                    </div>
                </div>
        )
    }
});

module.exports = InboxDocNotes;