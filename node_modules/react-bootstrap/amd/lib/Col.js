define(['exports', 'module', 'react', 'classnames', './styleMaps'], function (exports, module, _react, _classnames, _styleMaps) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _styleMaps2 = _interopRequireDefault(_styleMaps);

  var Col = _React['default'].createClass({
    displayName: 'Col',

    propTypes: {
      xs: _React['default'].PropTypes.number,
      sm: _React['default'].PropTypes.number,
      md: _React['default'].PropTypes.number,
      lg: _React['default'].PropTypes.number,
      xsOffset: _React['default'].PropTypes.number,
      smOffset: _React['default'].PropTypes.number,
      mdOffset: _React['default'].PropTypes.number,
      lgOffset: _React['default'].PropTypes.number,
      xsPush: _React['default'].PropTypes.number,
      smPush: _React['default'].PropTypes.number,
      mdPush: _React['default'].PropTypes.number,
      lgPush: _React['default'].PropTypes.number,
      xsPull: _React['default'].PropTypes.number,
      smPull: _React['default'].PropTypes.number,
      mdPull: _React['default'].PropTypes.number,
      lgPull: _React['default'].PropTypes.number,
      componentClass: _React['default'].PropTypes.node.isRequired
    },

    getDefaultProps: function getDefaultProps() {
      return {
        componentClass: 'div'
      };
    },

    render: function render() {
      var ComponentClass = this.props.componentClass;
      var classes = {};

      Object.keys(_styleMaps2['default'].SIZES).forEach(function (key) {
        var size = _styleMaps2['default'].SIZES[key];
        var prop = size;
        var classPart = size + '-';

        if (this.props[prop]) {
          classes['col-' + classPart + this.props[prop]] = true;
        }

        prop = size + 'Offset';
        classPart = size + '-offset-';
        if (this.props[prop] >= 0) {
          classes['col-' + classPart + this.props[prop]] = true;
        }

        prop = size + 'Push';
        classPart = size + '-push-';
        if (this.props[prop] >= 0) {
          classes['col-' + classPart + this.props[prop]] = true;
        }

        prop = size + 'Pull';
        classPart = size + '-pull-';
        if (this.props[prop] >= 0) {
          classes['col-' + classPart + this.props[prop]] = true;
        }
      }, this);

      return _React['default'].createElement(
        ComponentClass,
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, classes) }),
        this.props.children
      );
    }
  });

  module.exports = Col;
});