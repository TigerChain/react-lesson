/* */ 
(function(process) {
  'use strict';
  var invariant = require('./invariant');
  function keyMirrorRecursive(obj, prefix) {
    return keyMirrorRecursiveInternal(obj, prefix);
  }
  function keyMirrorRecursiveInternal(obj, prefix) {
    var ret = {};
    var key;
    !isObject(obj) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'keyMirrorRecursive(...): Argument must be an object.') : invariant(false) : void 0;
    for (key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }
      var val = obj[key];
      var newPrefix = prefix ? prefix + '.' + key : key;
      if (isObject(val)) {
        val = keyMirrorRecursiveInternal(val, newPrefix);
      } else {
        val = newPrefix;
      }
      ret[key] = val;
    }
    return ret;
  }
  function isObject(obj) {
    return obj instanceof Object && !Array.isArray(obj);
  }
  module.exports = keyMirrorRecursive;
})(require('process'));
