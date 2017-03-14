/* */ 
(function(process) {
  'use strict';
  var DOMProperty = require('./DOMProperty');
  var ReactComponentTreeHook = require('react/lib/ReactComponentTreeHook');
  var warning = require('fbjs/lib/warning');
  var warnedProperties = {};
  var rARIA = new RegExp('^(aria)-[' + DOMProperty.ATTRIBUTE_NAME_CHAR + ']*$');
  function validateProperty(tagName, name, debugID) {
    if (warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
      return true;
    }
    if (rARIA.test(name)) {
      var lowerCasedName = name.toLowerCase();
      var standardName = DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ? DOMProperty.getPossibleStandardName[lowerCasedName] : null;
      if (standardName == null) {
        warnedProperties[name] = true;
        return false;
      }
      if (name !== standardName) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'Unknown ARIA attribute %s. Did you mean %s?%s', name, standardName, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
        warnedProperties[name] = true;
        return true;
      }
    }
    return true;
  }
  function warnInvalidARIAProps(debugID, element) {
    var invalidProps = [];
    for (var key in element.props) {
      var isValid = validateProperty(element.type, key, debugID);
      if (!isValid) {
        invalidProps.push(key);
      }
    }
    var unknownPropString = invalidProps.map(function(prop) {
      return '`' + prop + '`';
    }).join(', ');
    if (invalidProps.length === 1) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid aria prop %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, element.type, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
    } else if (invalidProps.length > 1) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid aria props %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, element.type, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
    }
  }
  function handleElement(debugID, element) {
    if (element == null || typeof element.type !== 'string') {
      return;
    }
    if (element.type.indexOf('-') >= 0 || element.props.is) {
      return;
    }
    warnInvalidARIAProps(debugID, element);
  }
  var ReactDOMInvalidARIAHook = {
    onBeforeMountComponent: function(debugID, element) {
      if (process.env.NODE_ENV !== 'production') {
        handleElement(debugID, element);
      }
    },
    onBeforeUpdateComponent: function(debugID, element) {
      if (process.env.NODE_ENV !== 'production') {
        handleElement(debugID, element);
      }
    }
  };
  module.exports = ReactDOMInvalidARIAHook;
})(require('process'));
