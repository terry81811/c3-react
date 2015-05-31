define(['exports', 'module', 'react', './BootstrapMixin', './CollapsibleMixin', 'classnames', './utils/domUtils', './utils/ValidComponentChildren', './utils/createChainedFunction'], function (exports, module, _react, _BootstrapMixin, _CollapsibleMixin, _classnames, _utilsDomUtils, _utilsValidComponentChildren, _utilsCreateChainedFunction) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _CollapsibleMixin2 = _interopRequireDefault(_CollapsibleMixin);

  var _classNames = _interopRequireDefault(_classnames);

  var _domUtils = _interopRequireDefault(_utilsDomUtils);

  var _ValidComponentChildren = _interopRequireDefault(_utilsValidComponentChildren);

  var _createChainedFunction = _interopRequireDefault(_utilsCreateChainedFunction);

  var Nav = _React['default'].createClass({
    displayName: 'Nav',

    mixins: [_BootstrapMixin2['default'], _CollapsibleMixin2['default']],

    propTypes: {
      activeHref: _React['default'].PropTypes.string,
      activeKey: _React['default'].PropTypes.any,
      bsStyle: _React['default'].PropTypes.oneOf(['tabs', 'pills']),
      stacked: _React['default'].PropTypes.bool,
      justified: _React['default'].PropTypes.bool,
      onSelect: _React['default'].PropTypes.func,
      collapsible: _React['default'].PropTypes.bool,
      expanded: _React['default'].PropTypes.bool,
      navbar: _React['default'].PropTypes.bool,
      eventKey: _React['default'].PropTypes.any,
      pullRight: _React['default'].PropTypes.bool,
      right: _React['default'].PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'nav'
      };
    },

    getCollapsibleDOMNode: function getCollapsibleDOMNode() {
      return _React['default'].findDOMNode(this);
    },

    getCollapsibleDimensionValue: function getCollapsibleDimensionValue() {
      var node = _React['default'].findDOMNode(this.refs.ul),
          height = node.offsetHeight,
          computedStyles = _domUtils['default'].getComputedStyles(node);

      return height + parseInt(computedStyles.marginTop, 10) + parseInt(computedStyles.marginBottom, 10);
    },

    render: function render() {
      var classes = this.props.collapsible ? this.getCollapsibleClassSet('navbar-collapse') : null;

      if (this.props.navbar && !this.props.collapsible) {
        return this.renderUl();
      }

      return _React['default'].createElement(
        'nav',
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, classes) }),
        this.renderUl()
      );
    },

    renderUl: function renderUl() {
      var classes = this.getBsClassSet();

      classes['nav-stacked'] = this.props.stacked;
      classes['nav-justified'] = this.props.justified;
      classes['navbar-nav'] = this.props.navbar;
      classes['pull-right'] = this.props.pullRight;
      classes['navbar-right'] = this.props.right;

      return _React['default'].createElement(
        'ul',
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, classes), ref: 'ul' }),
        _ValidComponentChildren['default'].map(this.props.children, this.renderNavItem)
      );
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

    renderNavItem: function renderNavItem(child, index) {
      return (0, _react.cloneElement)(child, {
        active: this.getChildActiveProp(child),
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        onSelect: (0, _createChainedFunction['default'])(child.props.onSelect, this.props.onSelect),
        key: child.key ? child.key : index,
        navItem: true
      });
    }
  });

  module.exports = Nav;
});