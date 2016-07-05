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
/**
 * Get Threads Shared With User
 */
router.use('/api/v1/inbox',require('./inbox/inbox_get_threads.js'));
/**
 * Create Thread when user receives Packages
 */
router.use('/api/v1/inbox',require('./inbox/inbox_create_thread.js'));
/**
 * Update Thread Meta
 */
router.use('/api/v1/inbox',require('./inbox/update_thread.js'));
/**
 * search docs index in elastic search
 */
router.use('/api/v1/doc_search',require('./docs/search_docs'));
/**
 * Add Comment in Inbox Thread
 */
router.use('/api/v1/inbox',require('./inbox/inbox_add_comment'));
/**
 * Get Comments for Inbox Thread
 */
router.use('/api/v1/inbox',require('./inbox/inbox_get_comment'));

router.get('/', function(req, res) {
    res.send({status : 200,mesasge: "App is up and running!!"})
});

module.exports = router
