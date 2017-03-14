/* */ 
(function(process) {
  'use strict';
  var LinkedStateMixin = require('./LinkedStateMixin');
  var React = require('./React');
  var ReactAddonsDOMDependencies = require('./ReactAddonsDOMDependencies');
  var ReactComponentWithPureRenderMixin = require('./ReactComponentWithPureRenderMixin');
  var ReactCSSTransitionGroup = require('./ReactCSSTransitionGroup');
  var ReactFragment = require('./ReactFragment');
  var ReactTransitionGroup = require('./ReactTransitionGroup');
  var shallowCompare = require('./shallowCompare');
  var update = require('./update');
  React.addons = {
    CSSTransitionGroup: ReactCSSTransitionGroup,
    LinkedStateMixin: LinkedStateMixin,
    PureRenderMixin: ReactComponentWithPureRenderMixin,
    TransitionGroup: ReactTransitionGroup,
    createFragment: ReactFragment.create,
    shallowCompare: shallowCompare,
    update: update
  };
  if (process.env.NODE_ENV !== 'production') {
    Object.defineProperty(React.addons, 'Perf', {
      enumerable: true,
      get: function() {
        return ReactAddonsDOMDependencies.getReactPerf();
      }
    });
    Object.defineProperty(React.addons, 'TestUtils', {
      enumerable: true,
      get: function() {
        return ReactAddonsDOMDependencies.getReactTestUtils();
      }
    });
  }
  module.exports = React;
})(require('process'));
