define(['exports', 'module', 'react', 'classnames', './utils/ValidComponentChildren', './utils/createChainedFunction', './BootstrapMixin'], function (exports, module, _react, _classnames, _utilsValidComponentChildren, _utilsCreateChainedFunction, _BootstrapMixin) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _ValidComponentChildren = _interopRequireDefault(_utilsValidComponentChildren);

  var _createChainedFunction = _interopRequireDefault(_utilsCreateChainedFunction);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var SubNav = _React['default'].createClass({
    displayName: 'SubNav',

    mixins: [_BootstrapMixin2['default']],

    propTypes: {
      onSelect: _React['default'].PropTypes.func,
      active: _React['default'].PropTypes.bool,
      activeHref: _React['default'].PropTypes.string,
      activeKey: _React['default'].PropTypes.any,
      disabled: _React['default'].PropTypes.bool,
      eventKey: _React['default'].PropTypes.any,
      href: _React['default'].PropTypes.string,
      title: _React['default'].PropTypes.string,
      text: _React['default'].PropTypes.node,
      target: _React['default'].PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'nav'
      };
    },

    handleClick: function handleClick(e) {
      if (this.props.onSelect) {
        e.preventDefault();

        if (!this.props.disabled) {
          this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
        }
      }
    },

    isActive: function isActive() {
      return this.isChildActive(this);
    },

    isChildActive: function isChildActive(child) {
      var _this = this;

      if (child.props.active) {
        return true;
      }

      if (this.props.activeKey != null && this.props.activeKey === child.props.eventKey) {
        return true;
      }

      if (this.props.activeHref != null && this.props.activeHref === child.props.href) {
        return true;
      }

      if (child.props.children) {
        var _ret = (function () {
          var isActive = false;

          _ValidComponentChildren['default'].forEach(child.props.children, function (grandchild) {
            if (this.isChildActive(grandchild)) {
              isActive = true;
            }
          }, _this);

          return {
            v: isActive
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      }

      return false;
    },

    getChildActiveProp: function getChildActiveProp(child) {
      if (child.props.active) {
        return true;
      }
      if (this.props.activeKey != null) {
        if (child.props.eventKey === this.props.activeKey) {
          return true;
        }
      }
      if (this.props.activeHref != null) {
        if (child.props.href === this.props.activeHref) {
          return true;
        }
      }

      return child.props.active;
    },

    render: function render() {
      var classes = {
        'active': this.isActive(),
        'disabled': this.props.disabled
      };

      return _React['default'].createElement(
        'li',
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, classes) }),
        _React['default'].createElement(
          'a',
          {
            href: this.props.href,
            title: this.props.title,
            target: this.props.target,
            onClick: this.handleClick,
            ref: 'anchor' },
          this.props.text
        ),
        _React['default'].createElement(
          'ul',
          { className: 'nav' },
          _ValidComponentChildren['default'].map(this.props.children, this.renderNavItem)
        )
      );
    },

    renderNavItem: function renderNavItem(child, index) {
      return (0, _react.cloneElement)(child, {
        active: this.getChildActiveProp(child),
        onSelect: (0, _createChainedFunction['default'])(child.props.onSelect, this.props.onSelect),
        key: child.key ? child.key : index
      });
    }
  });

  module.exports = SubNav;
});