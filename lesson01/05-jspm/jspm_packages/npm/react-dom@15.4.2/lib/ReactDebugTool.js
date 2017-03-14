/* */ 
(function(process) {
  'use strict';
  var ReactInvalidSetStateWarningHook = require('./ReactInvalidSetStateWarningHook');
  var ReactHostOperationHistoryHook = require('./ReactHostOperationHistoryHook');
  var ReactComponentTreeHook = require('react/lib/ReactComponentTreeHook');
  var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
  var performanceNow = require('fbjs/lib/performanceNow');
  var warning = require('fbjs/lib/warning');
  var hooks = [];
  var didHookThrowForEvent = {};
  function callHook(event, fn, context, arg1, arg2, arg3, arg4, arg5) {
    try {
      fn.call(context, arg1, arg2, arg3, arg4, arg5);
    } catch (e) {
      process.env.NODE_ENV !== 'production' ? warning(didHookThrowForEvent[event], 'Exception thrown by hook while handling %s: %s', event, e + '\n' + e.stack) : void 0;
      didHookThrowForEvent[event] = true;
    }
  }
  function emitEvent(event, arg1, arg2, arg3, arg4, arg5) {
    for (var i = 0; i < hooks.length; i++) {
      var hook = hooks[i];
      var fn = hook[event];
      if (fn) {
        callHook(event, fn, hook, arg1, arg2, arg3, arg4, arg5);
      }
    }
  }
  var isProfiling = false;
  var flushHistory = [];
  var lifeCycleTimerStack = [];
  var currentFlushNesting = 0;
  var currentFlushMeasurements = [];
  var currentFlushStartTime = 0;
  var currentTimerDebugID = null;
  var currentTimerStartTime = 0;
  var currentTimerNestedFlushDuration = 0;
  var currentTimerType = null;
  var lifeCycleTimerHasWarned = false;
  function clearHistory() {
    ReactComponentTreeHook.purgeUnmountedComponents();
    ReactHostOperationHistoryHook.clearHistory();
  }
  function getTreeSnapshot(registeredIDs) {
    return registeredIDs.reduce(function(tree, id) {
      var ownerID = ReactComponentTreeHook.getOwnerID(id);
      var parentID = ReactComponentTreeHook.getParentID(id);
      tree[id] = {
        displayName: ReactComponentTreeHook.getDisplayName(id),
        text: ReactComponentTreeHook.getText(id),
        updateCount: ReactComponentTreeHook.getUpdateCount(id),
        childIDs: ReactComponentTreeHook.getChildIDs(id),
        ownerID: ownerID || parentID && ReactComponentTreeHook.getOwnerID(parentID) || 0,
        parentID: parentID
      };
      return tree;
    }, {});
  }
  function resetMeasurements() {
    var previousStartTime = currentFlushStartTime;
    var previousMeasurements = currentFlushMeasurements;
    var previousOperations = ReactHostOperationHistoryHook.getHistory();
    if (currentFlushNesting === 0) {
      currentFlushStartTime = 0;
      currentFlushMeasurements = [];
      clearHistory();
      return;
    }
    if (previousMeasurements.length || previousOperations.length) {
      var registeredIDs = ReactComponentTreeHook.getRegisteredIDs();
      flushHistory.push({
        duration: performanceNow() - previousStartTime,
        measurements: previousMeasurements || [],
        operations: previousOperations || [],
        treeSnapshot: getTreeSnapshot(registeredIDs)
      });
    }
    clearHistory();
    currentFlushStartTime = performanceNow();
    currentFlushMeasurements = [];
  }
  function checkDebugID(debugID) {
    var allowRoot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (allowRoot && debugID === 0) {
      return;
    }
    if (!debugID) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'ReactDebugTool: debugID may not be empty.') : void 0;
    }
  }
  function beginLifeCycleTimer(debugID, timerType) {
    if (currentFlushNesting === 0) {
      return;
    }
    if (currentTimerType && !lifeCycleTimerHasWarned) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'There is an internal error in the React performance measurement code. ' + 'Did not expect %s timer to start while %s timer is still in ' + 'progress for %s instance.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
      lifeCycleTimerHasWarned = true;
    }
    currentTimerStartTime = performanceNow();
    currentTimerNestedFlushDuration = 0;
    currentTimerDebugID = debugID;
    currentTimerType = timerType;
  }
  function endLifeCycleTimer(debugID, timerType) {
    if (currentFlushNesting === 0) {
      return;
    }
    if (currentTimerType !== timerType && !lifeCycleTimerHasWarned) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'There is an internal error in the React performance measurement code. ' + 'We did not expect %s timer to stop while %s timer is still in ' + 'progress for %s instance. Please report this as a bug in React.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
      lifeCycleTimerHasWarned = true;
    }
    if (isProfiling) {
      currentFlushMeasurements.push({
        timerType: timerType,
        instanceID: debugID,
        duration: performanceNow() - currentTimerStartTime - currentTimerNestedFlushDuration
      });
    }
    currentTimerStartTime = 0;
    currentTimerNestedFlushDuration = 0;
    currentTimerDebugID = null;
    currentTimerType = null;
  }
  function pauseCurrentLifeCycleTimer() {
    var currentTimer = {
      startTime: currentTimerStartTime,
      nestedFlushStartTime: performanceNow(),
      debugID: currentTimerDebugID,
      timerType: currentTimerType
    };
    lifeCycleTimerStack.push(currentTimer);
    currentTimerStartTime = 0;
    currentTimerNestedFlushDuration = 0;
    currentTimerDebugID = null;
    currentTimerType = null;
  }
  function resumeCurrentLifeCycleTimer() {
    var _lifeCycleTimerStack$ = lifeCycleTimerStack.pop(),
        startTime = _lifeCycleTimerStack$.startTime,
        nestedFlushStartTime = _lifeCycleTimerStack$.nestedFlushStartTime,
        debugID = _lifeCycleTimerStack$.debugID,
        timerType = _lifeCycleTimerStack$.timerType;
    var nestedFlushDuration = performanceNow() - nestedFlushStartTime;
    currentTimerStartTime = startTime;
    currentTimerNestedFlushDuration += nestedFlushDuration;
    currentTimerDebugID = debugID;
    currentTimerType = timerType;
  }
  var lastMarkTimeStamp = 0;
  var canUsePerformanceMeasure = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';
  function shouldMark(debugID) {
    if (!isProfiling || !canUsePerformanceMeasure) {
      return false;
    }
    var element = ReactComponentTreeHook.getElement(debugID);
    if (element == null || typeof element !== 'object') {
      return false;
    }
    var isHostElement = typeof element.type === 'string';
    if (isHostElement) {
      return false;
    }
    return true;
  }
  function markBegin(debugID, markType) {
    if (!shouldMark(debugID)) {
      return;
    }
    var markName = debugID + '::' + markType;
    lastMarkTimeStamp = performanceNow();
    performance.mark(markName);
  }
  function markEnd(debugID, markType) {
    if (!shouldMark(debugID)) {
      return;
    }
    var markName = debugID + '::' + markType;
    var displayName = ReactComponentTreeHook.getDisplayName(debugID) || 'Unknown';
    var timeStamp = performanceNow();
    if (timeStamp - lastMarkTimeStamp > 0.1) {
      var measurementName = displayName + ' [' + markType + ']';
      performance.measure(measurementName, markName);
    }
    performance.clearMarks(markName);
    performance.clearMeasures(measurementName);
  }
  var ReactDebugTool = {
    addHook: function(hook) {
      hooks.push(hook);
    },
    removeHook: function(hook) {
      for (var i = 0; i < hooks.length; i++) {
        if (hooks[i] === hook) {
          hooks.splice(i, 1);
          i--;
        }
      }
    },
    isProfiling: function() {
      return isProfiling;
    },
    beginProfiling: function() {
      if (isProfiling) {
        return;
      }
      isProfiling = true;
      flushHistory.length = 0;
      resetMeasurements();
      ReactDebugTool.addHook(ReactHostOperationHistoryHook);
    },
    endProfiling: function() {
      if (!isProfiling) {
        return;
      }
      isProfiling = false;
      resetMeasurements();
      ReactDebugTool.removeHook(ReactHostOperationHistoryHook);
    },
    getFlushHistory: function() {
      return flushHistory;
    },
    onBeginFlush: function() {
      currentFlushNesting++;
      resetMeasurements();
      pauseCurrentLifeCycleTimer();
      emitEvent('onBeginFlush');
    },
    onEndFlush: function() {
      resetMeasurements();
      currentFlushNesting--;
      resumeCurrentLifeCycleTimer();
      emitEvent('onEndFlush');
    },
    onBeginLifeCycleTimer: function(debugID, timerType) {
      checkDebugID(debugID);
      emitEvent('onBeginLifeCycleTimer', debugID, timerType);
      markBegin(debugID, timerType);
      beginLifeCycleTimer(debugID, timerType);
    },
    onEndLifeCycleTimer: function(debugID, timerType) {
      checkDebugID(debugID);
      endLifeCycleTimer(debugID, timerType);
      markEnd(debugID, timerType);
      emitEvent('onEndLifeCycleTimer', debugID, timerType);
    },
    onBeginProcessingChildContext: function() {
      emitEvent('onBeginProcessingChildContext');
    },
    onEndProcessingChildContext: function() {
      emitEvent('onEndProcessingChildContext');
    },
    onHostOperation: function(operation) {
      checkDebugID(operation.instanceID);
      emitEvent('onHostOperation', operation);
    },
    onSetState: function() {
      emitEvent('onSetState');
    },
    onSetChildren: function(debugID, childDebugIDs) {
      checkDebugID(debugID);
      childDebugIDs.forEach(checkDebugID);
      emitEvent('onSetChildren', debugID, childDebugIDs);
    },
    onBeforeMountComponent: function(debugID, element, parentDebugID) {
      checkDebugID(debugID);
      checkDebugID(parentDebugID, true);
      emitEvent('onBeforeMountComponent', debugID, element, parentDebugID);
      markBegin(debugID, 'mount');
    },
    onMountComponent: function(debugID) {
      checkDebugID(debugID);
      markEnd(debugID, 'mount');
      emitEvent('onMountComponent', debugID);
    },
    onBeforeUpdateComponent: function(debugID, element) {
      checkDebugID(debugID);
      emitEvent('onBeforeUpdateComponent', debugID, element);
      markBegin(debugID, 'update');
    },
    onUpdateComponent: function(debugID) {
      checkDebugID(debugID);
      markEnd(debugID, 'update');
      emitEvent('onUpdateComponent', debugID);
    },
    onBeforeUnmountComponent: function(debugID) {
      checkDebugID(debugID);
      emitEvent('onBeforeUnmountComponent', debugID);
      markBegin(debugID, 'unmount');
    },
    onUnmountComponent: function(debugID) {
      checkDebugID(debugID);
      markEnd(debugID, 'unmount');
      emitEvent('onUnmountComponent', debugID);
    },
    onTestEvent: function() {
      emitEvent('onTestEvent');
    }
  };
  ReactDebugTool.addDevtool = ReactDebugTool.addHook;
  ReactDebugTool.removeDevtool = ReactDebugTool.removeHook;
  ReactDebugTool.addHook(ReactInvalidSetStateWarningHook);
  ReactDebugTool.addHook(ReactComponentTreeHook);
  var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
  if (/[?&]react_perf\b/.test(url)) {
    ReactDebugTool.beginProfiling();
  }
  module.exports = ReactDebugTool;
})(require('process'));
