/* */ 
'use strict';
var enumerate = require('./enumerate');
function equalsIterable(one, two, areEqual) {
  if (one === two) {
    return true;
  }
  var oneSize = maybeGetSize(one);
  var twoSize = maybeGetSize(two);
  if (oneSize != null && twoSize != null && oneSize !== twoSize) {
    return false;
  }
  var oneIterator = enumerate(one);
  var oneItem = oneIterator.next();
  var twoIterator = enumerate(two);
  var twoItem = twoIterator.next();
  var safeAreEqual = areEqual || referenceEquality;
  while (!(oneItem.done || twoItem.done)) {
    if (!safeAreEqual(oneItem.value, twoItem.value)) {
      return false;
    }
    oneItem = oneIterator.next();
    twoItem = twoIterator.next();
  }
  return oneItem.done === twoItem.done;
}
function maybeGetSize(o) {
  if (o == null) {
    return null;
  }
  if (typeof o.size === 'number') {
    return o.size;
  }
  if (typeof o.length === 'number') {
    return o.length;
  }
  return null;
}
function referenceEquality(one, two) {
  return one === two;
}
module.exports = equalsIterable;
