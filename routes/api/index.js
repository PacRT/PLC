/**
 * Created by Hardik on 12/11/15.
 */
module.exports = function(app) {

    app.get('/', function(req, res) {
        res.send({status : 200,mesasge: "App is up and running!!"})
    });
}