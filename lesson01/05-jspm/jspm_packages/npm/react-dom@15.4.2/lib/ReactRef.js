/* */ 
(function(process) {
  'use strict';
  var ReactOwner = require('./ReactOwner');
  var ReactRef = {};
  function attachRef(ref, component, owner) {
    if (typeof ref === 'function') {
      ref(component.getPublicInstance());
    } else {
      ReactOwner.addComponentAsRefTo(component, ref, owner);
    }
  }
  function detachRef(ref, component, owner) {
    if (typeof ref === 'function') {
      ref(null);
    } else {
      ReactOwner.removeComponentAsRefFrom(component, ref, owner);
    }
  }
  ReactRef.attachRefs = function(instance, element) {
    if (element === null || typeof element !== 'object') {
      return;
    }
    var ref = element.ref;
    if (ref != null) {
      attachRef(ref, instance, element._owner);
    }
  };
  ReactRef.shouldUpdateRefs = function(prevElement, nextElement) {
    var prevRef = null;
    var prevOwner = null;
    if (prevElement !== null && typeof prevElement === 'object') {
      prevRef = prevElement.ref;
      prevOwner = prevElement._owner;
    }
    var nextRef = null;
    var nextOwner = null;
    if (nextElement !== null && typeof nextElement === 'object') {
      nextRef = nextElement.ref;
      nextOwner = nextElement._owner;
    }
    return prevRef !== nextRef || typeof nextRef === 'string' && nextOwner !== prevOwner;
  };
  ReactRef.detachRefs = function(instance, element) {
    if (element === null || typeof element !== 'object') {
      return;
    }
    var ref = element.ref;
    if (ref != null) {
      detachRef(ref, instance, element._owner);
    }
  };
  module.exports = ReactRef;
})(require('process'));
