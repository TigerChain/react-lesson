/* */ 
'use strict';
var Set = require('./Set');
var emptyFunction = require('./emptyFunction');
function countDistinct(iter, selector) {
  selector = selector || emptyFunction.thatReturnsArgument;
  var set = new Set();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;
  try {
    for (var _iterator = iter[Symbol.iterator](),
        _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var val = _step.value;
      set.add(selector(val));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return set.size;
}
module.exports = countDistinct;
