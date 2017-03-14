/* */ 
(function(process) {
  'use strict';
  var invariant = require('./invariant');
  var componentRegex = /\./;
  var orRegex = /\|\|/;
  var rangeRegex = /\s+\-\s+/;
  var modifierRegex = /^(<=|<|=|>=|~>|~|>|)?\s*(.+)/;
  var numericRegex = /^(\d*)(.*)/;
  function checkOrExpression(range, version) {
    var expressions = range.split(orRegex);
    if (expressions.length > 1) {
      return expressions.some(function(range) {
        return VersionRange.contains(range, version);
      });
    } else {
      range = expressions[0].trim();
      return checkRangeExpression(range, version);
    }
  }
  function checkRangeExpression(range, version) {
    var expressions = range.split(rangeRegex);
    !(expressions.length > 0 && expressions.length <= 2) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'the "-" operator expects exactly 2 operands') : invariant(false) : void 0;
    if (expressions.length === 1) {
      return checkSimpleExpression(expressions[0], version);
    } else {
      var startVersion = expressions[0],
          endVersion = expressions[1];
      !(isSimpleVersion(startVersion) && isSimpleVersion(endVersion)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'operands to the "-" operator must be simple (no modifiers)') : invariant(false) : void 0;
      return checkSimpleExpression('>=' + startVersion, version) && checkSimpleExpression('<=' + endVersion, version);
    }
  }
  function checkSimpleExpression(range, version) {
    range = range.trim();
    if (range === '') {
      return true;
    }
    var versionComponents = version.split(componentRegex);
    var _getModifierAndCompon = getModifierAndComponents(range),
        modifier = _getModifierAndCompon.modifier,
        rangeComponents = _getModifierAndCompon.rangeComponents;
    switch (modifier) {
      case '<':
        return checkLessThan(versionComponents, rangeComponents);
      case '<=':
        return checkLessThanOrEqual(versionComponents, rangeComponents);
      case '>=':
        return checkGreaterThanOrEqual(versionComponents, rangeComponents);
      case '>':
        return checkGreaterThan(versionComponents, rangeComponents);
      case '~':
      case '~>':
        return checkApproximateVersion(versionComponents, rangeComponents);
      default:
        return checkEqual(versionComponents, rangeComponents);
    }
  }
  function checkLessThan(a, b) {
    return compareComponents(a, b) === -1;
  }
  function checkLessThanOrEqual(a, b) {
    var result = compareComponents(a, b);
    return result === -1 || result === 0;
  }
  function checkEqual(a, b) {
    return compareComponents(a, b) === 0;
  }
  function checkGreaterThanOrEqual(a, b) {
    var result = compareComponents(a, b);
    return result === 1 || result === 0;
  }
  function checkGreaterThan(a, b) {
    return compareComponents(a, b) === 1;
  }
  function checkApproximateVersion(a, b) {
    var lowerBound = b.slice();
    var upperBound = b.slice();
    if (upperBound.length > 1) {
      upperBound.pop();
    }
    var lastIndex = upperBound.length - 1;
    var numeric = parseInt(upperBound[lastIndex], 10);
    if (isNumber(numeric)) {
      upperBound[lastIndex] = numeric + 1 + '';
    }
    return checkGreaterThanOrEqual(a, lowerBound) && checkLessThan(a, upperBound);
  }
  function getModifierAndComponents(range) {
    var rangeComponents = range.split(componentRegex);
    var matches = rangeComponents[0].match(modifierRegex);
    !matches ? process.env.NODE_ENV !== 'production' ? invariant(false, 'expected regex to match but it did not') : invariant(false) : void 0;
    return {
      modifier: matches[1],
      rangeComponents: [matches[2]].concat(rangeComponents.slice(1))
    };
  }
  function isNumber(number) {
    return !isNaN(number) && isFinite(number);
  }
  function isSimpleVersion(range) {
    return !getModifierAndComponents(range).modifier;
  }
  function zeroPad(array, length) {
    for (var i = array.length; i < length; i++) {
      array[i] = '0';
    }
  }
  function normalizeVersions(a, b) {
    a = a.slice();
    b = b.slice();
    zeroPad(a, b.length);
    for (var i = 0; i < b.length; i++) {
      var matches = b[i].match(/^[x*]$/i);
      if (matches) {
        b[i] = a[i] = '0';
        if (matches[0] === '*' && i === b.length - 1) {
          for (var j = i; j < a.length; j++) {
            a[j] = '0';
          }
        }
      }
    }
    zeroPad(b, a.length);
    return [a, b];
  }
  function compareNumeric(a, b) {
    var aPrefix = a.match(numericRegex)[1];
    var bPrefix = b.match(numericRegex)[1];
    var aNumeric = parseInt(aPrefix, 10);
    var bNumeric = parseInt(bPrefix, 10);
    if (isNumber(aNumeric) && isNumber(bNumeric) && aNumeric !== bNumeric) {
      return compare(aNumeric, bNumeric);
    } else {
      return compare(a, b);
    }
  }
  function compare(a, b) {
    !(typeof a === typeof b) ? process.env.NODE_ENV !== 'production' ? invariant(false, '"a" and "b" must be of the same type') : invariant(false) : void 0;
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  }
  function compareComponents(a, b) {
    var _normalizeVersions = normalizeVersions(a, b),
        aNormalized = _normalizeVersions[0],
        bNormalized = _normalizeVersions[1];
    for (var i = 0; i < bNormalized.length; i++) {
      var result = compareNumeric(aNormalized[i], bNormalized[i]);
      if (result) {
        return result;
      }
    }
    return 0;
  }
  var VersionRange = {contains: function contains(range, version) {
      return checkOrExpression(range.trim(), version.trim());
    }};
  module.exports = VersionRange;
})(require('process'));
