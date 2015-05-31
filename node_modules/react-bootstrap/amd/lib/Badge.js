define(['exports', 'module', 'react', './utils/ValidComponentChildren', 'classnames'], function (exports, module, _react, _utilsValidComponentChildren, _classnames) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _ValidComponentChildren = _interopRequireDefault(_utilsValidComponentChildren);

  var _classNames = _interopRequireDefault(_classnames);

  var Badge = _React['default'].createClass({
    displayName: 'Badge',

    propTypes: {
      pullRight: _React['default'].PropTypes.bool
    },

    hasContent: function hasContent() {
      return _ValidComponentChildren['default'].hasValidComponent(this.props.children) || _React['default'].Children.count(this.props.children) > 1 || typeof this.props.children === 'string' || typeof this.props.children === 'number';
    },

    render: function render() {
      var classes = {
        'pull-right': this.props.pullRight,
        'badge': this.hasContent()
      };
      return _React['default'].createElement(
        'span',
        _extends({}, this.props, {
          className: (0, _classNames['default'])(this.props.className, classes) }),
        this.props.children
      );
    }
  });

  module.exports = Badge;
});