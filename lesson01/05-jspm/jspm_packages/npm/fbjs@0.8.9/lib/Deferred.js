/* */ 
"use strict";
var Promise = require('./Promise');
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Deferred = function() {
  function Deferred() {
    var _this = this;
    _classCallCheck(this, Deferred);
    this._settled = false;
    this._promise = new Promise(function(resolve, reject) {
      _this._resolve = resolve;
      _this._reject = reject;
    });
  }
  Deferred.prototype.getPromise = function getPromise() {
    return this._promise;
  };
  Deferred.prototype.resolve = function resolve(value) {
    this._settled = true;
    this._resolve(value);
  };
  Deferred.prototype.reject = function reject(reason) {
    this._settled = true;
    this._reject(reason);
  };
  Deferred.prototype["catch"] = function _catch() {
    return Promise.prototype["catch"].apply(this._promise, arguments);
  };
  Deferred.prototype.then = function then() {
    return Promise.prototype.then.apply(this._promise, arguments);
  };
  Deferred.prototype.done = function done() {
    var promise = arguments.length ? this._promise.then.apply(this._promise, arguments) : this._promise;
    promise.then(undefined, function(err) {
      setTimeout(function() {
        throw err;
      }, 0);
    });
  };
  Deferred.prototype.isSettled = function isSettled() {
    return this._settled;
  };
  return Deferred;
}();
module.exports = Deferred;
