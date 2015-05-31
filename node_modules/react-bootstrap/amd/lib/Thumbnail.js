define(['exports', 'module', 'react', 'classnames', './BootstrapMixin'], function (exports, module, _react, _classnames, _BootstrapMixin) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classSet = _interopRequireDefault(_classnames);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var Thumbnail = _React['default'].createClass({
    displayName: 'Thumbnail',

    mixins: [_BootstrapMixin2['default']],

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'thumbnail'
      };
    },

    render: function render() {
      var classes = this.getBsClassSet();

      if (this.props.href) {
        return _React['default'].createElement(
          'a',
          _extends({}, this.props, { href: this.props.href, className: (0, _classSet['default'])(this.props.className, classes) }),
          _React['default'].createElement('img', { src: this.props.src, alt: this.props.alt })
        );
      } else {
        if (this.props.children) {
          return _React['default'].createElement(
            'div',
            _extends({}, this.props, { className: (0, _classSet['default'])(this.props.className, classes) }),
            _React['default'].createElement('img', { src: this.props.src, alt: this.props.alt }),
            _React['default'].createElement(
              'div',
              { className: 'caption' },
              this.props.children
            )
          );
        } else {
          return _React['default'].createElement(
            'div',
            _extends({}, this.props, { className: (0, _classSet['default'])(this.props.className, classes) }),
            _React['default'].createElement('img', { src: this.props.src, alt: this.props.alt })
          );
        }
      }
    }
  });

  module.exports = Thumbnail;
});