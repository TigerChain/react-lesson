/* */ 
(function(process) {
  'use strict';
  var _assign = require('object-assign');
  var EventPluginRegistry = require('./EventPluginRegistry');
  var ReactEventEmitterMixin = require('./ReactEventEmitterMixin');
  var ViewportMetrics = require('./ViewportMetrics');
  var getVendorPrefixedEventName = require('./getVendorPrefixedEventName');
  var isEventSupported = require('./isEventSupported');
  var hasEventPageXY;
  var alreadyListeningTo = {};
  var isMonitoringScrollValue = false;
  var reactTopListenersCounter = 0;
  var topEventMapping = {
    topAbort: 'abort',
    topAnimationEnd: getVendorPrefixedEventName('animationend') || 'animationend',
    topAnimationIteration: getVendorPrefixedEventName('animationiteration') || 'animationiteration',
    topAnimationStart: getVendorPrefixedEventName('animationstart') || 'animationstart',
    topBlur: 'blur',
    topCanPlay: 'canplay',
    topCanPlayThrough: 'canplaythrough',
    topChange: 'change',
    topClick: 'click',
    topCompositionEnd: 'compositionend',
    topCompositionStart: 'compositionstart',
    topCompositionUpdate: 'compositionupdate',
    topContextMenu: 'contextmenu',
    topCopy: 'copy',
    topCut: 'cut',
    topDoubleClick: 'dblclick',
    topDrag: 'drag',
    topDragEnd: 'dragend',
    topDragEnter: 'dragenter',
    topDragExit: 'dragexit',
    topDragLeave: 'dragleave',
    topDragOver: 'dragover',
    topDragStart: 'dragstart',
    topDrop: 'drop',
    topDurationChange: 'durationchange',
    topEmptied: 'emptied',
    topEncrypted: 'encrypted',
    topEnded: 'ended',
    topError: 'error',
    topFocus: 'focus',
    topInput: 'input',
    topKeyDown: 'keydown',
    topKeyPress: 'keypress',
    topKeyUp: 'keyup',
    topLoadedData: 'loadeddata',
    topLoadedMetadata: 'loadedmetadata',
    topLoadStart: 'loadstart',
    topMouseDown: 'mousedown',
    topMouseMove: 'mousemove',
    topMouseOut: 'mouseout',
    topMouseOver: 'mouseover',
    topMouseUp: 'mouseup',
    topPaste: 'paste',
    topPause: 'pause',
    topPlay: 'play',
    topPlaying: 'playing',
    topProgress: 'progress',
    topRateChange: 'ratechange',
    topScroll: 'scroll',
    topSeeked: 'seeked',
    topSeeking: 'seeking',
    topSelectionChange: 'selectionchange',
    topStalled: 'stalled',
    topSuspend: 'suspend',
    topTextInput: 'textInput',
    topTimeUpdate: 'timeupdate',
    topTouchCancel: 'touchcancel',
    topTouchEnd: 'touchend',
    topTouchMove: 'touchmove',
    topTouchStart: 'touchstart',
    topTransitionEnd: getVendorPrefixedEventName('transitionend') || 'transitionend',
    topVolumeChange: 'volumechange',
    topWaiting: 'waiting',
    topWheel: 'wheel'
  };
  var topListenersIDKey = '_reactListenersID' + String(Math.random()).slice(2);
  function getListeningForDocument(mountAt) {
    if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
      mountAt[topListenersIDKey] = reactTopListenersCounter++;
      alreadyListeningTo[mountAt[topListenersIDKey]] = {};
    }
    return alreadyListeningTo[mountAt[topListenersIDKey]];
  }
  var ReactBrowserEventEmitter = _assign({}, ReactEventEmitterMixin, {
    ReactEventListener: null,
    injection: {injectReactEventListener: function(ReactEventListener) {
        ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
        ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
      }},
    setEnabled: function(enabled) {
      if (ReactBrowserEventEmitter.ReactEventListener) {
        ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
      }
    },
    isEnabled: function() {
      return !!(ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled());
    },
    listenTo: function(registrationName, contentDocumentHandle) {
      var mountAt = contentDocumentHandle;
      var isListening = getListeningForDocument(mountAt);
      var dependencies = EventPluginRegistry.registrationNameDependencies[registrationName];
      for (var i = 0; i < dependencies.length; i++) {
        var dependency = dependencies[i];
        if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
          if (dependency === 'topWheel') {
            if (isEventSupported('wheel')) {
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'wheel', mountAt);
            } else if (isEventSupported('mousewheel')) {
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'mousewheel', mountAt);
            } else {
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'DOMMouseScroll', mountAt);
            }
          } else if (dependency === 'topScroll') {
            if (isEventSupported('scroll', true)) {
              ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topScroll', 'scroll', mountAt);
            } else {
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topScroll', 'scroll', ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE);
            }
          } else if (dependency === 'topFocus' || dependency === 'topBlur') {
            if (isEventSupported('focus', true)) {
              ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topFocus', 'focus', mountAt);
              ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topBlur', 'blur', mountAt);
            } else if (isEventSupported('focusin')) {
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topFocus', 'focusin', mountAt);
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topBlur', 'focusout', mountAt);
            }
            isListening.topBlur = true;
            isListening.topFocus = true;
          } else if (topEventMapping.hasOwnProperty(dependency)) {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
          }
          isListening[dependency] = true;
        }
      }
    },
    trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
      return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
    },
    trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
      return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
    },
    supportsEventPageXY: function() {
      if (!document.createEvent) {
        return false;
      }
      var ev = document.createEvent('MouseEvent');
      return ev != null && 'pageX' in ev;
    },
    ensureScrollValueMonitoring: function() {
      if (hasEventPageXY === undefined) {
        hasEventPageXY = ReactBrowserEventEmitter.supportsEventPageXY();
      }
      if (!hasEventPageXY && !isMonitoringScrollValue) {
        var refresh = ViewportMetrics.refreshScrollValues;
        ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
        isMonitoringScrollValue = true;
      }
    }
  });
  module.exports = ReactBrowserEventEmitter;
})(require('process'));
