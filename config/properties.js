
exports.getPropertyService = function (){
  if (!this._PropertyService) {
    this._PropertyService = new PropertyService();
  }
  return this._PropertyService;
}
function PropertyService(){
  this.clarifai = {
    "clientId" : "vt5O9yXyru5AiyPYus1VJ1f9e29qdOdB8n7sjP-y",
    "clientSecret" : "x74sC0myfAf46eab-i_fGPFbch4pWgbF9hW2bYE_",
    "apiKey" : 'cb1002b774d34c53b703b260cf681a5c'
}


}
