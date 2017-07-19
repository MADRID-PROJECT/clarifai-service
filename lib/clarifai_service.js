module.exports = ClarifaiService;

var fs = require('fs');
var Clarifai = require('clarifai');
var PropertyService = require('../config/properties');

function ClarifaiService(request) {

  console.log("ClarifaiService Constructor called");
  
  this.request = request;
  this.properties = PropertyService.getPropertyService();
  this.serviceURIs = this.properties.serviceURIs;

}



ClarifaiService.prototype.getConceptsFromImage = function (options, cb) {

  var clarifaiApp = new Clarifai.App({
  "apiKey" :  this.properties.clarifai.apiKey
});

clarifaiApp.models.predict({id: "food-test", language : 'en'},'http://www.watscooking.com/images/dish/large/3071.jpg').then(
  function(response) {
   console.log("response");
   response.outputs.map(function(item){
      console.log("FOOD TEST IDENTIFICATION:");
      console.log(item.data);
      cb(null, item.data);
   });
   //searchForIdly();
  },
  function(err) {
    console.error(err);
  }
);
};




