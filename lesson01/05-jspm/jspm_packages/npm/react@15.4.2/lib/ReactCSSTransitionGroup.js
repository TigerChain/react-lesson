/* */ 
'use strict';
var _assign = require('object-assign');
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }});
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var React = require('./React');
var ReactTransitionGroup = require('./ReactTransitionGroup');
var ReactCSSTransitionGroupChild = require('./ReactCSSTransitionGroupChild');
function createTransitionTimeoutPropValidator(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;
  return function(props) {
    if (props[enabledPropName]) {
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + ' wasn\'t supplied to ReactCSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }
  };
}
var ReactCSSTransitionGroup = function(_React$Component) {
  _inherits(ReactCSSTransitionGroup, _React$Component);
  function ReactCSSTransitionGroup() {
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, ReactCSSTransitionGroup);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this._wrapChild = function(child) {
      return React.createElement(ReactCSSTransitionGroupChild, {
        name: _this.props.transitionName,
        appear: _this.props.transitionAppear,
        enter: _this.props.transitionEnter,
        leave: _this.props.transitionLeave,
        appearTimeout: _this.props.transitionAppearTimeout,
        enterTimeout: _this.props.transitionEnterTimeout,
        leaveTimeout: _this.props.transitionLeaveTimeout
      }, child);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  ReactCSSTransitionGroup.prototype.render = function render() {
    return React.createElement(ReactTransitionGroup, _assign({}, this.props, {childFactory: this._wrapChild}));
  };
  return ReactCSSTransitionGroup;
}(React.Component);
ReactCSSTransitionGroup.displayName = 'ReactCSSTransitionGroup';
ReactCSSTransitionGroup.propTypes = {
  transitionName: ReactCSSTransitionGroupChild.propTypes.name,
  transitionAppear: React.PropTypes.bool,
  transitionEnter: React.PropTypes.bool,
  transitionLeave: React.PropTypes.bool,
  transitionAppearTimeout: createTransitionTimeoutPropValidator('Appear'),
  transitionEnterTimeout: createTransitionTimeoutPropValidator('Enter'),
  transitionLeaveTimeout: createTransitionTimeoutPropValidator('Leave')
};
ReactCSSTransitionGroup.defaultProps = {
  transitionAppear: false,
  transitionEnter: true,
  transitionLeave: true
};
module.exports = ReactCSSTransitionGroup;
