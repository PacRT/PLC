/**
 * Created by Hardik on 12/11/15.
 */
var express = require("express");
var router = express.Router();
var auth_checker = ("./middleware/auth_checker");

/**
 * Register User.
 */
router.use('/api/v1/users',require('./user/user.js'));
/**
 * Authenticate User
 */
router.use('/api/v1/login',require('./auth/auth.js'));
/**
 * Upload Docs
 */
router.use('/api/v1/upload',require('./upload_file/upload_file.js'));
/**
 * Get Doc Links
 */
router.use('/api/v1/docs',require('./docs/get_doc_links.js'));
/**
 * Download Requested Doc
 */
router.use('/api/v1/docs',require('./docs/download_doc.js'));

router.get('/', function(req, res) {
    res.send({status : 200,mesasge: "App is up and running!!"})
});

module.exports = router