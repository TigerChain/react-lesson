/* */ 
(function(process) {
  'use strict';
  var _assign = require('object-assign');
  var ReactWithAddons = require('./ReactWithAddons');
  var ReactWithAddonsUMDEntry = _assign({
    __SECRET_INJECTED_REACT_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: null,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {ReactCurrentOwner: require('./ReactCurrentOwner')}
  }, ReactWithAddons);
  if (process.env.NODE_ENV !== 'production') {
    _assign(ReactWithAddonsUMDEntry.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {ReactComponentTreeHook: require('./ReactComponentTreeHook')});
  }
  module.exports = ReactWithAddonsUMDEntry;
})(require('process'));
