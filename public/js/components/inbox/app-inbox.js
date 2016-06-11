/**
 * Created by Hardik on 4/3/16.
 */
var React = require("react");
var InboxActions = require('../../actions/app-inbox-actions');
var InboxStore = require('../../stores/app-inbox-store');
var AppThreadList = require('./app-thread-list');
var AppInboxPreviewFile = require('./app-inbox-preview-file');
var AppInbox = React.createClass({
    getInitialState : function(){
      return {
          "key" : Math.random(),
          "store" : []
      }
    },
    componentDidMount: function() {
        InboxActions.getThreads();
        InboxStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        InboxStore.resetStore();
        InboxStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        var inbox_store = InboxStore.getStore();
        this.setState({
            store : inbox_store
        });
    },
    _markThreadRead : function(threadIndex){
        InboxActions.markThreadRead(threadIndex,this.state.store[threadIndex]["thread_id"]);
    },
    _previewFile : function(file_url,file_name,thread_index, pkg_index, doc_index){
        InboxActions.openPreview(file_url, file_name,true);
    },
    render : function(){
        return (
            <div>
                <AppThreadList threads={this.state.store}
                               markThreadRead={this._markThreadRead}
                               previewFile={this._previewFile}
                />
                <AppInboxPreviewFile/>
            </div>
        )
    }
});

module.exports = AppInbox;