/* */ 
(function(process) {
  'use strict';
  var _prodInvariant = require('./reactProdInvariant'),
      _assign = require('object-assign');
  var ReactCompositeComponent = require('./ReactCompositeComponent');
  var ReactEmptyComponent = require('./ReactEmptyComponent');
  var ReactHostComponent = require('./ReactHostComponent');
  var getNextDebugID = require('./getNextDebugID');
  var invariant = require('fbjs/lib/invariant');
  var warning = require('fbjs/lib/warning');
  var ReactCompositeComponentWrapper = function(element) {
    this.construct(element);
  };
  _assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent, {_instantiateReactComponent: instantiateReactComponent});
  function getDeclarationErrorAddendum(owner) {
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' Check the render method of `' + name + '`.';
      }
    }
    return '';
  }
  function isInternalComponentType(type) {
    return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
  }
  function instantiateReactComponent(node, shouldHaveDebugID) {
    var instance;
    if (node === null || node === false) {
      instance = ReactEmptyComponent.create(instantiateReactComponent);
    } else if (typeof node === 'object') {
      var element = node;
      var type = element.type;
      if (typeof type !== 'function' && typeof type !== 'string') {
        var info = '';
        if (process.env.NODE_ENV !== 'production') {
          if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
            info += ' You likely forgot to export your component from the file ' + 'it\'s defined in.';
          }
        }
        info += getDeclarationErrorAddendum(element._owner);
        !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s', type == null ? type : typeof type, info) : _prodInvariant('130', type == null ? type : typeof type, info) : void 0;
      }
      if (typeof element.type === 'string') {
        instance = ReactHostComponent.createInternalComponent(element);
      } else if (isInternalComponentType(element.type)) {
        instance = new element.type(element);
        if (!instance.getHostNode) {
          instance.getHostNode = instance.getNativeNode;
        }
      } else {
        instance = new ReactCompositeComponentWrapper(element);
      }
    } else if (typeof node === 'string' || typeof node === 'number') {
      instance = ReactHostComponent.createInstanceForText(node);
    } else {
      !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Encountered invalid React node of type %s', typeof node) : _prodInvariant('131', typeof node) : void 0;
    }
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.getHostNode === 'function' && typeof instance.unmountComponent === 'function', 'Only React Components can be mounted.') : void 0;
    }
    instance._mountIndex = 0;
    instance._mountImage = null;
    if (process.env.NODE_ENV !== 'production') {
      instance._debugID = shouldHaveDebugID ? getNextDebugID() : 0;
    }
    if (process.env.NODE_ENV !== 'production') {
      if (Object.preventExtensions) {
        Object.preventExtensions(instance);
      }
    }
    return instance;
  }
  module.exports = instantiateReactComponent;
})(require('process'));
