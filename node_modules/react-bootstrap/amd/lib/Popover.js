define(['exports', 'module', 'react', 'classnames', './BootstrapMixin', './FadeMixin'], function (exports, module, _react, _classnames, _BootstrapMixin, _FadeMixin) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _FadeMixin2 = _interopRequireDefault(_FadeMixin);

  var Popover = _React['default'].createClass({
    displayName: 'Popover',

    mixins: [_BootstrapMixin2['default'], _FadeMixin2['default']],

    propTypes: {
      placement: _React['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
      positionLeft: _React['default'].PropTypes.number,
      positionTop: _React['default'].PropTypes.number,
      arrowOffsetLeft: _React['default'].PropTypes.oneOfType([_React['default'].PropTypes.number, _React['default'].PropTypes.string]),
      arrowOffsetTop: _React['default'].PropTypes.oneOfType([_React['default'].PropTypes.number, _React['default'].PropTypes.string]),
      title: _React['default'].PropTypes.node,
      animation: _React['default'].PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        placement: 'right',
        animation: true
      };
    },

    render: function render() {
      var _classes;

      var classes = (_classes = {
        'popover': true }, _defineProperty(_classes, this.props.placement, true), _defineProperty(_classes, 'in', !this.props.animation && (this.props.positionLeft != null || this.props.positionTop != null)), _defineProperty(_classes, 'fade', this.props.animation), _classes);

      var style = {
        'left': this.props.positionLeft,
        'top': this.props.positionTop,
        'display': 'block'
      };

      var arrowStyle = {
        'left': this.props.arrowOffsetLeft,
        'top': this.props.arrowOffsetTop
      };

      return _React['default'].createElement(
        'div',
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, classes), style: style, title: null }),
        _React['default'].createElement('div', { className: 'arrow', style: arrowStyle }),
        this.props.title ? this.renderTitle() : null,
        _React['default'].createElement(
          'div',
          { className: 'popover-content' },
          this.props.children
        )
      );
    },

    renderTitle: function renderTitle() {
      return _React['default'].createElement(
        'h3',
        { className: 'popover-title' },
        this.props.title
      );
    }
  });

  module.exports = Popover;
});

// in class will be added by the FadeMixin when the animation property is true