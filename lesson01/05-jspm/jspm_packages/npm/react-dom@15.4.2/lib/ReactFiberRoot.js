/* */ 
'use strict';
var _require = require('./ReactFiber'),
    createHostContainerFiber = _require.createHostContainerFiber;
exports.createFiberRoot = function(containerInfo) {
  var uninitializedFiber = createHostContainerFiber();
  var root = {
    current: uninitializedFiber,
    containerInfo: containerInfo,
    isScheduled: false,
    nextScheduledRoot: null
  };
  uninitializedFiber.stateNode = root;
  return root;
};
