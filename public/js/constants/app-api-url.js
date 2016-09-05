/**
 * Created by Hardik on 1/19/16.
 */
module.exports = {
    NODE_SERVER      : '#NODE_SERVER#',
    NODE_PORT        : '#NODE_PORT#',
    API_PREFIX       : '/api/v1',
    USER_EXISTS_API  : '/users/isUserExists/#userName#',
    REGISTER_USER    : '/users/register',
    LOG_IN           : '/login',
    LOG_OUT          : '/logout/#user_name#',
    MY_DOCS          : '/docs/#cursor#',
    GET_THREADS            : '/inbox/getThreads',
    UPLOAD_DOCS      : '/upload/#file_name#/#category#',
    GET_DOC_METADATA : '/docs/metadata/#doc_url#',
    UPDATE_DOC_METADATA : '/docs/updateMetaData',
    GET_DOC_BY_TYPE  : '/docs/#cursor#/#category#',
    CREATE_FORWARD_PACKAGE   : '/createPackage',
    FILTER_DOCS      : '/doc_search/#query#',
    MARK_THREAD_READ    : '/inbox/markThreadRead/#thread_id#',
    GET_INBOX_COMMENTS : '/inbox/getComment',
    ADD_INBOX_COMMENTS : '/inbox/addComment',
    GET_SENT_ITEMS     : '/sentItems/getSentItems',
    SEND_INVITES    : '/sendInvites',
    SEND_RESET_PWD_LINK  : '/sendResetPasswordLink',
    RESET_PASSWORD : '/resetPassword'
};