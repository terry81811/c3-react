define(['exports', 'module', 'react', 'classnames', './utils/createChainedFunction', './utils/ValidComponentChildren'], function (exports, module, _react, _classnames, _utilsCreateChainedFunction, _utilsValidComponentChildren) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _createChainedFunction = _interopRequireDefault(_utilsCreateChainedFunction);

  var _ValidComponentChildren = _interopRequireDefault(_utilsValidComponentChildren);

  var DropdownMenu = _React['default'].createClass({
    displayName: 'DropdownMenu',

    propTypes: {
      pullRight: _React['default'].PropTypes.bool,
      onSelect: _React['default'].PropTypes.func
    },

    render: function render() {
      var classes = {
        'dropdown-menu': true,
        'dropdown-menu-right': this.props.pullRight
      };

      return _React['default'].createElement(
        'ul',
        _extends({}, this.props, {
          className: (0, _classNames['default'])(this.props.className, classes),
          role: 'menu' }),
        _ValidComponentChildren['default'].map(this.props.children, this.renderMenuItem)
      );
    },

    renderMenuItem: function renderMenuItem(child, index) {
      return (0, _react.cloneElement)(child, {
        // Capture onSelect events
        onSelect: (0, _createChainedFunction['default'])(child.props.onSelect, this.props.onSelect),

        // Force special props to be transferred
        key: child.key ? child.key : index
      });
    }
  });

  module.exports = DropdownMenu;
});