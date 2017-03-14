/* */ 
'use strict';
var forEachObject = require('./forEachObject');
function partitionObject(object, callback, context) {
  var first = {};
  var second = {};
  forEachObject(object, function(value, key) {
    if (callback.call(context, value, key, object)) {
      first[key] = value;
    } else {
      second[key] = value;
    }
  });
  return [first, second];
}
module.exports = partitionObject;
