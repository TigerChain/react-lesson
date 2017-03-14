/* */ 
(function(process) {
  'use strict';
  var _prodInvariant = require('./reactProdInvariant');
  var invariant = require('fbjs/lib/invariant');
  var eventPluginOrder = null;
  var namesToPlugins = {};
  function recomputePluginOrdering() {
    if (!eventPluginOrder) {
      return;
    }
    for (var pluginName in namesToPlugins) {
      var pluginModule = namesToPlugins[pluginName];
      var pluginIndex = eventPluginOrder.indexOf(pluginName);
      !(pluginIndex > -1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.', pluginName) : _prodInvariant('96', pluginName) : void 0;
      if (EventPluginRegistry.plugins[pluginIndex]) {
        continue;
      }
      !pluginModule.extractEvents ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.', pluginName) : _prodInvariant('97', pluginName) : void 0;
      EventPluginRegistry.plugins[pluginIndex] = pluginModule;
      var publishedEvents = pluginModule.eventTypes;
      for (var eventName in publishedEvents) {
        !publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : _prodInvariant('98', eventName, pluginName) : void 0;
      }
    }
  }
  function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
    !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.', eventName) : _prodInvariant('99', eventName) : void 0;
    EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;
    var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
    if (phasedRegistrationNames) {
      for (var phaseName in phasedRegistrationNames) {
        if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
          var phasedRegistrationName = phasedRegistrationNames[phaseName];
          publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
        }
      }
      return true;
    } else if (dispatchConfig.registrationName) {
      publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
      return true;
    }
    return false;
  }
  function publishRegistrationName(registrationName, pluginModule, eventName) {
    !!EventPluginRegistry.registrationNameModules[registrationName] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.', registrationName) : _prodInvariant('100', registrationName) : void 0;
    EventPluginRegistry.registrationNameModules[registrationName] = pluginModule;
    EventPluginRegistry.registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCasedName = registrationName.toLowerCase();
      EventPluginRegistry.possibleRegistrationNames[lowerCasedName] = registrationName;
      if (registrationName === 'onDoubleClick') {
        EventPluginRegistry.possibleRegistrationNames.ondblclick = registrationName;
      }
    }
  }
  var EventPluginRegistry = {
    plugins: [],
    eventNameDispatchConfigs: {},
    registrationNameModules: {},
    registrationNameDependencies: {},
    possibleRegistrationNames: process.env.NODE_ENV !== 'production' ? {} : null,
    injectEventPluginOrder: function(injectedEventPluginOrder) {
      !!eventPluginOrder ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.') : _prodInvariant('101') : void 0;
      eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
      recomputePluginOrdering();
    },
    injectEventPluginsByName: function(injectedNamesToPlugins) {
      var isOrderingDirty = false;
      for (var pluginName in injectedNamesToPlugins) {
        if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
          continue;
        }
        var pluginModule = injectedNamesToPlugins[pluginName];
        if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
          !!namesToPlugins[pluginName] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.', pluginName) : _prodInvariant('102', pluginName) : void 0;
          namesToPlugins[pluginName] = pluginModule;
          isOrderingDirty = true;
        }
      }
      if (isOrderingDirty) {
        recomputePluginOrdering();
      }
    },
    getPluginModuleForEvent: function(event) {
      var dispatchConfig = event.dispatchConfig;
      if (dispatchConfig.registrationName) {
        return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName] || null;
      }
      if (dispatchConfig.phasedRegistrationNames !== undefined) {
        var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
        for (var phase in phasedRegistrationNames) {
          if (!phasedRegistrationNames.hasOwnProperty(phase)) {
            continue;
          }
          var pluginModule = EventPluginRegistry.registrationNameModules[phasedRegistrationNames[phase]];
          if (pluginModule) {
            return pluginModule;
          }
        }
      }
      return null;
    },
    _resetEventPlugins: function() {
      eventPluginOrder = null;
      for (var pluginName in namesToPlugins) {
        if (namesToPlugins.hasOwnProperty(pluginName)) {
          delete namesToPlugins[pluginName];
        }
      }
      EventPluginRegistry.plugins.length = 0;
      var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
      for (var eventName in eventNameDispatchConfigs) {
        if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
          delete eventNameDispatchConfigs[eventName];
        }
      }
      var registrationNameModules = EventPluginRegistry.registrationNameModules;
      for (var registrationName in registrationNameModules) {
        if (registrationNameModules.hasOwnProperty(registrationName)) {
          delete registrationNameModules[registrationName];
        }
      }
      if (process.env.NODE_ENV !== 'production') {
        var possibleRegistrationNames = EventPluginRegistry.possibleRegistrationNames;
        for (var lowerCasedName in possibleRegistrationNames) {
          if (possibleRegistrationNames.hasOwnProperty(lowerCasedName)) {
            delete possibleRegistrationNames[lowerCasedName];
          }
        }
      }
    }
  };
  module.exports = EventPluginRegistry;
})(require('process'));
