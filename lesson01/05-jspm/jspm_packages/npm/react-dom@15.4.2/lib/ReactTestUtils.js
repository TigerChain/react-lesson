/* */ 
(function(process) {
  'use strict';
  var _prodInvariant = require('./reactProdInvariant'),
      _assign = require('object-assign');
  var EventConstants = require('./EventConstants');
  var EventPluginHub = require('./EventPluginHub');
  var EventPluginRegistry = require('./EventPluginRegistry');
  var EventPropagators = require('./EventPropagators');
  var React = require('react/lib/React');
  var ReactDOM = require('./ReactDOM');
  var ReactDOMComponentTree = require('./ReactDOMComponentTree');
  var ReactBrowserEventEmitter = require('./ReactBrowserEventEmitter');
  var ReactInstanceMap = require('./ReactInstanceMap');
  var ReactUpdates = require('./ReactUpdates');
  var SyntheticEvent = require('./SyntheticEvent');
  var ReactShallowRenderer = require('./ReactShallowRenderer');
  var findDOMNode = require('./findDOMNode');
  var invariant = require('fbjs/lib/invariant');
  var topLevelTypes = EventConstants.topLevelTypes;
  function Event(suffix) {}
  function findAllInRenderedTreeInternal(inst, test) {
    if (!inst || !inst.getPublicInstance) {
      return [];
    }
    var publicInst = inst.getPublicInstance();
    var ret = test(publicInst) ? [publicInst] : [];
    var currentElement = inst._currentElement;
    if (ReactTestUtils.isDOMComponent(publicInst)) {
      var renderedChildren = inst._renderedChildren;
      var key;
      for (key in renderedChildren) {
        if (!renderedChildren.hasOwnProperty(key)) {
          continue;
        }
        ret = ret.concat(findAllInRenderedTreeInternal(renderedChildren[key], test));
      }
    } else if (React.isValidElement(currentElement) && typeof currentElement.type === 'function') {
      ret = ret.concat(findAllInRenderedTreeInternal(inst._renderedComponent, test));
    }
    return ret;
  }
  var ReactTestUtils = {
    renderIntoDocument: function(element) {
      var div = document.createElement('div');
      return ReactDOM.render(element, div);
    },
    isElement: function(element) {
      return React.isValidElement(element);
    },
    isElementOfType: function(inst, convenienceConstructor) {
      return React.isValidElement(inst) && inst.type === convenienceConstructor;
    },
    isDOMComponent: function(inst) {
      return !!(inst && inst.nodeType === 1 && inst.tagName);
    },
    isDOMComponentElement: function(inst) {
      return !!(inst && React.isValidElement(inst) && !!inst.tagName);
    },
    isCompositeComponent: function(inst) {
      if (ReactTestUtils.isDOMComponent(inst)) {
        return false;
      }
      return inst != null && typeof inst.render === 'function' && typeof inst.setState === 'function';
    },
    isCompositeComponentWithType: function(inst, type) {
      if (!ReactTestUtils.isCompositeComponent(inst)) {
        return false;
      }
      var internalInstance = ReactInstanceMap.get(inst);
      var constructor = internalInstance._currentElement.type;
      return constructor === type;
    },
    isCompositeComponentElement: function(inst) {
      if (!React.isValidElement(inst)) {
        return false;
      }
      var prototype = inst.type.prototype;
      return typeof prototype.render === 'function' && typeof prototype.setState === 'function';
    },
    isCompositeComponentElementWithType: function(inst, type) {
      var internalInstance = ReactInstanceMap.get(inst);
      var constructor = internalInstance._currentElement.type;
      return !!(ReactTestUtils.isCompositeComponentElement(inst) && constructor === type);
    },
    getRenderedChildOfCompositeComponent: function(inst) {
      if (!ReactTestUtils.isCompositeComponent(inst)) {
        return null;
      }
      var internalInstance = ReactInstanceMap.get(inst);
      return internalInstance._renderedComponent.getPublicInstance();
    },
    findAllInRenderedTree: function(inst, test) {
      if (!inst) {
        return [];
      }
      !ReactTestUtils.isCompositeComponent(inst) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'findAllInRenderedTree(...): instance must be a composite component') : _prodInvariant('10') : void 0;
      return findAllInRenderedTreeInternal(ReactInstanceMap.get(inst), test);
    },
    scryRenderedDOMComponentsWithClass: function(root, classNames) {
      return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
        if (ReactTestUtils.isDOMComponent(inst)) {
          var className = inst.className;
          if (typeof className !== 'string') {
            className = inst.getAttribute('class') || '';
          }
          var classList = className.split(/\s+/);
          if (!Array.isArray(classNames)) {
            !(classNames !== undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'TestUtils.scryRenderedDOMComponentsWithClass expects a className as a second argument.') : _prodInvariant('11') : void 0;
            classNames = classNames.split(/\s+/);
          }
          return classNames.every(function(name) {
            return classList.indexOf(name) !== -1;
          });
        }
        return false;
      });
    },
    findRenderedDOMComponentWithClass: function(root, className) {
      var all = ReactTestUtils.scryRenderedDOMComponentsWithClass(root, className);
      if (all.length !== 1) {
        throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for class:' + className);
      }
      return all[0];
    },
    scryRenderedDOMComponentsWithTag: function(root, tagName) {
      return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
        return ReactTestUtils.isDOMComponent(inst) && inst.tagName.toUpperCase() === tagName.toUpperCase();
      });
    },
    findRenderedDOMComponentWithTag: function(root, tagName) {
      var all = ReactTestUtils.scryRenderedDOMComponentsWithTag(root, tagName);
      if (all.length !== 1) {
        throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for tag:' + tagName);
      }
      return all[0];
    },
    scryRenderedComponentsWithType: function(root, componentType) {
      return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
        return ReactTestUtils.isCompositeComponentWithType(inst, componentType);
      });
    },
    findRenderedComponentWithType: function(root, componentType) {
      var all = ReactTestUtils.scryRenderedComponentsWithType(root, componentType);
      if (all.length !== 1) {
        throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for componentType:' + componentType);
      }
      return all[0];
    },
    mockComponent: function(module, mockTagName) {
      mockTagName = mockTagName || module.mockTagName || 'div';
      module.prototype.render.mockImplementation(function() {
        return React.createElement(mockTagName, null, this.props.children);
      });
      return this;
    },
    simulateNativeEventOnNode: function(topLevelType, node, fakeNativeEvent) {
      fakeNativeEvent.target = node;
      ReactBrowserEventEmitter.ReactEventListener.dispatchEvent(topLevelType, fakeNativeEvent);
    },
    simulateNativeEventOnDOMComponent: function(topLevelType, comp, fakeNativeEvent) {
      ReactTestUtils.simulateNativeEventOnNode(topLevelType, findDOMNode(comp), fakeNativeEvent);
    },
    nativeTouchData: function(x, y) {
      return {touches: [{
          pageX: x,
          pageY: y
        }]};
    },
    createRenderer: function() {
      return new ReactShallowRenderer();
    },
    Simulate: null,
    SimulateNative: {}
  };
  function makeSimulator(eventType) {
    return function(domComponentOrNode, eventData) {
      var node;
      !!React.isValidElement(domComponentOrNode) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'TestUtils.Simulate expects a component instance and not a ReactElement.TestUtils.Simulate will not work if you are using shallow rendering.') : _prodInvariant('14') : void 0;
      if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
        node = findDOMNode(domComponentOrNode);
      } else if (domComponentOrNode.tagName) {
        node = domComponentOrNode;
      }
      var dispatchConfig = EventPluginRegistry.eventNameDispatchConfigs[eventType];
      var fakeNativeEvent = new Event();
      fakeNativeEvent.target = node;
      fakeNativeEvent.type = eventType.toLowerCase();
      var event = new SyntheticEvent(dispatchConfig, ReactDOMComponentTree.getInstanceFromNode(node), fakeNativeEvent, node);
      event.persist();
      _assign(event, eventData);
      if (dispatchConfig.phasedRegistrationNames) {
        EventPropagators.accumulateTwoPhaseDispatches(event);
      } else {
        EventPropagators.accumulateDirectDispatches(event);
      }
      ReactUpdates.batchedUpdates(function() {
        EventPluginHub.enqueueEvents(event);
        EventPluginHub.processEventQueue(true);
      });
    };
  }
  function buildSimulators() {
    ReactTestUtils.Simulate = {};
    var eventType;
    for (eventType in EventPluginRegistry.eventNameDispatchConfigs) {
      ReactTestUtils.Simulate[eventType] = makeSimulator(eventType);
    }
  }
  var oldInjectEventPluginOrder = EventPluginHub.injection.injectEventPluginOrder;
  EventPluginHub.injection.injectEventPluginOrder = function() {
    oldInjectEventPluginOrder.apply(this, arguments);
    buildSimulators();
  };
  var oldInjectEventPlugins = EventPluginHub.injection.injectEventPluginsByName;
  EventPluginHub.injection.injectEventPluginsByName = function() {
    oldInjectEventPlugins.apply(this, arguments);
    buildSimulators();
  };
  buildSimulators();
  function makeNativeSimulator(eventType) {
    return function(domComponentOrNode, nativeEventData) {
      var fakeNativeEvent = new Event(eventType);
      _assign(fakeNativeEvent, nativeEventData);
      if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
        ReactTestUtils.simulateNativeEventOnDOMComponent(eventType, domComponentOrNode, fakeNativeEvent);
      } else if (domComponentOrNode.tagName) {
        ReactTestUtils.simulateNativeEventOnNode(eventType, domComponentOrNode, fakeNativeEvent);
      }
    };
  }
  Object.keys(topLevelTypes).forEach(function(eventType) {
    var convenienceName = eventType.indexOf('top') === 0 ? eventType.charAt(3).toLowerCase() + eventType.substr(4) : eventType;
    ReactTestUtils.SimulateNative[convenienceName] = makeNativeSimulator(eventType);
  });
  module.exports = ReactTestUtils;
})(require('process'));
