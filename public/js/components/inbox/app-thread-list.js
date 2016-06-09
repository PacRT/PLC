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
        console.info(this.props.threads);
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


                {/*<List>
                    <ListItem
                        leftIcon={<ThreadUnread style={{"fill":"rgb(66, 133, 244)"}} />}
                        initiallyOpen={false}
                        primaryTogglesNestedList={true}
                        primaryText={
                             <Grid>
                                <Row className="show-grid">
                                    <Col xs={6} md={4}>Chiradip</Col>
                                    <Col xs={6} md={4}> <span style={{color: Colors.lightBlack}}>W2</span></Col>
                                    <Col xsHidden md={4}> <span style={{color: Colors.lightBlack}}>May-31-2016</span></Col>
                                </Row>
                            </Grid>
                        }
                        nestedItems={[
                            <ListItem
                                key={1}
                                primaryTogglesNestedList={true}
                                primaryText={
                                <Grid>
                                <Row className="show-grid">
                                    <Col xs={6} md={4}>2016 Income Tax Documents</Col>
                                    <Col xs={6} md={4}></Col>
                                    <Col xsHidden md={4}> <span style={{color: Colors.lightBlack}}>May-31-2016</span></Col>
                                </Row>
                            </Grid>}
                            />,
                            <ListItem
                                key={2}
                                primaryTogglesNestedList={true}
                                primaryText={<Grid>
                                <Row className="show-grid">
                                    <Col xs={6} md={4}>2016 Accounting Documents</Col>
                                    <Col xs={6} md={4}></Col>
                                    <Col xsHidden md={4}> <span style={{color: Colors.lightBlack}}>JUN-01-2016</span></Col>
                                </Row>
                            </Grid>}
                                nestedItems={[
                                    <ListItem  leftCheckbox={<Checkbox />} key={1} primaryText={<p> Drafts </p>}  />
                                ]}
                            />
                        ]}
                    />
                    <Divider/>
                    <ListItem
                       leftIcon={<ThreadUnread style={{"fill":"rgb(66, 133, 244)"}}/>}
                        initiallyOpen={false}
                        primaryTogglesNestedList={true}
                        primaryText={
                             <Grid>
                                <Row className="show-grid">
                                    <Col xs={6} md={4}>Hardik</Col>
                                    <Col xs={6} md={4}> <span style={{color: Colors.lightBlack}}>College/Car Receipts</span></Col>
                                    <Col xsHidden md={4}> <span style={{color: Colors.lightBlack}}>May-31-2016</span></Col>
                                </Row>
                            </Grid>
                        }
                        nestedItems={[
                           <ListItem
                                key={10}
                                primaryTogglesNestedList={true}
                                primaryText={
                                    <Grid>
                                        <Row className="show-grid">
                                            <Col xs={6} md={4}>2015 College Documents</Col>
                                            <Col xs={6} md={4}>University</Col>
                                            <Col xsHidden md={4}> <span style={{color: Colors.lightBlack}}>May-31-2015</span></Col>
                                        </Row>
                                    </Grid>
                                }
                             nestedItems={[
                                    <ListItem  leftCheckbox={<Checkbox />} key={200} primaryText={<p> College Fee Receipts </p>}  />,
                                    <ListItem  leftCheckbox={<Checkbox />} key={300} primaryText={<p> College Parking Receipts </p>}  />
                                ]}
                            />,
                            <ListItem
                                key={2}
                                primaryTogglesNestedList={true}
                                primaryText={<Grid>
                                <Row className="show-grid">
                                    <Col xs={6} md={4}>2016 Car Documents</Col>
                                    <Col xs={6} md={4}>Mazda</Col>
                                    <Col xsHidden md={4}> <span style={{color: Colors.lightBlack}}>Feb-01-2016</span></Col>
                                </Row>
                            </Grid>}
                                nestedItems={[
                                    <ListItem  leftCheckbox={<Checkbox />} key={400} primaryText={<p> Car Registration </p>}  />,
                                    <ListItem  leftCheckbox={<Checkbox />} key={500} primaryText={<p> Car Title </p>}  />
                                ]}
                            />
                        ]}
                    />
                    <Divider/>
                    <ListItem
                        primaryText="Leasing Office"
                        leftIcon={<ThreadRead/>}
                        initiallyOpen={false}
                        primaryTogglesNestedList={true}
                        primaryText={
                             <Grid>
                                <Row className="show-grid">
                                    <Col xs={6} md={4}>Leasing Office</Col>
                                    <Col xs={6} md={4}> <span style={{color: Colors.lightBlack}}>Camden Amberoaks</span></Col>
                                    <Col xsHidden md={4}> <span style={{color: Colors.lightBlack}}>May-31-2016</span></Col>
                                </Row>
                            </Grid>
                        }
                        nestedItems={[
                           <ListItem
                                key={600}
                                primaryTogglesNestedList={true}
                                primaryText={
                                <Grid>
                                <Row className="show-grid">
                                    <Col xs={6} md={4}>2014 Leasing Documents</Col>
                                    <Col xs={6} md={4}></Col>
                                    <Col xsHidden md={4}> <span style={{color: Colors.lightBlack}}>May-31-2015</span></Col>
                                </Row>
                            </Grid>}
                             nestedItems={[
                                    <ListItem key={700} primaryText={<p> Renter Insurance </p>}  />,
                                    <ListItem key={800} primaryText={<p> Monthly Rent Receipts </p>}  />
                                ]}
                            />,
                            <ListItem
                                key={900}
                                primaryTogglesNestedList={true}
                                primaryText={<Grid>
                                <Row className="show-grid">
                                    <Col xs={6} md={4}>2015 Leasing Documents</Col>
                                    <Col xs={6} md={4}></Col>
                                    <Col xsHidden md={4}> <span style={{color: Colors.lightBlack}}>Feb-01-2016</span></Col>
                                </Row>
                            </Grid>}
                                nestedItems={[
                                    <ListItem key={10000} primaryText={<p> Leasing Agreement </p>}  />,
                                    <ListItem key={2000} primaryText={<p> Moving Out Notice </p>}  />
                                ]}
                            />
                        ]}
                    />
                </List>*/}
            </div>
        )
    }
});

module.exports = AppThreadList;