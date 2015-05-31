define(['exports', 'module', 'react', 'classnames', './BootstrapMixin'], function (exports, module, _react, _classnames, _BootstrapMixin) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var Well = _React['default'].createClass({
    displayName: 'Well',

    mixins: [_BootstrapMixin2['default']],

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'well'
      };
    },

    render: function render() {
      var classes = this.getBsClassSet();

      return _React['default'].createElement(
        'div',
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, classes) }),
        this.props.children
      );
    }
  });

  module.exports = Well;
});