/**
 * Created by Hardik on 2/23/16.
 */
var React = require('react');
var MyDocsStore = require('../../stores/app-mydocs-store');
var MyDocsActions = require('../../actions/app-mydocs-actions');
var DocTile = require('./app-doc-tile');
var DocGridContainer = require('./app-doc-grid-container');
var Child = require('./ContainerParent');

var DocGrid = React.createClass({
    getInitialState: function(){
        return {
            "store" : MyDocsStore.getDocStore(),
            "childs" : ["11","22","324","23423","234234"]
        }
    },
    componentDidMount: function() {
        MyDocsActions.getMyDocs(this.state.store.cursor);
        MyDocsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        MyDocsStore.resetDocStore();
        MyDocsStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        var doc_store = MyDocsStore.getDocStore();
        this.setState({
            store : doc_store
        });
    },
    render: function () {
        var _this = this;
        console.log(this.state.store.docs_link);
        return (
            <div>
                <DocGridContainer>
                    {
                        this.state.store.docs_link.map(function(url,index){
                            return(
                                    <DocTile
                                        key={index}
                                        tile_index={index}
                                        heading={_this.state.store.files_name[index]}
                                        img={url}
                                    />
                            )
                        })
                    }
                </DocGridContainer>

            </div>
        );
    }
});

module.exports = DocGrid;
