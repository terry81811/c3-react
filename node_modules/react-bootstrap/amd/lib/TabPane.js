define(['exports', 'module', 'react', 'classnames', './utils/TransitionEvents'], function (exports, module, _react, _classnames, _utilsTransitionEvents) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _TransitionEvents = _interopRequireDefault(_utilsTransitionEvents);

  var TabPane = _React['default'].createClass({
    displayName: 'TabPane',

    propTypes: {
      active: _React['default'].PropTypes.bool,
      animation: _React['default'].PropTypes.bool,
      onAnimateOutEnd: _React['default'].PropTypes.func,
      disabled: _React['default'].PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        animation: true
      };
    },

    getInitialState: function getInitialState() {
      return {
        animateIn: false,
        animateOut: false
      };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if (this.props.animation) {
        if (!this.state.animateIn && nextProps.active && !this.props.active) {
          this.setState({
            animateIn: true
          });
        } else if (!this.state.animateOut && !nextProps.active && this.props.active) {
          this.setState({
            animateOut: true
          });
        }
      }
    },

    componentDidUpdate: function componentDidUpdate() {
      if (this.state.animateIn) {
        setTimeout(this.startAnimateIn, 0);
      }
      if (this.state.animateOut) {
        _TransitionEvents['default'].addEndEventListener(_React['default'].findDOMNode(this), this.stopAnimateOut);
      }
    },

    startAnimateIn: function startAnimateIn() {
      if (this.isMounted()) {
        this.setState({
          animateIn: false
        });
      }
    },

    stopAnimateOut: function stopAnimateOut() {
      if (this.isMounted()) {
        this.setState({
          animateOut: false
        });

        if (this.props.onAnimateOutEnd) {
          this.props.onAnimateOutEnd();
        }
      }
    },

    render: function render() {
      var classes = {
        'tab-pane': true,
        'fade': true,
        'active': this.props.active || this.state.animateOut,
        'in': this.props.active && !this.state.animateIn
      };

      return _React['default'].createElement(
        'div',
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, classes) }),
        this.props.children
      );
    }
  });

  module.exports = TabPane;
});