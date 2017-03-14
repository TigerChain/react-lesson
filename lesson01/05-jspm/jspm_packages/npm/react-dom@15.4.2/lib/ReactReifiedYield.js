/* */ 
'use strict';
var _require = require('./ReactFiber'),
    createFiberFromElementType = _require.createFiberFromElementType;
exports.createReifiedYield = function(yieldNode) {
  var fiber = createFiberFromElementType(yieldNode.continuation, yieldNode.key);
  return {
    continuation: fiber,
    props: yieldNode.props
  };
};
exports.createUpdatedReifiedYield = function(previousYield, yieldNode) {
  return {
    continuation: previousYield.continuation,
    props: yieldNode.props
  };
};
