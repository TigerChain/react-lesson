/* */ 
'use strict';
var getStyleProperty = require('./getStyleProperty');
function _isNodeScrollable(element, name) {
  var overflow = Style.get(element, name);
  return overflow === 'auto' || overflow === 'scroll';
}
var Style = {
  get: getStyleProperty,
  getScrollParent: function getScrollParent(node) {
    if (!node) {
      return null;
    }
    while (node && node !== document.body) {
      if (_isNodeScrollable(node, 'overflow') || _isNodeScrollable(node, 'overflowY') || _isNodeScrollable(node, 'overflowX')) {
        return node;
      }
      node = node.parentNode;
    }
    return window;
  }
};
module.exports = Style;
