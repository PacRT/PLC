/**
 * Created by Hardik on 3/13/16.
 */
var AppConstants = require('../constants/app-constants.js')["DOCS"];
var GlobalConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var APIURL = require('../utils/getAPIURL');

var AppCreateForwardPackage = {
    getDocsByType:function(cursor,category){
        var GET_DOC_BY_TYPE = APIConstants.GET_DOC_BY_TYPE.replace("#cursor#",cursor);
        GET_DOC_BY_TYPE = GET_DOC_BY_TYPE.replace("#category#",category);
        API.get(GET_DOC_BY_TYPE).then(function(response){
            var result = JSON.parse(response.text);
            /*result.docs_link = result.docs_link.map(function(doc_url){
                doc_url = doc_url.split("docs")[1].split("/");
                doc_url = "http://" + doc_url[1] + ":" + doc_url[2] + "/" + doc_url[3];
                return doc_url;
            })*/
            var transformed_links = result.docs_link.map(function(link){
                return APIURL.get(link);
            });
            AppDispatcher.handleViewAction({
                actionType: AppConstants.DOC_BY_TYPE,
                cursor: result.cursor,
                docs_link : result.docs_link,
                transformed_links : transformed_links,
                files_name : result.files_name
            });
            if(transformed_links.length == 0){
                var notification = {
                    open : true,
                    message : "No Result Found."
                }
                AppDispatcher.handleViewAction({
                    actionType : GlobalConstants.SHOW_NOTIFICATION,
                    response   : notification
                });
            }
        });
    },
    openForwardPkgModal : function(packages, is_drawer_open){
        AppDispatcher.handleViewAction({
            actionType : AppConstants.OPEN_FORWARD_PACKAGE_MODAL,
            packages   : packages,
            modal_open : is_drawer_open
        })
    },
    closeForwardPkgModal : function(){
        AppDispatcher.handleViewAction({
            actionType : AppConstants.CLOSE_FORWARD_PACKAGE_MODAL,
            modal_open : false
        })
    },
    createPackages : function(packages){
        var data = {
            "packages" : packages
        }
        API.post(APIConstants.CREATE_FORWARD_PACKAGE,data).then(function(response){
            var notification = {
                open : true,
                message : "Your Package has been forwarded"
            }
            AppDispatcher.handleViewAction({
                actionType : GlobalConstants.SHOW_NOTIFICATION,
                response   : notification
            });
            AppDispatcher.handleViewAction({
                actionType : AppConstants.CLOSE_FORWARD_PACKAGE_MODAL,
                modal_open : false
            });
        });
    },
    updateSelectedTile : function(selected_tiles){
        AppDispatcher.handleViewAction({
            actionType : AppConstants.UPDATE_TILE_SELECTION,
            selected_tiles : selected_tiles
        })
    }
}

module.exports = AppCreateForwardPackage;
