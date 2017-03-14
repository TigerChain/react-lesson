/* */ 
'use strict';
var _require = require('./ReactChildFiber'),
    reconcileChildFibers = _require.reconcileChildFibers;
var ReactTypeOfWork = require('./ReactTypeOfWork');
var IndeterminateComponent = ReactTypeOfWork.IndeterminateComponent,
    FunctionalComponent = ReactTypeOfWork.FunctionalComponent,
    ClassComponent = ReactTypeOfWork.ClassComponent,
    HostContainer = ReactTypeOfWork.HostContainer,
    HostComponent = ReactTypeOfWork.HostComponent,
    CoroutineComponent = ReactTypeOfWork.CoroutineComponent,
    CoroutineHandlerPhase = ReactTypeOfWork.CoroutineHandlerPhase,
    YieldComponent = ReactTypeOfWork.YieldComponent;
module.exports = function(config) {
  var createInstance = config.createInstance;
  var prepareUpdate = config.prepareUpdate;
  function markForPreEffect(workInProgress) {
    if (workInProgress.firstEffect) {
      workInProgress.nextEffect = workInProgress.firstEffect;
      workInProgress.firstEffect = workInProgress;
    } else {
      workInProgress.firstEffect = workInProgress;
      workInProgress.lastEffect = workInProgress;
    }
  }
  function markForPostEffect(workInProgress) {
    if (workInProgress.lastEffect) {
      workInProgress.lastEffect.nextEffect = workInProgress;
    } else {
      workInProgress.firstEffect = workInProgress;
    }
    workInProgress.lastEffect = workInProgress;
  }
  function transferOutput(child, returnFiber) {
    returnFiber.output = child && !child.sibling ? child.output : child;
    returnFiber.memoizedProps = returnFiber.pendingProps;
  }
  function recursivelyFillYields(yields, output) {
    if (!output) {} else if (output.tag !== undefined) {
      var item = output;
      do {
        recursivelyFillYields(yields, item.output);
        item = item.sibling;
      } while (item);
    } else {
      yields.push(output);
    }
  }
  function moveCoroutineToHandlerPhase(current, workInProgress) {
    var coroutine = workInProgress.pendingProps;
    if (!coroutine) {
      throw new Error('Should be resolved by now');
    }
    workInProgress.tag = CoroutineHandlerPhase;
    var yields = [];
    var child = workInProgress.child;
    while (child) {
      recursivelyFillYields(yields, child.output);
      child = child.sibling;
    }
    var fn = coroutine.handler;
    var props = coroutine.props;
    var nextChildren = fn(props, yields);
    var currentFirstChild = current ? current.stateNode : null;
    var priority = workInProgress.pendingWorkPriority;
    workInProgress.stateNode = reconcileChildFibers(workInProgress, currentFirstChild, nextChildren, priority);
    return workInProgress.stateNode;
  }
  function completeWork(current, workInProgress) {
    switch (workInProgress.tag) {
      case FunctionalComponent:
        transferOutput(workInProgress.child, workInProgress);
        return null;
      case ClassComponent:
        transferOutput(workInProgress.child, workInProgress);
        var _workInProgress$state = workInProgress.stateNode,
            state = _workInProgress$state.state,
            props = _workInProgress$state.props;
        workInProgress.memoizedState = state;
        workInProgress.memoizedProps = props;
        workInProgress.callbackList = workInProgress.updateQueue;
        markForPostEffect(workInProgress);
        return null;
      case HostContainer:
        transferOutput(workInProgress.child, workInProgress);
        markForPreEffect(workInProgress);
        return null;
      case HostComponent:
        var newProps = workInProgress.pendingProps;
        var child = workInProgress.child;
        var children = child && !child.sibling ? child.output : child;
        if (current && workInProgress.stateNode != null) {
          var oldProps = current.memoizedProps;
          if (!newProps) {
            newProps = oldProps;
          }
          var instance = workInProgress.stateNode;
          if (prepareUpdate(instance, oldProps, newProps, children)) {
            markForPreEffect(workInProgress);
          }
          workInProgress.output = instance;
        } else {
          if (!newProps) {
            if (workInProgress.stateNode === null) {
              throw new Error('We must have new props for new mounts.');
            } else {
              return null;
            }
          }
          var _instance = createInstance(workInProgress.type, newProps, children);
          workInProgress.stateNode = _instance;
          workInProgress.output = _instance;
        }
        workInProgress.memoizedProps = newProps;
        return null;
      case CoroutineComponent:
        return moveCoroutineToHandlerPhase(current, workInProgress);
      case CoroutineHandlerPhase:
        transferOutput(workInProgress.stateNode, workInProgress);
        workInProgress.tag = CoroutineComponent;
        return null;
      case YieldComponent:
        return null;
      case IndeterminateComponent:
        throw new Error('An indeterminate component should have become determinate before completing.');
      default:
        throw new Error('Unknown unit of work tag');
    }
  }
  return {completeWork: completeWork};
};
