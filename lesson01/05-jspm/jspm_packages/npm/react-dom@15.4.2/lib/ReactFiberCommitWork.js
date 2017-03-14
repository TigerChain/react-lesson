/* */ 
'use strict';
var ReactTypeOfWork = require('./ReactTypeOfWork');
var ClassComponent = ReactTypeOfWork.ClassComponent,
    HostContainer = ReactTypeOfWork.HostContainer,
    HostComponent = ReactTypeOfWork.HostComponent;
var _require = require('./ReactFiberUpdateQueue'),
    callCallbacks = _require.callCallbacks;
module.exports = function(config) {
  var updateContainer = config.updateContainer;
  var commitUpdate = config.commitUpdate;
  function commitWork(current, finishedWork) {
    switch (finishedWork.tag) {
      case ClassComponent:
        {
          if (finishedWork.alternate) {
            finishedWork.alternate.updateQueue = null;
          }
          if (finishedWork.callbackList) {
            var callbackList = finishedWork.callbackList;
            finishedWork.callbackList = null;
            callCallbacks(callbackList, finishedWork.stateNode);
          }
          return;
        }
      case HostContainer:
        {
          var children = finishedWork.output;
          var root = finishedWork.stateNode;
          var containerInfo = root.containerInfo;
          updateContainer(containerInfo, children);
          return;
        }
      case HostComponent:
        {
          if (finishedWork.stateNode == null || !current) {
            throw new Error('This should only be done during updates.');
          }
          var child = finishedWork.child;
          var _children = child && !child.sibling ? child.output : child;
          var newProps = finishedWork.memoizedProps;
          var oldProps = current.memoizedProps;
          var instance = finishedWork.stateNode;
          commitUpdate(instance, oldProps, newProps, _children);
          return;
        }
      default:
        throw new Error('This unit of work tag should not have side-effects.');
    }
  }
  return {commitWork: commitWork};
};
