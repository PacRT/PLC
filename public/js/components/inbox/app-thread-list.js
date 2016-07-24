var React = require("react");
var List = require('material-ui/lib/lists/list');
var Jumbotron = require('react-bootstrap').Jumbotron;

var Thread = require('./app-thread');
var AppThreadList = React.createClass({
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
    _getStyles : function(){
      return {
          "list" : {
              "paddingBottom" : "0px"
          }
      }
    },
    render : function(){
        var _this = this;
        var styles = this._getStyles();
        return (
            <div>
                    {
                        this.props.threads.length ?
                            <List style={styles["list"]}>
                            {
                                this.props.threads.map(function(thread,index){
                                    return (<Thread markThreadRead={_this.props.markThreadRead}
                                                key={thread.thread_id}
                                                thread_index={index}
                                                thread={thread}
                                                previewFile={_this.props.previewFile}
                                        />)
                                })
                            }</List> : <Jumbotron style={{"backgroundColor":"#ffffff"}}>
                            <center>
                                <h3>
                                    There are no Threads in Inbox.
                                </h3>
                            </center>

                        </Jumbotron>
                    }
            </div>
        )
    }
});

module.exports = AppThreadList;