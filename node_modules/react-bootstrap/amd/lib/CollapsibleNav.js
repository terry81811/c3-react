define(['exports', 'module', 'react', './BootstrapMixin', './CollapsibleMixin', 'classnames', './utils/domUtils', './utils/ValidComponentChildren', './utils/createChainedFunction'], function (exports, module, _react, _BootstrapMixin, _CollapsibleMixin, _classnames, _utilsDomUtils, _utilsValidComponentChildren, _utilsCreateChainedFunction) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _CollapsibleMixin2 = _interopRequireDefault(_CollapsibleMixin);

  var _classNames = _interopRequireDefault(_classnames);

  var _domUtils = _interopRequireDefault(_utilsDomUtils);

  var _ValidComponentChildren = _interopRequireDefault(_utilsValidComponentChildren);

  var _createChainedFunction = _interopRequireDefault(_utilsCreateChainedFunction);

  var CollapsibleNav = _React['default'].createClass({
    displayName: 'CollapsibleNav',

    mixins: [_BootstrapMixin2['default'], _CollapsibleMixin2['default']],

    propTypes: {
      onSelect: _React['default'].PropTypes.func,
      activeHref: _React['default'].PropTypes.string,
      activeKey: _React['default'].PropTypes.any,
      collapsible: _React['default'].PropTypes.bool,
      expanded: _React['default'].PropTypes.bool,
      eventKey: _React['default'].PropTypes.any
    },

    getCollapsibleDOMNode: function getCollapsibleDOMNode() {
      return _React['default'].findDOMNode(this);
    },

    getCollapsibleDimensionValue: function getCollapsibleDimensionValue() {
      var height = 0;
      var nodes = this.refs;
      for (var key in nodes) {
        if (nodes.hasOwnProperty(key)) {

          var n = _React['default'].findDOMNode(nodes[key]),
              h = n.offsetHeight,
              computedStyles = _domUtils['default'].getComputedStyles(n);

          height += h + parseInt(computedStyles.marginTop, 10) + parseInt(computedStyles.marginBottom, 10);
        }
      }
      return height;
    },

    render: function render() {
      /*
       * this.props.collapsible is set in NavBar when an eventKey is supplied.
       */
      var classes = this.props.collapsible ? this.getCollapsibleClassSet('navbar-collapse') : null;
      var renderChildren = this.props.collapsible ? this.renderCollapsibleNavChildren : this.renderChildren;

      return _React['default'].createElement(
        'div',
        { eventKey: this.props.eventKey, className: (0, _classNames['default'])(this.props.className, classes) },
        _ValidComponentChildren['default'].map(this.props.children, renderChildren)
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

    renderChildren: function renderChildren(child, index) {
      var key = child.key ? child.key : index;
      return (0, _react.cloneElement)(child, {
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        ref: 'nocollapse_' + key,
        key: key,
        navItem: true
      });
    },

    renderCollapsibleNavChildren: function renderCollapsibleNavChildren(child, index) {
      var key = child.key ? child.key : index;
      return (0, _react.cloneElement)(child, {
        active: this.getChildActiveProp(child),
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        onSelect: (0, _createChainedFunction['default'])(child.props.onSelect, this.props.onSelect),
        ref: 'collapsible_' + key,
        key: key,
        navItem: true
      });
    }
  });

  module.exports = CollapsibleNav;
});