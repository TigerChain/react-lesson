/* */ 
'use strict';
var everySet = require('./everySet');
function equalsSet(one, two) {
  if (one.size !== two.size) {
    return false;
  }
  return everySet(one, function(value) {
    return two.has(value);
  });
}
module.exports = equalsSet;
