define(['exports', 'module', 'react', 'classnames', './AffixMixin', './utils/domUtils'], function (exports, module, _react, _classnames, _AffixMixin, _utilsDomUtils) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _AffixMixin2 = _interopRequireDefault(_AffixMixin);

  var _domUtils = _interopRequireDefault(_utilsDomUtils);

  var Affix = _React['default'].createClass({
    displayName: 'Affix',

    statics: {
      domUtils: _domUtils['default']
    },

    mixins: [_AffixMixin2['default']],

    render: function render() {
      var holderStyle = { top: this.state.affixPositionTop };

      return _React['default'].createElement(
        'div',
        _extends({}, this.props, {
          className: (0, _classNames['default'])(this.props.className, this.state.affixClass),
          style: holderStyle }),
        this.props.children
      );
    }
  });

  module.exports = Affix;
});