/* */ 
'use strict';
var _require = require('./ReactFiberRoot'),
    createFiberRoot = _require.createFiberRoot;
var ReactFiberScheduler = require('./ReactFiberScheduler');
module.exports = function(config) {
  var _ReactFiberScheduler = ReactFiberScheduler(config),
      scheduleWork = _ReactFiberScheduler.scheduleWork,
      performWithPriority = _ReactFiberScheduler.performWithPriority;
  return {
    mountContainer: function(element, containerInfo) {
      var root = createFiberRoot(containerInfo);
      var container = root.current;
      container.pendingProps = element;
      scheduleWork(root);
      return container;
    },
    updateContainer: function(element, container) {
      var root = container.stateNode;
      root.current.pendingProps = element;
      scheduleWork(root);
    },
    unmountContainer: function(container) {
      var root = container.stateNode;
      root.current.pendingProps = [];
      scheduleWork(root);
    },
    performWithPriority: performWithPriority,
    getPublicRootInstance: function(container) {
      return null;
    }
  };
};
