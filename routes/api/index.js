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
/**
 * Get Document Metadata
 */
router.use('/api/v1/docs',require('./docs/get_doc_metadata.js'));
/**
 * Edit/update document Metadata
 */
router.use('/api/v1/docs',require('./docs/edit_doc_metadata.js'));
/**
 * Get Documents by Type
 */
router.use('/api/v1/docs',require('./docs/get_doc_by_category.js'));
/**
 * Logout User
 */
router.use('/api/v1',require('./logout/logout.js'));
/**
 * Create and Forward Packages
 */
router.use('/api/v1',require('./create-forward-package/create-package.js'));
router.get('/', function(req, res) {
    res.send({status : 200,mesasge: "App is up and running!!"})
});

module.exports = router
