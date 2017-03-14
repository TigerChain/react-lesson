/* */ 
'use strict';
var getElementRect = require('./getElementRect');
function getElementPosition(element) {
  var rect = getElementRect(element);
  return {
    x: rect.left,
    y: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };
}
module.exports = getElementPosition;
