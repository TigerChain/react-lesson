/* */ 
(function(process) {
  'use strict';
  var invariant = require('./invariant');
  function matchesSelector_SLOW(element, selector) {
    var root = element;
    while (root.parentNode) {
      root = root.parentNode;
    }
    var all = root.querySelectorAll(selector);
    return Array.prototype.indexOf.call(all, element) !== -1;
  }
  var CSSCore = {
    addClass: function addClass(element, className) {
      !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSSCore.addClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(false) : void 0;
      if (className) {
        if (element.classList) {
          element.classList.add(className);
        } else if (!CSSCore.hasClass(element, className)) {
          element.className = element.className + ' ' + className;
        }
      }
      return element;
    },
    removeClass: function removeClass(element, className) {
      !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSSCore.removeClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(false) : void 0;
      if (className) {
        if (element.classList) {
          element.classList.remove(className);
        } else if (CSSCore.hasClass(element, className)) {
          element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
        }
      }
      return element;
    },
    conditionClass: function conditionClass(element, className, bool) {
      return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
    },
    hasClass: function hasClass(element, className) {
      !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSS.hasClass takes only a single class name.') : invariant(false) : void 0;
      if (element.classList) {
        return !!className && element.classList.contains(className);
      }
      return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    },
    matchesSelector: function matchesSelector(element, selector) {
      var matchesImpl = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.msMatchesSelector || function(s) {
        return matchesSelector_SLOW(element, s);
      };
      return matchesImpl.call(element, selector);
    }
  };
  module.exports = CSSCore;
})(require('process'));
