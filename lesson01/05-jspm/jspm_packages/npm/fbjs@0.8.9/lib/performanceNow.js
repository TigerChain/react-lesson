/* */ 
'use strict';
var performance = require('./performance');
var performanceNow;
if (performance.now) {
  performanceNow = function performanceNow() {
    return performance.now();
  };
} else {
  performanceNow = function performanceNow() {
    return Date.now();
  };
}
module.exports = performanceNow;
