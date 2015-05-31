define(['exports', 'module', 'react', 'classnames'], function (exports, module, _react, _classnames) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var Table = _React['default'].createClass({
    displayName: 'Table',

    propTypes: {
      striped: _React['default'].PropTypes.bool,
      bordered: _React['default'].PropTypes.bool,
      condensed: _React['default'].PropTypes.bool,
      hover: _React['default'].PropTypes.bool,
      responsive: _React['default'].PropTypes.bool
    },

    render: function render() {
      var classes = {
        'table': true,
        'table-striped': this.props.striped,
        'table-bordered': this.props.bordered,
        'table-condensed': this.props.condensed,
        'table-hover': this.props.hover
      };
      var table = _React['default'].createElement(
        'table',
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, classes) }),
        this.props.children
      );

      return this.props.responsive ? _React['default'].createElement(
        'div',
        { className: 'table-responsive' },
        table
      ) : table;
    }
  });

  module.exports = Table;
});