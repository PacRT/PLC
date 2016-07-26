var React = require("react");
var ListItem = require('material-ui/lib/lists/list-item');
var ThreadUnread = require('material-ui/lib/svg-icons/communication/email');
var ThreadRead = require('material-ui/lib/svg-icons/communication/mail-outline');
var Divider = require('material-ui/lib/divider');
var AppPrimaryText = require('./app-list-primary-text');
var _ = require('lodash');

var AppThread = React.createClass({
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
    getStyles : function(){
      return {
          "doc_item" : {
              "paddingBottom" : "10px",
              "paddingRight" : "0px",
              "paddingTop" : "10px"
          }
      }
    },
    _previewFile : function(url, file_name, thread_index, pkg_index, doc_index){
       this.props.previewFile(url, file_name ,thread_index, pkg_index, doc_index);
    },
    _getDocList : function (package_1, thread_index, pkg_index) {
        var docList = [];
        var doc_item_style = this.getStyles()["doc_item"];
        for(var i=0; i < package_1.docs.length; i++){
            var doc_index = i;
            var doc = package_1.docs[i];
            var docItem = <ListItem insetChildren={true}
                            key={doc.docs_link}
                            innerDivStyle={doc_item_style}
                            primaryText={<p> {doc.file_name} </p>}
                            onTouchTap={this._previewFile.bind(null,doc.docs_link,doc.file_name,thread_index, pkg_index, doc_index)}
                          />
            docList.push(docItem);
        }
        return docList;
    },
    _getNestedThread : function(){
        var nested_list = [];
        var thread_index = this.props.thread_index;
        var doc_item_style = this.getStyles()["doc_item"];
        for(var i=0; i < this.props.thread.packages.length; i++){
            var pkg_index = i;
            var pkg = this.props.thread.packages[i];
            var docList = this._getDocList(pkg,thread_index, pkg_index);
            var listItem = <ListItem
                key={pkg.package_id}
                innerDivStyle={{"marginLeft":"72px"}}
                primaryTogglesNestedList={true}
                nestedItems={docList}
                nestedListStyle={doc_item_style}
                primaryText={<AppPrimaryText sender={pkg.package_name} thread_name={""} date_updated={pkg.date_updated} />}
            />;
            nested_list.push(listItem);
        }

        return nested_list;
    },
    _markThreadRead : function(index){
        if(!this.props.thread["isRead"])
            this.props.markThreadRead(index);
    },
    render : function(){
        var nested_list = this._getNestedThread();
        var thread = this.props.thread;
        var ThreadIcon="";
        if(thread['is_read']){
            ThreadIcon = <ThreadRead/>;
        }else{
            ThreadIcon = <ThreadUnread style={{"fill":"rgb(66, 133, 244)"}} />;
        }
        return (
            <div>
                <ListItem
                    onClick={this._markThreadRead.bind(null,this.props.thread_index)}
                    onTouchTap={this._markThreadRead.bind(null,this.props.thread_index)}
                    key={thread.thread_id}
                    leftIcon={ThreadIcon}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    primaryText={ <AppPrimaryText sender={_.has(thread,"receiver") ? thread.receiver : thread.sender }  thread_name={thread.thread_name} date_updated={thread.date_updated} /> }
                    nestedItems={ nested_list }
                />
                <Divider/>
            </div>
        )
    }
});

module.exports = AppThread;