'use strict';
var React = require('react');
var SearchBarApp = require('./app-searchbar');
var Grid = require('react-bootstrap/lib/Grid');
var Col = require('react-bootstrap/lib/Col');
var MyDocsStore = require('../../stores/app-mydocs-store');
var MyDocsActions = require('../../actions/app-mydocs-actions');
var UploadZone = require('../uploadzone/app-uploadzone');
var DocTile = require('./app-doc-tile');
var ActionBarApp = require('./app-action-bar');
var DocPreview = require('./app-doc-preview');
var EditMetaData = require('./app-edit-metadata-modal');

var MyDocs = React.createClass({
    getInitialState: function(){
        return {
            "store" :[],
            "childs" : ["11","22","324","23423","234234"],
            "preview": {
                "title": "",
                "doc_url": ""
            },
            is_preview_open: false,
            is_edit_modal_open: false
        }
    },
    componentDidMount: function() {
        MyDocsActions.getMyDocs();
        MyDocsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        MyDocsActions.resetDocStore();
        MyDocsStore.removeChangeListener(this._onChange);
    },
    _selectDoc : function(index){
        var store = this.state.store;
        store[index]["isSelected"] = !this.state.store[index]["isSelected"];
        this.setState({
            store: store
        });
    },
    _openPreview: function (doc_index) {
        var store = this.state.store;
        this.setState({
            is_preview_open: true,
            "preview": {
                "title": store[doc_index]["filename"],
                "doc_url":store[doc_index]["doc_url"]
            }
        });
    },
    _closePreview: function(){
        this.setState({
            is_preview_open: false,
            is_edit_modal_open: false,
            "preview": {
                "title": "",
                "doc_url": ""
            }
        })
    },
    openEditModal: function(doc_index){
        var store = this.state.store;
        this.setState({
            is_edit_modal_open: true,
            "preview": {
                "title": store[doc_index]["filename"],
                "doc_url":store[doc_index]["doc_url"]
            }
        })
    },
    _onChange: function() {
        var doc_store = MyDocsStore.getDocStore();
        this.setState({
            store : doc_store
        });
    },
    updateDocMetaData: function (doc_index, value, field) {
        var store = this.state.store;
        store[doc_index][field] = value;
        this.setState({
            store: store
        });
    },
    saveMetaData: function(doc_index){
        var store = this.state.store;
        var meta = {
            'category' : store[doc_index]['category'],
            'file_name' : store[doc_index]['filename'],
            'doc_url' : store[doc_index]['doc_url'].split("/api/v1")[1]
        };
        MyDocsActions.updateDocMetaData(meta);
    },
    _renderDocs: function(){
        var docsJSX = this.state.store.map(function(doc,index){
                return  <DocTile
                    key={index}
                    doc_index={index}
                    thumbnail={doc.thumbnail}
                    img={doc.doc_url}
                    heading={doc.filename}
                    isSelected={doc.isSelected || false}
                    category={doc.category}
                    docname={doc.docname}
                    updateDocMetaData={this.updateDocMetaData}
                    _selectDoc={this._selectDoc}
                    openPreview={this._openPreview}
                    openEditModal={this.openEditModal}
                    saveMetaData={this.saveMetaData}
                />
        }.bind(this));
        return docsJSX;
    },
    render: function () {
        var docsJSX = this._renderDocs();
        return (
            <div>
                <SearchBarApp title="My Docs"/>
                <Grid>
                    <Col md={12} xs={12} style={{"paddingBottom" : "9.5em"}}>
                        {docsJSX}
                    </Col>
                </Grid>
                <UploadZone/>
                <ActionBarApp
                    mydocs={this.state.store}
                    title="Take An Action"/>
                <EditMetaData
                    title={this.state.preview.title}
                    doc_url={this.state.preview.doc_url}
                    closePreview={this._closePreview}
                    is_edit_modal_open={this.state.is_edit_modal_open}
                />
                <DocPreview is_preview_open={this.state.is_preview_open}
                            title={this.state.preview.title}
                            doc_url={this.state.preview.doc_url}
                            closePreview={this._closePreview}
                            hybridView={false}/>
            </div>
        )
    }
});

module.exports = MyDocs;
