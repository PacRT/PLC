/**
 * Created by Hardik on 4/3/16.
 */
var React = require("react");
var InboxActions = require('../../actions/app-inbox-actions');
var InboxStore = require('../../stores/app-inbox-store');
var AppThreadList = require('../inbox/app-thread-list');
var AppInboxPreviewFile = require('../inbox/app-inbox-preview-file');
var AppInbox = React.createClass({
    getInitialState : function(){
        return {
            "key" : Math.random(),
            "store" : []
        }
    },
    componentDidMount: function() {
        InboxActions.getSentItems();
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
        var package_id = this.state.store[thread_index]["packages"][pkg_index]["package_id"];
        var thread_id = this.state.store[thread_index]["thread_id"];
        InboxActions.openPreview(file_url, file_name, true, package_id, thread_id);
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