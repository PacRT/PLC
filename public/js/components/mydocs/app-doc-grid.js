/**
 * Created by Hardik on 2/23/16.
 */
var React = require('react');
var MyDocsStore = require('../../stores/app-mydocs-store');
var MyDocsActions = require('../../actions/app-mydocs-actions');
var DocTile = require('./app-doc-tile');
var DocGridContainer = require('./app-doc-grid-container');
var TableBody= require('material-ui/lib/table/table-body');
var Table = require('material-ui/lib/table/table');

var DocGrid = React.createClass({
    getInitialState: function(){
        return {
            "store" : MyDocsStore.getDocStore(),
            "childs" : ["11","22","324","23423","234234"]
        }
    },
    componentDidMount: function() {
        MyDocsActions.getMyDocs(this.state.store.cursor,this.props.view);
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
        return (
            <div>
                <DocGridContainer>
                    {
                        this.state.store.docs_link.map(function(url,index){
                            if(_this.props.view != "INBOX"){
                                return(
                                    <DocTile
                                        key={index}
                                        tile_index={index}
                                        heading={_this.state.store.files_name[index]}
                                        img={url}
                                        view={_this.props.view}
                                        isPreviewMode={false}
                                    />
                                )
                            }else{

                                return(
                                <Table style={{"marginBottom" : "10px"}}>
                                        <TableBody>
                                            <DocTile
                                                key={index}
                                                tile_index={index}
                                                heading={_this.state.store.files_name[index]}
                                                img={url}
                                                view={_this.props.view}
                                                isPreviewMode={false}
                                            />
                                        </TableBody>
                                    </Table>
                                )
                            }

                        })
                    }
                </DocGridContainer>

            </div>
        );
    }
});

module.exports = DocGrid;
