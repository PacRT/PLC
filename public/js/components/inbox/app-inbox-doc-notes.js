/**
 * Created by hmistry on 6/10/16.
 */
/**
 * Created by Hardik on 4/3/16.
 */
var React = require("react");
var InboxActions = require('../../actions/app-inbox-actions');
var InboxThreadCommentStore =  require('../../stores/app-inbox-thread-comment-store');

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
                    <div className="card paper">
                        <ul  className="list-group" style={{"overflowY": "scroll","maxHeight":"400px"}}>
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

                            <fieldset className="form-group">
                                <input type="text"
                                       className="form-control"
                                       id="exampleInputEmail1"
                                       onChange={this.handleChangeInput}
                                       placeholder="Add a comment"
                                        value={this.state.comment}/>
                            </fieldset>
                            <button type="button" className="btn btn-sm btn-success" onTouchTap={this.addComment}>Post</button>
                            <button type="button" className="btn btn-sm btn-secondary">Cancel</button>

                    </div>
                </div>
        )
    }
});

module.exports = InboxDocNotes;