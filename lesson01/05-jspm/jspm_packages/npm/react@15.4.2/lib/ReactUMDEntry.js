/* */ 
(function(process) {
  'use strict';
  var _assign = require('object-assign');
  var React = require('./React');
  var ReactUMDEntry = _assign({__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {ReactCurrentOwner: require('./ReactCurrentOwner')}}, React);
  if (process.env.NODE_ENV !== 'production') {
    _assign(ReactUMDEntry.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {ReactComponentTreeHook: require('./ReactComponentTreeHook')});
  }
  module.exports = ReactUMDEntry;
})(require('process'));
