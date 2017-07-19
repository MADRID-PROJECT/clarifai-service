'use strict';


var express = require('express')
, GetConceptsFromImageResource = require('../controllers/GetConceptsFromImageResource');

module.exports = MainRouter;

function MainRouter() {
  var router = express.Router();
  this.getConceptsFromImageResource = new GetConceptsFromImageResource();
  

  router.post('/madrid/ai/getConceptsFromImage', this.getConceptsFromImageResource.handle);



  return router;
}
