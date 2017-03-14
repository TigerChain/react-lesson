/* */ 
'use strict';
var partitionObject = require('./partitionObject');
function partitionObjectByKey(source, whitelist) {
  return partitionObject(source, function(_, key) {
    return whitelist.has(key);
  });
}
module.exports = partitionObjectByKey;
