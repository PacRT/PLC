/**
 * Created by Hardik on 2/24/16.
 */
/** @jsx React.DOM */
var AppConstants = require('../constants/app-constants.js')["DOCS"];
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var APIConstants = require('../constants/app-api-url.js');
var API = require('../utils/API.js');
var APIURL = require('../utils/getAPIURL');


var DocTileActions = {
    /**
     * Create PDF Thumbnail using pdf.js library
     * @param url
     * @param encoded_id
     * @param done
     */
    createPDFThumbnail : function(url,encoded_id,done){
        var oReq = new XMLHttpRequest();
        oReq.open("GET", url+'?_=' + new Date().getTime(), true)
        oReq.onerror = function() { alert('error'); };
        oReq.responseType = "arraybuffer";

        oReq.onload = function (oEvent) {
            var arrayBuffer = oReq.response; // Note: not oReq.responseText
            if (arrayBuffer) {
                var byteArray = new Uint8Array(arrayBuffer);
                PDFJS.getDocument(byteArray).then(function(pdf) {
                    pdf.getPage(1).then(function(page) {
                        var canvas = document.createElement('canvas');
                        var desiredHeight = 400;
                        var viewport = page.getViewport(1);
                        var scale = desiredHeight / viewport.height;
                        var scaledViewport = page.getViewport(scale);
                        var context = canvas.getContext('2d')
                        var renderContext = {
                            canvasContext: context,
                            viewport:scaledViewport
                        };
                        page.render(renderContext).promise.then(function(){
                            done(canvas,encoded_id);
                        },function(error){
                            console.log("Error Occurred while rendering pdf page!!!");
                        });
                    })
                });
            }
        };
        oReq.send(null);
    },
    createThumbnail:function(url){
        /**
         * 1 for PDF
         * 2 for any other image file type
         * @type {String}
         */
        var extension = url.indexOf(".pdf") != -1 ? "pdf" : "";
        switch(extension){
            case "pdf" :
                this.createPDFThumbnail(url);
                break;
            default :
                console.log("Can not Create thumbnail for extension : " + url.split(".")[1]);
                break;
        }
    },
    openPreview : function(url){
        AppDispatcher.handleViewAction({
            actionType : AppConstants.OPEN_PREVIEW,
            response :url
        });
    }
}

module.exports = DocTileActions;
