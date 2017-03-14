/* */ 
(function(process) {
  'use strict';
  var _prodInvariant = require('./reactProdInvariant');
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var PooledClass = require('./PooledClass');
  var invariant = require('fbjs/lib/invariant');
  var CallbackQueue = function() {
    function CallbackQueue(arg) {
      _classCallCheck(this, CallbackQueue);
      this._callbacks = null;
      this._contexts = null;
      this._arg = arg;
    }
    CallbackQueue.prototype.enqueue = function enqueue(callback, context) {
      this._callbacks = this._callbacks || [];
      this._callbacks.push(callback);
      this._contexts = this._contexts || [];
      this._contexts.push(context);
    };
    CallbackQueue.prototype.notifyAll = function notifyAll() {
      var callbacks = this._callbacks;
      var contexts = this._contexts;
      var arg = this._arg;
      if (callbacks && contexts) {
        !(callbacks.length === contexts.length) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Mismatched list of contexts in callback queue') : _prodInvariant('24') : void 0;
        this._callbacks = null;
        this._contexts = null;
        for (var i = 0; i < callbacks.length; i++) {
          callbacks[i].call(contexts[i], arg);
        }
        callbacks.length = 0;
        contexts.length = 0;
      }
    };
    CallbackQueue.prototype.checkpoint = function checkpoint() {
      return this._callbacks ? this._callbacks.length : 0;
    };
    CallbackQueue.prototype.rollback = function rollback(len) {
      if (this._callbacks && this._contexts) {
        this._callbacks.length = len;
        this._contexts.length = len;
      }
    };
    CallbackQueue.prototype.reset = function reset() {
      this._callbacks = null;
      this._contexts = null;
    };
    CallbackQueue.prototype.destructor = function destructor() {
      this.reset();
    };
    return CallbackQueue;
  }();
  module.exports = PooledClass.addPoolingTo(CallbackQueue);
})(require('process'));
