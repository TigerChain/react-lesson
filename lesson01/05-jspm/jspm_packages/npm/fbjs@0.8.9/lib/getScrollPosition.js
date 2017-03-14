/* */ 
'use strict';
var getDocumentScrollElement = require('./getDocumentScrollElement');
var getUnboundedScrollPosition = require('./getUnboundedScrollPosition');
function getScrollPosition(scrollable) {
  var documentScrollElement = getDocumentScrollElement();
  if (scrollable === window) {
    scrollable = documentScrollElement;
  }
  var scrollPosition = getUnboundedScrollPosition(scrollable);
  var viewport = scrollable === documentScrollElement ? document.documentElement : scrollable;
  var xMax = scrollable.scrollWidth - viewport.clientWidth;
  var yMax = scrollable.scrollHeight - viewport.clientHeight;
  scrollPosition.x = Math.max(0, Math.min(scrollPosition.x, xMax));
  scrollPosition.y = Math.max(0, Math.min(scrollPosition.y, yMax));
  return scrollPosition;
}
module.exports = getScrollPosition;
