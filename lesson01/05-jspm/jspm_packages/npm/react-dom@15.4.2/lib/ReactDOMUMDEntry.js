/* */ 
(function(process) {
  'use strict';
  var React = require('react/lib/React');
  var ReactDOM = require('./ReactDOM');
  var ReactDOMUMDEntry = ReactDOM;
  if (process.env.NODE_ENV !== 'production') {
    ReactDOMUMDEntry.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
      ReactPerf: require('./ReactPerf'),
      ReactTestUtils: require('./ReactTestUtils')
    };
  }
  if (React.addons) {
    React.__SECRET_INJECTED_REACT_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOMUMDEntry;
  }
  module.exports = ReactDOMUMDEntry;
})(require('process'));
