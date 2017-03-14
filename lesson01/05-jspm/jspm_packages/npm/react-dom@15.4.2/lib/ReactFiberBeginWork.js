/* */ 
(function(process) {
  'use strict';
  var _require = require('./ReactChildFiber'),
      reconcileChildFibers = _require.reconcileChildFibers,
      reconcileChildFibersInPlace = _require.reconcileChildFibersInPlace,
      cloneChildFibers = _require.cloneChildFibers;
  var _require2 = require('./ReactPriorityLevel'),
      LowPriority = _require2.LowPriority;
  var ReactTypeOfWork = require('./ReactTypeOfWork');
  var IndeterminateComponent = ReactTypeOfWork.IndeterminateComponent,
      FunctionalComponent = ReactTypeOfWork.FunctionalComponent,
      ClassComponent = ReactTypeOfWork.ClassComponent,
      HostContainer = ReactTypeOfWork.HostContainer,
      HostComponent = ReactTypeOfWork.HostComponent,
      CoroutineComponent = ReactTypeOfWork.CoroutineComponent,
      CoroutineHandlerPhase = ReactTypeOfWork.CoroutineHandlerPhase,
      YieldComponent = ReactTypeOfWork.YieldComponent;
  var _require3 = require('./ReactPriorityLevel'),
      NoWork = _require3.NoWork,
      OffscreenPriority = _require3.OffscreenPriority;
  var _require4 = require('./ReactFiberUpdateQueue'),
      createUpdateQueue = _require4.createUpdateQueue,
      addToQueue = _require4.addToQueue,
      addCallbackToQueue = _require4.addCallbackToQueue,
      mergeUpdateQueue = _require4.mergeUpdateQueue;
  var ReactInstanceMap = require('./ReactInstanceMap');
  module.exports = function(config, getScheduler) {
    function markChildAsProgressed(current, workInProgress, priorityLevel) {
      workInProgress.progressedChild = workInProgress.child;
      workInProgress.progressedPriority = priorityLevel;
      if (current) {
        current.progressedChild = workInProgress.progressedChild;
        current.progressedPriority = workInProgress.progressedPriority;
      }
    }
    function reconcileChildren(current, workInProgress, nextChildren) {
      var priorityLevel = workInProgress.pendingWorkPriority;
      reconcileChildrenAtPriority(current, workInProgress, nextChildren, priorityLevel);
    }
    function reconcileChildrenAtPriority(current, workInProgress, nextChildren, priorityLevel) {
      workInProgress.memoizedProps = null;
      if (current && current.child === workInProgress.child) {
        workInProgress.child = reconcileChildFibers(workInProgress, workInProgress.child, nextChildren, priorityLevel);
      } else {
        workInProgress.child = reconcileChildFibersInPlace(workInProgress, workInProgress.child, nextChildren, priorityLevel);
      }
      markChildAsProgressed(current, workInProgress, priorityLevel);
    }
    function updateFunctionalComponent(current, workInProgress) {
      var fn = workInProgress.type;
      var props = workInProgress.pendingProps;
      if (typeof fn.shouldComponentUpdate === 'function') {
        if (workInProgress.memoizedProps !== null) {
          if (!fn.shouldComponentUpdate(workInProgress.memoizedProps, props)) {
            return bailoutOnAlreadyFinishedWork(current, workInProgress);
          }
        }
      }
      var nextChildren = fn(props);
      reconcileChildren(current, workInProgress, nextChildren);
      return workInProgress.child;
    }
    function scheduleUpdate(fiber, updateQueue, priorityLevel) {
      var _getScheduler = getScheduler(),
          scheduleDeferredWork = _getScheduler.scheduleDeferredWork;
      fiber.updateQueue = updateQueue;
      if (fiber.alternate) {
        fiber.alternate.updateQueue = updateQueue;
      }
      while (true) {
        if (fiber.pendingWorkPriority === NoWork || fiber.pendingWorkPriority >= priorityLevel) {
          fiber.pendingWorkPriority = priorityLevel;
        }
        if (fiber.alternate) {
          if (fiber.alternate.pendingWorkPriority === NoWork || fiber.alternate.pendingWorkPriority >= priorityLevel) {
            fiber.alternate.pendingWorkPriority = priorityLevel;
          }
        }
        if (fiber.stateNode && fiber.stateNode.containerInfo) {
          var root = fiber.stateNode;
          scheduleDeferredWork(root, priorityLevel);
          return;
        }
        if (!fiber['return']) {
          throw new Error('No root!');
        }
        fiber = fiber['return'];
      }
    }
    var updater = {
      enqueueSetState: function(instance, partialState) {
        var fiber = ReactInstanceMap.get(instance);
        var updateQueue = fiber.updateQueue ? addToQueue(fiber.updateQueue, partialState) : createUpdateQueue(partialState);
        scheduleUpdate(fiber, updateQueue, LowPriority);
      },
      enqueueReplaceState: function(instance, state) {
        var fiber = ReactInstanceMap.get(instance);
        var updateQueue = createUpdateQueue(state);
        updateQueue.isReplace = true;
        scheduleUpdate(fiber, updateQueue, LowPriority);
      },
      enqueueForceUpdate: function(instance) {
        var fiber = ReactInstanceMap.get(instance);
        var updateQueue = fiber.updateQueue || createUpdateQueue(null);
        updateQueue.isForced = true;
        scheduleUpdate(fiber, updateQueue, LowPriority);
      },
      enqueueCallback: function(instance, callback) {
        var fiber = ReactInstanceMap.get(instance);
        var updateQueue = fiber.updateQueue ? fiber.updateQueue : createUpdateQueue(null);
        addCallbackToQueue(updateQueue, callback);
        fiber.updateQueue = updateQueue;
        if (fiber.alternate) {
          fiber.alternate.updateQueue = updateQueue;
        }
      }
    };
    function updateClassComponent(current, workInProgress) {
      var props = workInProgress.pendingProps;
      if (!props && current) {
        props = current.memoizedProps;
      }
      var updateQueue = workInProgress.updateQueue;
      var previousState = current ? current.memoizedState : null;
      var state = updateQueue ? mergeUpdateQueue(updateQueue, previousState, props) : previousState;
      var instance = workInProgress.stateNode;
      if (!instance) {
        var ctor = workInProgress.type;
        workInProgress.stateNode = instance = new ctor(props);
        state = instance.state || null;
        if (state !== null) {
          workInProgress.updateQueue = createUpdateQueue(state);
        }
        ReactInstanceMap.set(instance, workInProgress);
        instance.updater = updater;
      } else if (typeof instance.shouldComponentUpdate === 'function' && !(updateQueue && updateQueue.isForced)) {
        if (workInProgress.memoizedProps !== null) {
          instance.props = workInProgress.memoizedProps;
          instance.state = workInProgress.memoizedState;
          if (!instance.shouldComponentUpdate(props, state)) {
            return bailoutOnAlreadyFinishedWork(current, workInProgress);
          }
        }
      }
      instance.props = props;
      instance.state = state;
      var nextChildren = instance.render();
      reconcileChildren(current, workInProgress, nextChildren);
      return workInProgress.child;
    }
    function updateHostComponent(current, workInProgress) {
      var nextChildren = workInProgress.pendingProps.children;
      if (workInProgress.pendingProps.hidden && workInProgress.pendingWorkPriority !== OffscreenPriority) {
        if (workInProgress.progressedPriority === OffscreenPriority) {
          workInProgress.child = workInProgress.progressedChild;
        }
        reconcileChildrenAtPriority(current, workInProgress, nextChildren, OffscreenPriority);
        workInProgress.child = current ? current.child : null;
        return null;
      } else {
        reconcileChildren(current, workInProgress, nextChildren);
        return workInProgress.child;
      }
    }
    function mountIndeterminateComponent(current, workInProgress) {
      var fn = workInProgress.type;
      var props = workInProgress.pendingProps;
      var value = fn(props);
      if (typeof value === 'object' && value && typeof value.render === 'function') {
        workInProgress.tag = ClassComponent;
        if (current) {
          current.tag = ClassComponent;
        }
        value = value.render();
      } else {
        workInProgress.tag = FunctionalComponent;
        if (current) {
          current.tag = FunctionalComponent;
        }
      }
      reconcileChildren(current, workInProgress, value);
      return workInProgress.child;
    }
    function updateCoroutineComponent(current, workInProgress) {
      var coroutine = workInProgress.pendingProps;
      if (!coroutine) {
        throw new Error('Should be resolved by now');
      }
      reconcileChildren(current, workInProgress, coroutine.children);
    }
    function bailoutOnAlreadyFinishedWork(current, workInProgress) {
      var priorityLevel = workInProgress.pendingWorkPriority;
      cloneChildFibers(current, workInProgress);
      markChildAsProgressed(current, workInProgress, priorityLevel);
      return workInProgress.child;
    }
    function bailoutOnLowPriority(current, workInProgress) {
      if (current) {
        workInProgress.child = current.child;
        workInProgress.memoizedProps = current.memoizedProps;
        workInProgress.output = current.output;
      }
      return null;
    }
    function beginWork(current, workInProgress, priorityLevel) {
      if (workInProgress.pendingWorkPriority === NoWork || workInProgress.pendingWorkPriority > priorityLevel) {
        return bailoutOnLowPriority(current, workInProgress);
      }
      if (workInProgress.progressedPriority === priorityLevel) {
        workInProgress.child = workInProgress.progressedChild;
      }
      if ((workInProgress.pendingProps === null || workInProgress.memoizedProps !== null && workInProgress.pendingProps === workInProgress.memoizedProps) && workInProgress.updateQueue === null) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      switch (workInProgress.tag) {
        case IndeterminateComponent:
          return mountIndeterminateComponent(current, workInProgress);
        case FunctionalComponent:
          return updateFunctionalComponent(current, workInProgress);
        case ClassComponent:
          return updateClassComponent(current, workInProgress);
        case HostContainer:
          reconcileChildren(current, workInProgress, workInProgress.pendingProps);
          if (workInProgress.child) {
            return beginWork(workInProgress.child.alternate, workInProgress.child, priorityLevel);
          }
          return null;
        case HostComponent:
          if (workInProgress.stateNode && config.beginUpdate) {
            config.beginUpdate(workInProgress.stateNode);
          }
          return updateHostComponent(current, workInProgress);
        case CoroutineHandlerPhase:
          workInProgress.tag = CoroutineComponent;
        case CoroutineComponent:
          updateCoroutineComponent(current, workInProgress);
          if (workInProgress.child) {
            return beginWork(workInProgress.child.alternate, workInProgress.child, priorityLevel);
          }
          return workInProgress.child;
        case YieldComponent:
          if (workInProgress.sibling) {
            return beginWork(workInProgress.sibling.alternate, workInProgress.sibling, priorityLevel);
          }
          return null;
        default:
          throw new Error('Unknown unit of work tag');
      }
    }
    return {beginWork: beginWork};
  };
})(require('process'));
