/* */ 
'use strict';
var Set = require('./Set');
function distinctArray(xs) {
  return Array.from(new Set(xs).values());
}
module.exports = distinctArray;
