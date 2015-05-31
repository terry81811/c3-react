define(['exports', 'module', 'react', 'classnames', './utils/createChainedFunction', './BootstrapMixin', './DropdownStateMixin', './Button', './ButtonGroup', './DropdownMenu', './utils/ValidComponentChildren'], function (exports, module, _react, _classnames, _utilsCreateChainedFunction, _BootstrapMixin, _DropdownStateMixin, _Button, _ButtonGroup, _DropdownMenu, _utilsValidComponentChildren) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _createChainedFunction = _interopRequireDefault(_utilsCreateChainedFunction);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _DropdownStateMixin2 = _interopRequireDefault(_DropdownStateMixin);

  var _Button2 = _interopRequireDefault(_Button);

  var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

  var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

  var _ValidComponentChildren = _interopRequireDefault(_utilsValidComponentChildren);

  var DropdownButton = _React['default'].createClass({
    displayName: 'DropdownButton',

    mixins: [_BootstrapMixin2['default'], _DropdownStateMixin2['default']],

    propTypes: {
      pullRight: _React['default'].PropTypes.bool,
      dropup: _React['default'].PropTypes.bool,
      title: _React['default'].PropTypes.node,
      href: _React['default'].PropTypes.string,
      onClick: _React['default'].PropTypes.func,
      onSelect: _React['default'].PropTypes.func,
      navItem: _React['default'].PropTypes.bool,
      noCaret: _React['default'].PropTypes.bool,
      buttonClassName: _React['default'].PropTypes.string
    },

    render: function render() {
      var renderMethod = this.props.navItem ? 'renderNavItem' : 'renderButtonGroup';

      var caret = this.props.noCaret ? null : _React['default'].createElement('span', { className: 'caret' });

      return this[renderMethod]([_React['default'].createElement(
        _Button2['default'],
        _extends({}, this.props, {
          ref: 'dropdownButton',
          className: (0, _classNames['default'])('dropdown-toggle', this.props.buttonClassName),
          onClick: (0, _createChainedFunction['default'])(this.props.onClick, this.handleDropdownClick),
          key: 0,
          navDropdown: this.props.navItem,
          navItem: null,
          title: null,
          pullRight: null,
          dropup: null }),
        this.props.title,
        ' ',
        caret
      ), _React['default'].createElement(
        _DropdownMenu2['default'],
        {
          ref: 'menu',
          'aria-labelledby': this.props.id,
          pullRight: this.props.pullRight,
          key: 1 },
        _ValidComponentChildren['default'].map(this.props.children, this.renderMenuItem)
      )]);
    },

    renderButtonGroup: function renderButtonGroup(children) {
      var groupClasses = {
        'open': this.state.open,
        'dropup': this.props.dropup
      };

      return _React['default'].createElement(
        _ButtonGroup2['default'],
        {
          bsSize: this.props.bsSize,
          className: (0, _classNames['default'])(this.props.className, groupClasses) },
        children
      );
    },

    renderNavItem: function renderNavItem(children) {
      var classes = {
        'dropdown': true,
        'open': this.state.open,
        'dropup': this.props.dropup
      };

      return _React['default'].createElement(
        'li',
        { className: (0, _classNames['default'])(this.props.className, classes) },
        children
      );
    },

    renderMenuItem: function renderMenuItem(child, index) {
      // Only handle the option selection if an onSelect prop has been set on the
      // component or it's child, this allows a user not to pass an onSelect
      // handler and have the browser preform the default action.
      var handleOptionSelect = this.props.onSelect || child.props.onSelect ? this.handleOptionSelect : null;

      return (0, _react.cloneElement)(child, {
        // Capture onSelect events
        onSelect: (0, _createChainedFunction['default'])(child.props.onSelect, handleOptionSelect),
        key: child.key ? child.key : index
      });
    },

    handleDropdownClick: function handleDropdownClick(e) {
      e.preventDefault();

      this.setDropdownState(!this.state.open);
    },

    handleOptionSelect: function handleOptionSelect(key) {
      if (this.props.onSelect) {
        this.props.onSelect(key);
      }

      this.setDropdownState(false);
    }
  });

  module.exports = DropdownButton;
});