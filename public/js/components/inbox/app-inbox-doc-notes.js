/**
 * Created by hmistry on 6/10/16.
 */
/**
 * Created by Hardik on 4/3/16.
 */
var React = require("react");
var InboxActions = require('../../actions/app-inbox-actions');
var InboxThreadCommentStore =  require('../../stores/app-inbox-thread-comment');

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
            "store" : comment_store
        });
        console.info(comment_store);
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
                        <ul  className="list-group">
                            <li className="list-group-item">
				  <span className="circle">
					  <img src="http://bigbeehive.com/demo/orientplay-angular/img/user/vector4.png" alt="user"/>
				  </span>
				  <span className="title">
					  <a href="#">Sandra Adams </a> <time> 6:00 PM</time>
					  	<p><a href="#">Peter Carlsson</a> This is without doubt the greatest flim i’ve ever seen.</p>
				  </span>
                                <ul className="list-inline actions" href="#">
                                    <li><a className="edit" href="#" title="Edit comment">Edit</a></li>
                                    <li className="roff"><a className="delete" href="#" title="Delete comment"></a></li>
                                </ul>
                            </li>
                            {
                                this.state.store.length != 0 ? this.state.store.comments.map(function(comment) {
                                    return (
                                        <li className="list-group-item">
                                            <span className="circle">
                                                <img src="http://bigbeehive.com/demo/orientplay-angular/img/user/vector4.png" alt="user"/>
                                            </span>
                                            <span className="title">
                                                <a href="#">{localStorage.getItem('USER_NAME') }</a> <time>{comment['timeStamp']}</time>
                                                <p>{comment['comment']}</p>
                                            </span>
                                        </li>
                                    )
                                }) : ""
                            }
                        </ul>
                        <form>
                            <fieldset className="form-group">
                                <input type="text"
                                       className="form-control"
                                       id="exampleInputEmail1"
                                       onChange={this.handleChangeInput}
                                       placeholder="Add a comment"/>
                            </fieldset>
                            <button type="button" className="btn btn-sm btn-success" onTouchTap={this.addComment}>Post</button>
                            <button type="button" className="btn btn-sm btn-secondary">Cancel</button>
                        </form>
                    </div>
                </div>
        )
    }
});

module.exports = InboxDocNotes;