/**
 * Created by hmistry on 6/10/16.
 */
/**
 * Created by Hardik on 4/3/16.
 */
var React = require("react");
var InboxDocNotes = React.createClass({
    getInitialState : function(){
        return {

        }
    },
    componentDidMount: function() {

    },
    componentWillUnmount: function() {
    },
    _onChange: function() {
    },
    render : function(){
        return (

                <div>
                    <div className="card paper">
                        <details>
                            <summary style={{padding:"1em"}}>3 comments</summary>
                            <ul id="lastComment" className="list-group">
                                <li className="list-group-item ">
						  <span className="circle">
							  <img src="http://bigbeehive.com/demo/orientplay-angular/img/user/vector4.png" alt="user"/>
						  </span>
						  <span className="title">
							  <a href="#">Abbey Christensen</a> <time> 5:09 PM</time>
								<p>Can’t wait to see this movie.</p>
						  </span>
                                    <ul className="actions" href="#">
                                        <li><a className="reply" href="#">Reply</a></li>
                                    </ul>
                                </li>
                                <li className="list-group-item">
					  <span className="circle">
						  <img src="http://bigbeehive.com/demo/orientplay-angular/img/user/vector2.png" alt="user"/>
					  </span>
					  <span className="title">
						  <a href="#">Ali Connors</a> <time> 5:15 PM</time>
							<p>Mee too.</p>
					  </span>
                                    <ul className="actions" href="#">
                                        <li><a className="reply" href="#">Reply</a></li>
                                    </ul>
                                </li>
                                <li className="list-group-item">
					  <span className="circle">
						  <img src="http://bigbeehive.com/demo/orientplay-angular/img/user/vector3.png" alt="user"/>
					  </span>
					  <span className="title">
						  <a href="#">Peter Carlsson</a> <time> 5:30 PM</time>
							<p><a href="#">Abbey Christensen</a> I thought it was a good movie. The slow motion was a tad excessive at times, but overall it was good! I'm love it ;) </p>
					  </span>
                                    <ul className="actions" href="#">
                                        <li><a className="reply" href="#">Reply</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </details>
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
                        </ul>
                        <form>
                            <fieldset className="form-group">
                                <input type="text"
                                       className="form-control"
                                       id="exampleInputEmail1"
                                       placeholder="Add a comment"/>
                            </fieldset>
                            <button type="button" className="btn btn-sm btn-success">Post</button>
                            <button type="button" className="btn btn-sm btn-secondary">Cancel</button>
                        </form>
                    </div>
                </div>
        )
    }
});

module.exports = InboxDocNotes;