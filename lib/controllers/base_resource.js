/**
* @name BadRequestError
*/
// var BadRequestError = require('./error/bad_request_error');

/**
* Expose the module
*/
exports = module.exports = BaseResource;

/**
* Base Resource - inherited by all other resources within this service
*/
function BaseResource() {}

/**
* send
*
* @param {Object} res - response
* @param {String} data - json string data
* @param {Object} code
*
*/
BaseResource.prototype.send = function (res, data, code) {
  res.writeHead(code || 200, {
    'Content-Type': 'application/json; charset=UTF-8'
  });
  res.end(JSON.stringify(data));
};

/**
* _sendResponse - return function to handle service response
*
* @param {Object} req - request
* @param {Function} next
* @param {Object} code
*
* @return {Function} cb(err,body)
*/
BaseResource.prototype.sendResponse = function (res, next, code) {
  var self = this;
  return function (err, body) {
    if (err) {return next(err); }
    self.send(res, body, code);
  };
};

/**
* Helps verify content type
*
*/
BaseResource.prototype.verifyContentType = function (req) {
  if (!req.is('json')) {
    //throw new BadRequestError('bad content type');
  }
};

