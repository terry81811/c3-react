define(['exports', 'module', 'react', 'classnames', './BootstrapMixin', './styleMaps'], function (exports, module, _react, _classnames, _BootstrapMixin, _styleMaps) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _styleMaps2 = _interopRequireDefault(_styleMaps);

  var Glyphicon = _React['default'].createClass({
    displayName: 'Glyphicon',

    mixins: [_BootstrapMixin2['default']],

    propTypes: {
      glyph: _React['default'].PropTypes.oneOf(_styleMaps2['default'].GLYPHS).isRequired
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'glyphicon'
      };
    },

    render: function render() {
      var classes = this.getBsClassSet();

      classes['glyphicon-' + this.props.glyph] = true;

      return _React['default'].createElement(
        'span',
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, classes) }),
        this.props.children
      );
    }
  });

  module.exports = Glyphicon;
});