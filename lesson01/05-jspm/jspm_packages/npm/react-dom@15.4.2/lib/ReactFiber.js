/* */ 
'use strict';
var ReactTypeOfWork = require('./ReactTypeOfWork');
var IndeterminateComponent = ReactTypeOfWork.IndeterminateComponent,
    ClassComponent = ReactTypeOfWork.ClassComponent,
    HostContainer = ReactTypeOfWork.HostContainer,
    HostComponent = ReactTypeOfWork.HostComponent,
    CoroutineComponent = ReactTypeOfWork.CoroutineComponent,
    YieldComponent = ReactTypeOfWork.YieldComponent;
var _require = require('./ReactPriorityLevel'),
    NoWork = _require.NoWork;
var createFiber = function(tag, key) {
  return {
    tag: tag,
    key: key,
    type: null,
    stateNode: null,
    'return': null,
    child: null,
    sibling: null,
    ref: null,
    pendingProps: null,
    memoizedProps: null,
    updateQueue: null,
    memoizedState: null,
    callbackList: null,
    output: null,
    nextEffect: null,
    firstEffect: null,
    lastEffect: null,
    pendingWorkPriority: NoWork,
    progressedPriority: NoWork,
    progressedChild: null,
    alternate: null
  };
};
function shouldConstruct(Component) {
  return !!(Component.prototype && Component.prototype.isReactComponent);
}
exports.cloneFiber = function(fiber, priorityLevel) {
  var alt = fiber.alternate;
  if (alt) {
    alt.nextEffect = null;
    alt.firstEffect = null;
    alt.lastEffect = null;
  } else {
    alt = createFiber(fiber.tag, fiber.key);
    alt.type = fiber.type;
    alt.progressedChild = fiber.progressedChild;
    alt.progressedPriority = fiber.progressedPriority;
    alt.alternate = fiber;
    fiber.alternate = alt;
  }
  alt.stateNode = fiber.stateNode;
  alt.child = fiber.child;
  alt.sibling = fiber.sibling;
  alt.ref = fiber.ref;
  alt.pendingProps = fiber.pendingProps;
  alt.updateQueue = fiber.updateQueue;
  alt.callbackList = fiber.callbackList;
  alt.pendingWorkPriority = priorityLevel;
  alt.memoizedProps = fiber.memoizedProps;
  alt.output = fiber.output;
  return alt;
};
exports.createHostContainerFiber = function() {
  var fiber = createFiber(HostContainer, null);
  return fiber;
};
exports.createFiberFromElement = function(element, priorityLevel) {
  var fiber = createFiberFromElementType(element.type, element.key);
  fiber.pendingProps = element.props;
  fiber.pendingWorkPriority = priorityLevel;
  return fiber;
};
function createFiberFromElementType(type, key) {
  var fiber = void 0;
  if (typeof type === 'function') {
    fiber = shouldConstruct(type) ? createFiber(ClassComponent, key) : createFiber(IndeterminateComponent, key);
    fiber.type = type;
  } else if (typeof type === 'string') {
    fiber = createFiber(HostComponent, key);
    fiber.type = type;
  } else if (typeof type === 'object' && type !== null) {
    fiber = type;
  } else {
    throw new Error('Unknown component type: ' + typeof type);
  }
  return fiber;
}
exports.createFiberFromElementType = createFiberFromElementType;
exports.createFiberFromCoroutine = function(coroutine, priorityLevel) {
  var fiber = createFiber(CoroutineComponent, coroutine.key);
  fiber.type = coroutine.handler;
  fiber.pendingProps = coroutine;
  fiber.pendingWorkPriority = priorityLevel;
  return fiber;
};
exports.createFiberFromYield = function(yieldNode, priorityLevel) {
  var fiber = createFiber(YieldComponent, yieldNode.key);
  fiber.pendingProps = {};
  return fiber;
};
