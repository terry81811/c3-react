define(['exports', 'module', 'react', './BootstrapMixin', 'classnames', './utils/ValidComponentChildren', './utils/createChainedFunction'], function (exports, module, _react, _BootstrapMixin, _classnames, _utilsValidComponentChildren, _utilsCreateChainedFunction) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _classNames = _interopRequireDefault(_classnames);

  var _ValidComponentChildren = _interopRequireDefault(_utilsValidComponentChildren);

  var _createChainedFunction = _interopRequireDefault(_utilsCreateChainedFunction);

  var Navbar = _React['default'].createClass({
    displayName: 'Navbar',

    mixins: [_BootstrapMixin2['default']],

    propTypes: {
      fixedTop: _React['default'].PropTypes.bool,
      fixedBottom: _React['default'].PropTypes.bool,
      staticTop: _React['default'].PropTypes.bool,
      inverse: _React['default'].PropTypes.bool,
      fluid: _React['default'].PropTypes.bool,
      role: _React['default'].PropTypes.string,
      componentClass: _React['default'].PropTypes.node.isRequired,
      brand: _React['default'].PropTypes.node,
      toggleButton: _React['default'].PropTypes.node,
      toggleNavKey: _React['default'].PropTypes.oneOfType([_React['default'].PropTypes.string, _React['default'].PropTypes.number]),
      onToggle: _React['default'].PropTypes.func,
      navExpanded: _React['default'].PropTypes.bool,
      defaultNavExpanded: _React['default'].PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'navbar',
        bsStyle: 'default',
        role: 'navigation',
        componentClass: 'nav'
      };
    },

    getInitialState: function getInitialState() {
      return {
        navExpanded: this.props.defaultNavExpanded
      };
    },

    shouldComponentUpdate: function shouldComponentUpdate() {
      // Defer any updates to this component during the `onSelect` handler.
      return !this._isChanging;
    },

    handleToggle: function handleToggle() {
      if (this.props.onToggle) {
        this._isChanging = true;
        this.props.onToggle();
        this._isChanging = false;
      }

      this.setState({
        navExpanded: !this.state.navExpanded
      });
    },

    isNavExpanded: function isNavExpanded() {
      return this.props.navExpanded != null ? this.props.navExpanded : this.state.navExpanded;
    },

    render: function render() {
      var classes = this.getBsClassSet();
      var ComponentClass = this.props.componentClass;

      classes['navbar-fixed-top'] = this.props.fixedTop;
      classes['navbar-fixed-bottom'] = this.props.fixedBottom;
      classes['navbar-static-top'] = this.props.staticTop;
      classes['navbar-inverse'] = this.props.inverse;

      return _React['default'].createElement(
        ComponentClass,
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, classes) }),
        _React['default'].createElement(
          'div',
          { className: this.props.fluid ? 'container-fluid' : 'container' },
          this.props.brand || this.props.toggleButton || this.props.toggleNavKey != null ? this.renderHeader() : null,
          _ValidComponentChildren['default'].map(this.props.children, this.renderChild)
        )
      );
    },

    renderChild: function renderChild(child, index) {
      return (0, _react.cloneElement)(child, {
        navbar: true,
        collapsible: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey,
        expanded: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey && this.isNavExpanded(),
        key: child.key ? child.key : index
      });
    },

    renderHeader: function renderHeader() {
      var brand = undefined;

      if (this.props.brand) {
        if (_React['default'].isValidElement(this.props.brand)) {
          brand = (0, _react.cloneElement)(this.props.brand, {
            className: (0, _classNames['default'])(this.props.brand.props.className, 'navbar-brand')
          });
        } else {
          brand = _React['default'].createElement(
            'span',
            { className: 'navbar-brand' },
            this.props.brand
          );
        }
      }

      return _React['default'].createElement(
        'div',
        { className: 'navbar-header' },
        brand,
        this.props.toggleButton || this.props.toggleNavKey != null ? this.renderToggleButton() : null
      );
    },

    renderToggleButton: function renderToggleButton() {
      var children = undefined;

      if (_React['default'].isValidElement(this.props.toggleButton)) {

        return (0, _react.cloneElement)(this.props.toggleButton, {
          className: (0, _classNames['default'])(this.props.toggleButton.props.className, 'navbar-toggle'),
          onClick: (0, _createChainedFunction['default'])(this.handleToggle, this.props.toggleButton.props.onClick)
        });
      }

      children = this.props.toggleButton != null ? this.props.toggleButton : [_React['default'].createElement(
        'span',
        { className: 'sr-only', key: 0 },
        'Toggle navigation'
      ), _React['default'].createElement('span', { className: 'icon-bar', key: 1 }), _React['default'].createElement('span', { className: 'icon-bar', key: 2 }), _React['default'].createElement('span', { className: 'icon-bar', key: 3 })];

      return _React['default'].createElement(
        'button',
        { className: 'navbar-toggle', type: 'button', onClick: this.handleToggle },
        children
      );
    }
  });

  module.exports = Navbar;
});