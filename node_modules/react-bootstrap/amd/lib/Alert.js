define(['exports', 'module', 'react', 'classnames', './BootstrapMixin'], function (exports, module, _react, _classnames, _BootstrapMixin) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var Alert = _React['default'].createClass({
    displayName: 'Alert',

    mixins: [_BootstrapMixin2['default']],

    propTypes: {
      onDismiss: _React['default'].PropTypes.func,
      dismissAfter: _React['default'].PropTypes.number
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'alert',
        bsStyle: 'info'
      };
    },

    renderDismissButton: function renderDismissButton() {
      return _React['default'].createElement(
        'button',
        {
          type: 'button',
          className: 'close',
          onClick: this.props.onDismiss,
          'aria-hidden': 'true' },
        '×'
      );
    },

    render: function render() {
      var classes = this.getBsClassSet();
      var isDismissable = !!this.props.onDismiss;

      classes['alert-dismissable'] = isDismissable;

      return _React['default'].createElement(
        'div',
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, classes) }),
        isDismissable ? this.renderDismissButton() : null,
        this.props.children
      );
    },

    componentDidMount: function componentDidMount() {
      if (this.props.dismissAfter && this.props.onDismiss) {
        this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter);
      }
    },

    componentWillUnmount: function componentWillUnmount() {
      clearTimeout(this.dismissTimer);
    }
  });

  module.exports = Alert;
});