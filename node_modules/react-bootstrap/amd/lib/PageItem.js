define(['exports', 'module', 'react', 'classnames'], function (exports, module, _react, _classnames) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var PageItem = _React['default'].createClass({
    displayName: 'PageItem',

    propTypes: {
      href: _React['default'].PropTypes.string,
      target: _React['default'].PropTypes.string,
      title: _React['default'].PropTypes.string,
      disabled: _React['default'].PropTypes.bool,
      previous: _React['default'].PropTypes.bool,
      next: _React['default'].PropTypes.bool,
      onSelect: _React['default'].PropTypes.func,
      eventKey: _React['default'].PropTypes.any
    },

    getDefaultProps: function getDefaultProps() {
      return {
        href: '#'
      };
    },

    render: function render() {
      var classes = {
        'disabled': this.props.disabled,
        'previous': this.props.previous,
        'next': this.props.next
      };

      return _React['default'].createElement(
        'li',
        _extends({}, this.props, {
          className: (0, _classNames['default'])(this.props.className, classes) }),
        _React['default'].createElement(
          'a',
          {
            href: this.props.href,
            title: this.props.title,
            target: this.props.target,
            onClick: this.handleSelect,
            ref: 'anchor' },
          this.props.children
        )
      );
    },

    handleSelect: function handleSelect(e) {
      if (this.props.onSelect) {
        e.preventDefault();

        if (!this.props.disabled) {
          this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
        }
      }
    }
  });

  module.exports = PageItem;
});