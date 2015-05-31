define(['exports', 'module', 'react', 'classnames'], function (exports, module, _react, _classnames) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var Row = _React['default'].createClass({
    displayName: 'Row',

    propTypes: {
      componentClass: _React['default'].PropTypes.node.isRequired
    },

    getDefaultProps: function getDefaultProps() {
      return {
        componentClass: 'div'
      };
    },

    render: function render() {
      var ComponentClass = this.props.componentClass;

      return _React['default'].createElement(
        ComponentClass,
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, 'row') }),
        this.props.children
      );
    }
  });

  module.exports = Row;
});