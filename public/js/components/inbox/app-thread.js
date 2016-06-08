var React = require("react");
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var ActionGrade = require('material-ui/lib/svg-icons/action/grade');
var ContentInbox = require('material-ui/lib/svg-icons/content/inbox');
var ContentDrafts = require('material-ui/lib/svg-icons/content/drafts');
var ContentSend = require('material-ui/lib/svg-icons/content/send');
var ThreadUnread = require('material-ui/lib/svg-icons/communication/email');
var ThreadRead = require('material-ui/lib/svg-icons/communication/mail-outline');
var Colors = require('material-ui/lib/styles/colors');
var Badge = require('material-ui/lib/badge');
var Divider = require('material-ui/lib/divider');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Checkbox = require('material-ui/lib/checkbox');
var AppPrimaryText = require('./app-list-primary-text');

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
    _getDocList : function (package) {
        var docList = [];
        var doc_item_style = this.getStyles()["doc_item"];
        for(var i=0; i < package.docs.length; i++){
            var doc = package.docs[i];
            var docItem = <ListItem   key={doc.docs_link}  innerDivStyle={doc_item_style} primaryText={<p> {doc.file_name} </p>}  />
            docList.push(docItem);
        }
        return docList;
    },
    _getNestedThread : function(){
        var nested_list = [];
        var doc_item_style = this.getStyles()["doc_item"];
        for(var i=0; i < this.props.thread.packages.length; i++){
            var pkg = this.props.thread.packages[i];
            var docList = this._getDocList(pkg);
            var listItem = <ListItem
                key={pkg.package_id}
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
        if(thread.isRead){
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
                    primaryText={ <AppPrimaryText sender={thread.sender} thread_name={thread.thread_name} date_updated={thread.date_updated} /> }
                    nestedItems={ nested_list }
                />
                <Divider/>
            </div>
        )
    }
});

module.exports = AppThread;