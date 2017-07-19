'use strict';
var util = require('util')
  , BaseResource = require('./base_resource')
  , ClarifaiService = require('../clarifai_service');


util.inherits(GetConceptsFromImageResource, BaseResource);

module.exports = GetConceptsFromImageResource;
function GetConceptsFromImageResource() {
  BaseResource.call(this);
  console.log("GetConceptsFromImageResource Calleddddd");

}

GetConceptsFromImageResource.prototype.handle = function (req, res, next) {
  var conceptsFromImage = new GetConceptsFromImageResource();

  var service = new ClarifaiService();
  
  var options = req.body || {};
  // var options = req.query || {};

  var result = {"result": "error"};
  if (options.data === null){
    return conceptsFromImage.sendResponse(res, next, 200)(null, result);
  }else{
    service.getConceptsFromImage(options, conceptsFromImage.sendResponse(res, next));
  }
};

