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
var ReactTransitionChildMapping = require('./ReactTransitionChildMapping');
var emptyFunction = require('fbjs/lib/emptyFunction');
var ReactTransitionGroup = function(_React$Component) {
  _inherits(ReactTransitionGroup, _React$Component);
  function ReactTransitionGroup() {
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, ReactTransitionGroup);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {children: ReactTransitionChildMapping.getChildMapping(_this.props.children)}, _this.performAppear = function(key) {
      _this.currentlyTransitioningKeys[key] = true;
      var component = _this.refs[key];
      if (component.componentWillAppear) {
        component.componentWillAppear(_this._handleDoneAppearing.bind(_this, key));
      } else {
        _this._handleDoneAppearing(key);
      }
    }, _this._handleDoneAppearing = function(key) {
      var component = _this.refs[key];
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }
      delete _this.currentlyTransitioningKeys[key];
      var currentChildMapping = ReactTransitionChildMapping.getChildMapping(_this.props.children);
      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        _this.performLeave(key);
      }
    }, _this.performEnter = function(key) {
      _this.currentlyTransitioningKeys[key] = true;
      var component = _this.refs[key];
      if (component.componentWillEnter) {
        component.componentWillEnter(_this._handleDoneEntering.bind(_this, key));
      } else {
        _this._handleDoneEntering(key);
      }
    }, _this._handleDoneEntering = function(key) {
      var component = _this.refs[key];
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }
      delete _this.currentlyTransitioningKeys[key];
      var currentChildMapping = ReactTransitionChildMapping.getChildMapping(_this.props.children);
      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        _this.performLeave(key);
      }
    }, _this.performLeave = function(key) {
      _this.currentlyTransitioningKeys[key] = true;
      var component = _this.refs[key];
      if (component.componentWillLeave) {
        component.componentWillLeave(_this._handleDoneLeaving.bind(_this, key));
      } else {
        _this._handleDoneLeaving(key);
      }
    }, _this._handleDoneLeaving = function(key) {
      var component = _this.refs[key];
      if (component.componentDidLeave) {
        component.componentDidLeave();
      }
      delete _this.currentlyTransitioningKeys[key];
      var currentChildMapping = ReactTransitionChildMapping.getChildMapping(_this.props.children);
      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        _this.performEnter(key);
      } else {
        _this.setState(function(state) {
          var newChildren = _assign({}, state.children);
          delete newChildren[key];
          return {children: newChildren};
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  ReactTransitionGroup.prototype.componentWillMount = function componentWillMount() {
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
  };
  ReactTransitionGroup.prototype.componentDidMount = function componentDidMount() {
    var initialChildMapping = this.state.children;
    for (var key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key);
      }
    }
  };
  ReactTransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextChildMapping = ReactTransitionChildMapping.getChildMapping(nextProps.children);
    var prevChildMapping = this.state.children;
    this.setState({children: ReactTransitionChildMapping.mergeChildMappings(prevChildMapping, nextChildMapping)});
    var key;
    for (key in nextChildMapping) {
      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
      if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
        this.keysToEnter.push(key);
      }
    }
    for (key in prevChildMapping) {
      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
      if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
        this.keysToLeave.push(key);
      }
    }
  };
  ReactTransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
    var keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(this.performEnter);
    var keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(this.performLeave);
  };
  ReactTransitionGroup.prototype.render = function render() {
    var childrenToRender = [];
    for (var key in this.state.children) {
      var child = this.state.children[key];
      if (child) {
        childrenToRender.push(React.cloneElement(this.props.childFactory(child), {
          ref: key,
          key: key
        }));
      }
    }
    var props = _assign({}, this.props);
    delete props.transitionLeave;
    delete props.transitionName;
    delete props.transitionAppear;
    delete props.transitionEnter;
    delete props.childFactory;
    delete props.transitionLeaveTimeout;
    delete props.transitionEnterTimeout;
    delete props.transitionAppearTimeout;
    delete props.component;
    return React.createElement(this.props.component, props, childrenToRender);
  };
  return ReactTransitionGroup;
}(React.Component);
ReactTransitionGroup.displayName = 'ReactTransitionGroup';
ReactTransitionGroup.propTypes = {
  component: React.PropTypes.any,
  childFactory: React.PropTypes.func
};
ReactTransitionGroup.defaultProps = {
  component: 'span',
  childFactory: emptyFunction.thatReturnsArgument
};
module.exports = ReactTransitionGroup;
