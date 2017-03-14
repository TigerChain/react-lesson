/* */ 
'use strict';
var REACT_ELEMENT_TYPE = require('./ReactElementSymbol');
var _require = require('./ReactCoroutine'),
    REACT_COROUTINE_TYPE = _require.REACT_COROUTINE_TYPE,
    REACT_YIELD_TYPE = _require.REACT_YIELD_TYPE;
var ReactFiber = require('./ReactFiber');
var ReactReifiedYield = require('./ReactReifiedYield');
var cloneFiber = ReactFiber.cloneFiber,
    createFiberFromElement = ReactFiber.createFiberFromElement,
    createFiberFromCoroutine = ReactFiber.createFiberFromCoroutine,
    createFiberFromYield = ReactFiber.createFiberFromYield;
var createReifiedYield = ReactReifiedYield.createReifiedYield;
var isArray = Array.isArray;
function ChildReconciler(shouldClone) {
  function createSubsequentChild(returnFiber, existingChild, previousSibling, newChildren, priority) {
    if (typeof newChildren !== 'object' || newChildren === null) {
      return previousSibling;
    }
    switch (newChildren.$$typeof) {
      case REACT_ELEMENT_TYPE:
        {
          var element = newChildren;
          if (existingChild && element.type === existingChild.type && element.key === existingChild.key) {
            var clone = shouldClone ? cloneFiber(existingChild, priority) : existingChild;
            if (!shouldClone) {
              clone.pendingWorkPriority = priority;
            }
            clone.pendingProps = element.props;
            clone.sibling = null;
            clone['return'] = returnFiber;
            previousSibling.sibling = clone;
            return clone;
          }
          var child = createFiberFromElement(element, priority);
          previousSibling.sibling = child;
          child['return'] = returnFiber;
          return child;
        }
      case REACT_COROUTINE_TYPE:
        {
          var coroutine = newChildren;
          var _child = createFiberFromCoroutine(coroutine, priority);
          previousSibling.sibling = _child;
          _child['return'] = returnFiber;
          return _child;
        }
      case REACT_YIELD_TYPE:
        {
          var yieldNode = newChildren;
          var reifiedYield = createReifiedYield(yieldNode);
          var _child2 = createFiberFromYield(yieldNode, priority);
          _child2.output = reifiedYield;
          previousSibling.sibling = _child2;
          _child2['return'] = returnFiber;
          return _child2;
        }
    }
    if (isArray(newChildren)) {
      var prev = previousSibling;
      var existing = existingChild;
      for (var i = 0; i < newChildren.length; i++) {
        var nextExisting = existing && existing.sibling;
        prev = createSubsequentChild(returnFiber, existing, prev, newChildren[i], priority);
        if (prev && existing) {
          existing = nextExisting;
        }
      }
      return prev;
    } else {
      return previousSibling;
    }
  }
  function createFirstChild(returnFiber, existingChild, newChildren, priority) {
    if (typeof newChildren !== 'object' || newChildren === null) {
      return null;
    }
    switch (newChildren.$$typeof) {
      case REACT_ELEMENT_TYPE:
        {
          var element = newChildren;
          if (existingChild && element.type === existingChild.type && element.key === existingChild.key) {
            var clone = shouldClone ? cloneFiber(existingChild, priority) : existingChild;
            if (!shouldClone) {
              clone.pendingWorkPriority = priority;
            }
            clone.pendingProps = element.props;
            clone.sibling = null;
            clone['return'] = returnFiber;
            return clone;
          }
          var child = createFiberFromElement(element, priority);
          child['return'] = returnFiber;
          return child;
        }
      case REACT_COROUTINE_TYPE:
        {
          var coroutine = newChildren;
          var _child3 = createFiberFromCoroutine(coroutine, priority);
          _child3['return'] = returnFiber;
          return _child3;
        }
      case REACT_YIELD_TYPE:
        {
          var yieldNode = newChildren;
          var reifiedYield = createReifiedYield(yieldNode);
          var _child4 = createFiberFromYield(yieldNode, priority);
          _child4.output = reifiedYield;
          _child4['return'] = returnFiber;
          return _child4;
        }
    }
    if (isArray(newChildren)) {
      var first = null;
      var prev = null;
      var existing = existingChild;
      for (var i = 0; i < newChildren.length; i++) {
        var nextExisting = existing && existing.sibling;
        if (prev == null) {
          prev = createFirstChild(returnFiber, existing, newChildren[i], priority);
          first = prev;
        } else {
          prev = createSubsequentChild(returnFiber, existing, prev, newChildren[i], priority);
        }
        if (prev && existing) {
          existing = nextExisting;
        }
      }
      return first;
    } else {
      return null;
    }
  }
  function reconcileChildFibers(returnFiber, currentFirstChild, newChildren, priority) {
    return createFirstChild(returnFiber, currentFirstChild, newChildren, priority);
  }
  return reconcileChildFibers;
}
exports.reconcileChildFibers = ChildReconciler(true);
exports.reconcileChildFibersInPlace = ChildReconciler(false);
function cloneSiblings(current, workInProgress, returnFiber) {
  workInProgress['return'] = returnFiber;
  while (current.sibling) {
    current = current.sibling;
    workInProgress = workInProgress.sibling = cloneFiber(current, current.pendingWorkPriority);
    workInProgress['return'] = returnFiber;
  }
  workInProgress.sibling = null;
}
exports.cloneChildFibers = function(current, workInProgress) {
  if (!workInProgress.child) {
    return;
  }
  if (current && workInProgress.child === current.child) {
    var currentChild = workInProgress.child;
    var newChild = cloneFiber(currentChild, currentChild.pendingWorkPriority);
    workInProgress.child = newChild;
    cloneSiblings(currentChild, newChild, workInProgress);
  }
  var child = workInProgress.child;
  while (child) {
    child['return'] = workInProgress;
    child = child.sibling;
  }
};
