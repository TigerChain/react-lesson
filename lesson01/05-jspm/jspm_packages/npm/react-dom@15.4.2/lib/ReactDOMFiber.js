/* */ 
(function(process) {
  'use strict';
  var ReactFiberReconciler = require('./ReactFiberReconciler');
  var warning = require('fbjs/lib/warning');
  function recursivelyAppendChildren(parent, child) {
    if (!child) {
      return;
    }
    if (child.nodeType === 1) {
      parent.appendChild(child);
    } else {
      var node = child;
      do {
        recursivelyAppendChildren(parent, node.output);
      } while (node = node.sibling);
    }
  }
  var DOMRenderer = ReactFiberReconciler({
    updateContainer: function(container, children) {
      container.innerHTML = '';
      recursivelyAppendChildren(container, children);
    },
    createInstance: function(type, props, children) {
      var domElement = document.createElement(type);
      recursivelyAppendChildren(domElement, children);
      if (typeof props.children === 'string') {
        domElement.textContent = props.children;
      }
      return domElement;
    },
    prepareUpdate: function(domElement, oldProps, newProps, children) {
      return true;
    },
    commitUpdate: function(domElement, oldProps, newProps, children) {
      domElement.innerHTML = '';
      recursivelyAppendChildren(domElement, children);
      if (typeof newProps.children === 'string') {
        domElement.textContent = newProps.children;
      }
    },
    deleteInstance: function(instance) {},
    scheduleAnimationCallback: window.requestAnimationFrame,
    scheduleDeferredCallback: window.requestIdleCallback
  });
  var warned = false;
  function warnAboutUnstableUse() {
    process.env.NODE_ENV !== 'production' ? warning(warned, 'You are using React DOM Fiber which is an experimental renderer. ' + 'It is likely to have bugs, breaking changes and is unsupported.') : void 0;
    warned = true;
  }
  var ReactDOM = {
    render: function(element, container) {
      warnAboutUnstableUse();
      if (!container._reactRootContainer) {
        container._reactRootContainer = DOMRenderer.mountContainer(element, container);
      } else {
        DOMRenderer.updateContainer(element, container._reactRootContainer);
      }
    },
    unmountComponentAtNode: function(container) {
      warnAboutUnstableUse();
      var root = container._reactRootContainer;
      if (root) {
        container._reactRootContainer = null;
        DOMRenderer.unmountContainer(root);
      }
    }
  };
  module.exports = ReactDOM;
})(require('process'));
