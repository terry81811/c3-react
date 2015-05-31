define(['exports', 'module', 'react', './BootstrapMixin', 'classnames'], function (exports, module, _react, _BootstrapMixin, _classnames) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _classNames = _interopRequireDefault(_classnames);

  var ListGroupItem = _React['default'].createClass({
    displayName: 'ListGroupItem',

    mixins: [_BootstrapMixin2['default']],

    propTypes: {
      bsStyle: _React['default'].PropTypes.oneOf(['danger', 'info', 'success', 'warning']),
      className: _React['default'].PropTypes.string,
      active: _React['default'].PropTypes.any,
      disabled: _React['default'].PropTypes.any,
      header: _React['default'].PropTypes.node,
      listItem: _React['default'].PropTypes.bool,
      onClick: _React['default'].PropTypes.func,
      eventKey: _React['default'].PropTypes.any,
      href: _React['default'].PropTypes.string,
      target: _React['default'].PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'list-group-item'
      };
    },

    render: function render() {
      var classes = this.getBsClassSet();

      classes.active = this.props.active;
      classes.disabled = this.props.disabled;

      if (this.props.href || this.props.onClick) {
        return this.renderAnchor(classes);
      } else if (this.props.listItem) {
        return this.renderLi(classes);
      } else {
        return this.renderSpan(classes);
      }
    },

    renderLi: function renderLi(classes) {
      return _React['default'].createElement(
        'li',
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, classes) }),
        this.props.header ? this.renderStructuredContent() : this.props.children
      );
    },

    renderAnchor: function renderAnchor(classes) {
      return _React['default'].createElement(
        'a',
        _extends({}, this.props, {
          className: (0, _classNames['default'])(this.props.className, classes)
        }),
        this.props.header ? this.renderStructuredContent() : this.props.children
      );
    },

    renderSpan: function renderSpan(classes) {
      return _React['default'].createElement(
        'span',
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, classes) }),
        this.props.header ? this.renderStructuredContent() : this.props.children
      );
    },

    renderStructuredContent: function renderStructuredContent() {
      var header = undefined;
      if (_React['default'].isValidElement(this.props.header)) {
        header = (0, _react.cloneElement)(this.props.header, {
          key: 'header',
          className: (0, _classNames['default'])(this.props.header.props.className, 'list-group-item-heading')
        });
      } else {
        header = _React['default'].createElement(
          'h4',
          { key: 'header', className: 'list-group-item-heading' },
          this.props.header
        );
      }

      var content = _React['default'].createElement(
        'p',
        { key: 'content', className: 'list-group-item-text' },
        this.props.children
      );

      return [header, content];
    }
  });

  module.exports = ListGroupItem;
});