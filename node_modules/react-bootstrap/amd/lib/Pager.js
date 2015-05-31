define(['exports', 'module', 'react', 'classnames', './utils/ValidComponentChildren', './utils/createChainedFunction'], function (exports, module, _react, _classnames, _utilsValidComponentChildren, _utilsCreateChainedFunction) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _ValidComponentChildren = _interopRequireDefault(_utilsValidComponentChildren);

  var _createChainedFunction = _interopRequireDefault(_utilsCreateChainedFunction);

  var Pager = _React['default'].createClass({
    displayName: 'Pager',

    propTypes: {
      onSelect: _React['default'].PropTypes.func
    },

    render: function render() {
      return _React['default'].createElement(
        'ul',
        _extends({}, this.props, {
          className: (0, _classNames['default'])(this.props.className, 'pager') }),
        _ValidComponentChildren['default'].map(this.props.children, this.renderPageItem)
      );
    },

    renderPageItem: function renderPageItem(child, index) {
      return (0, _react.cloneElement)(child, {
        onSelect: (0, _createChainedFunction['default'])(child.props.onSelect, this.props.onSelect),
        key: child.key ? child.key : index
      });
    }
  });

  module.exports = Pager;
});