/* */ 
'use strict';
var ReactFiberBeginWork = require('./ReactFiberBeginWork');
var ReactFiberCompleteWork = require('./ReactFiberCompleteWork');
var ReactFiberCommitWork = require('./ReactFiberCommitWork');
var _require = require('./ReactFiber'),
    cloneFiber = _require.cloneFiber;
var _require2 = require('./ReactPriorityLevel'),
    NoWork = _require2.NoWork,
    LowPriority = _require2.LowPriority,
    AnimationPriority = _require2.AnimationPriority,
    SynchronousPriority = _require2.SynchronousPriority;
var timeHeuristicForUnitOfWork = 1;
module.exports = function(config) {
  var scheduler = void 0;
  function getScheduler() {
    return scheduler;
  }
  var _ReactFiberBeginWork = ReactFiberBeginWork(config, getScheduler),
      beginWork = _ReactFiberBeginWork.beginWork;
  var _ReactFiberCompleteWo = ReactFiberCompleteWork(config),
      completeWork = _ReactFiberCompleteWo.completeWork;
  var _ReactFiberCommitWork = ReactFiberCommitWork(config),
      commitWork = _ReactFiberCommitWork.commitWork;
  var scheduleAnimationCallback = config.scheduleAnimationCallback;
  var scheduleDeferredCallback = config.scheduleDeferredCallback;
  var defaultPriority = LowPriority;
  var nextUnitOfWork = null;
  var nextPriorityLevel = NoWork;
  var nextScheduledRoot = null;
  var lastScheduledRoot = null;
  function findNextUnitOfWork() {
    while (nextScheduledRoot && nextScheduledRoot.current.pendingWorkPriority === NoWork) {
      nextScheduledRoot.isScheduled = false;
      if (nextScheduledRoot === lastScheduledRoot) {
        nextScheduledRoot = null;
        lastScheduledRoot = null;
        nextPriorityLevel = NoWork;
        return null;
      }
      nextScheduledRoot = nextScheduledRoot.nextScheduledRoot;
    }
    var root = nextScheduledRoot;
    var highestPriorityRoot = null;
    var highestPriorityLevel = NoWork;
    while (root) {
      if (highestPriorityLevel === NoWork || highestPriorityLevel > root.current.pendingWorkPriority) {
        highestPriorityLevel = root.current.pendingWorkPriority;
        highestPriorityRoot = root;
      }
      root = root.nextScheduledRoot;
    }
    if (highestPriorityRoot) {
      nextPriorityLevel = highestPriorityLevel;
      return cloneFiber(highestPriorityRoot.current, highestPriorityLevel);
    }
    nextPriorityLevel = NoWork;
    return null;
  }
  function commitAllWork(finishedWork) {
    var effectfulFiber = finishedWork.firstEffect;
    while (effectfulFiber) {
      var current = effectfulFiber.alternate;
      commitWork(current, effectfulFiber);
      var next = effectfulFiber.nextEffect;
      effectfulFiber.nextEffect = null;
      effectfulFiber = next;
    }
  }
  function resetWorkPriority(workInProgress) {
    var newPriority = NoWork;
    var child = workInProgress.progressedChild;
    while (child) {
      if (child.pendingWorkPriority !== NoWork && (newPriority === NoWork || newPriority > child.pendingWorkPriority)) {
        newPriority = child.pendingWorkPriority;
      }
      child = child.sibling;
    }
    workInProgress.pendingWorkPriority = newPriority;
  }
  function completeUnitOfWork(workInProgress) {
    while (true) {
      var current = workInProgress.alternate;
      var next = completeWork(current, workInProgress);
      resetWorkPriority(workInProgress);
      workInProgress.pendingProps = null;
      workInProgress.updateQueue = null;
      var returnFiber = workInProgress['return'];
      if (returnFiber) {
        if (!returnFiber.firstEffect) {
          returnFiber.firstEffect = workInProgress.firstEffect;
        }
        if (workInProgress.lastEffect) {
          if (returnFiber.lastEffect) {
            returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
          }
          returnFiber.lastEffect = workInProgress.lastEffect;
        }
      }
      if (next) {
        return next;
      } else if (workInProgress.sibling) {
        return workInProgress.sibling;
      } else if (returnFiber) {
        workInProgress = returnFiber;
        continue;
      } else {
        var _root = workInProgress.stateNode;
        if (_root.current === workInProgress) {
          throw new Error('Cannot commit the same tree as before. This is probably a bug ' + 'related to the return field.');
        }
        _root.current = workInProgress;
        commitAllWork(workInProgress);
        var nextWork = findNextUnitOfWork();
        return nextWork;
      }
    }
  }
  function performUnitOfWork(workInProgress) {
    var current = workInProgress.alternate;
    var next = beginWork(current, workInProgress, nextPriorityLevel);
    if (next) {
      return next;
    } else {
      return completeUnitOfWork(workInProgress);
    }
  }
  function performDeferredWork(deadline) {
    if (!nextUnitOfWork) {
      nextUnitOfWork = findNextUnitOfWork();
    }
    while (nextUnitOfWork) {
      if (deadline.timeRemaining() > timeHeuristicForUnitOfWork) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        if (!nextUnitOfWork) {
          nextUnitOfWork = findNextUnitOfWork();
        }
      } else {
        scheduleDeferredCallback(performDeferredWork);
        return;
      }
    }
  }
  function scheduleDeferredWork(root, priority) {
    if (priority <= nextPriorityLevel) {
      nextUnitOfWork = null;
    }
    if (root.current.pendingWorkPriority === NoWork || priority <= root.current.pendingWorkPriority) {
      root.current.pendingWorkPriority = priority;
    }
    if (root.isScheduled) {
      return;
    }
    root.isScheduled = true;
    if (lastScheduledRoot) {
      lastScheduledRoot.nextScheduledRoot = root;
      lastScheduledRoot = root;
    } else {
      nextScheduledRoot = root;
      lastScheduledRoot = root;
      scheduleDeferredCallback(performDeferredWork);
    }
  }
  function performAnimationWork() {
    nextUnitOfWork = findNextUnitOfWork();
    while (nextUnitOfWork && nextPriorityLevel !== NoWork) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      if (!nextUnitOfWork) {
        nextUnitOfWork = findNextUnitOfWork();
      }
      if (nextPriorityLevel > AnimationPriority) {
        scheduleDeferredCallback(performDeferredWork);
        return;
      }
    }
  }
  function scheduleAnimationWork(root, priorityLevel) {
    if (root.current.pendingWorkPriority === NoWork || priorityLevel <= root.current.pendingWorkPriority) {
      root.current.pendingWorkPriority = priorityLevel;
    }
    if (root.isScheduled) {
      return;
    }
    root.isScheduled = true;
    if (lastScheduledRoot) {
      lastScheduledRoot.nextScheduledRoot = root;
      lastScheduledRoot = root;
    } else {
      nextScheduledRoot = root;
      lastScheduledRoot = root;
      scheduleAnimationCallback(performAnimationWork);
    }
  }
  function scheduleWork(root) {
    if (defaultPriority === SynchronousPriority) {
      throw new Error('Not implemented yet');
    }
    if (defaultPriority === NoWork) {
      return;
    }
    if (defaultPriority > AnimationPriority) {
      scheduleDeferredWork(root, defaultPriority);
      return;
    }
    scheduleAnimationWork(root, defaultPriority);
  }
  function performWithPriority(priorityLevel, fn) {
    var previousDefaultPriority = defaultPriority;
    defaultPriority = priorityLevel;
    try {
      fn();
    } finally {
      defaultPriority = previousDefaultPriority;
    }
  }
  scheduler = {
    scheduleWork: scheduleWork,
    scheduleDeferredWork: scheduleDeferredWork,
    performWithPriority: performWithPriority
  };
  return scheduler;
};
