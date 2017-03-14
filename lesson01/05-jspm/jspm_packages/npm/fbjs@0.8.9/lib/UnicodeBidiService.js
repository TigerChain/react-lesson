/* */ 
(function(process) {
  'use strict';
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var UnicodeBidi = require('./UnicodeBidi');
  var UnicodeBidiDirection = require('./UnicodeBidiDirection');
  var invariant = require('./invariant');
  var UnicodeBidiService = function() {
    function UnicodeBidiService(defaultDir) {
      _classCallCheck(this, UnicodeBidiService);
      if (!defaultDir) {
        defaultDir = UnicodeBidiDirection.getGlobalDir();
      } else {
        !UnicodeBidiDirection.isStrong(defaultDir) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Default direction must be a strong direction (LTR or RTL)') : invariant(false) : void 0;
      }
      this._defaultDir = defaultDir;
      this.reset();
    }
    UnicodeBidiService.prototype.reset = function reset() {
      this._lastDir = this._defaultDir;
    };
    UnicodeBidiService.prototype.getDirection = function getDirection(str) {
      this._lastDir = UnicodeBidi.getDirection(str, this._lastDir);
      return this._lastDir;
    };
    return UnicodeBidiService;
  }();
  module.exports = UnicodeBidiService;
})(require('process'));
