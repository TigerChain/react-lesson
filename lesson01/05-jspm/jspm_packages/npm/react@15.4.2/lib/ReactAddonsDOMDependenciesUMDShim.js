/* */ 
(function(process) {
  'use strict';
  var ReactDOM;
  function getReactDOM() {
    if (!ReactDOM) {
      var ReactWithAddonsUMDEntry = require('./ReactWithAddonsUMDEntry');
      ReactDOM = ReactWithAddonsUMDEntry.__SECRET_INJECTED_REACT_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    }
    return ReactDOM;
  }
  exports.getReactDOM = getReactDOM;
  if (process.env.NODE_ENV !== 'production') {
    exports.getReactPerf = function() {
      return getReactDOM().__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactPerf;
    };
    exports.getReactTestUtils = function() {
      return getReactDOM().__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactTestUtils;
    };
  }
})(require('process'));
