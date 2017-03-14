/* */ 
(function(process) {
  'use strict';
  var ReactDOM = require('react-dom/lib/ReactDOM');
  exports.getReactDOM = function() {
    return ReactDOM;
  };
  if (process.env.NODE_ENV !== 'production') {
    var ReactPerf;
    var ReactTestUtils;
    exports.getReactPerf = function() {
      if (!ReactPerf) {
        ReactPerf = require('react-dom/lib/ReactPerf');
      }
      return ReactPerf;
    };
    exports.getReactTestUtils = function() {
      if (!ReactTestUtils) {
        ReactTestUtils = require('react-dom/lib/ReactTestUtils');
      }
      return ReactTestUtils;
    };
  }
})(require('process'));
