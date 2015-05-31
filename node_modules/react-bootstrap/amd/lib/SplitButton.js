define(['exports', 'module', 'react', 'classnames', './BootstrapMixin', './DropdownStateMixin', './Button', './ButtonGroup', './DropdownMenu'], function (exports, module, _react, _classnames, _BootstrapMixin, _DropdownStateMixin, _Button, _ButtonGroup, _DropdownMenu) {
  /* eslint react/prop-types: [1, {ignore: ["children", "className", "bsSize"]}]*/
  /* BootstrapMixin contains `bsSize` type validation */
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _DropdownStateMixin2 = _interopRequireDefault(_DropdownStateMixin);

  var _Button2 = _interopRequireDefault(_Button);

  var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

  var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

  var SplitButton = _React['default'].createClass({
    displayName: 'SplitButton',

    mixins: [_BootstrapMixin2['default'], _DropdownStateMixin2['default']],

    propTypes: {
      pullRight: _React['default'].PropTypes.bool,
      title: _React['default'].PropTypes.node,
      href: _React['default'].PropTypes.string,
      id: _React['default'].PropTypes.string,
      target: _React['default'].PropTypes.string,
      dropdownTitle: _React['default'].PropTypes.node,
      dropup: _React['default'].PropTypes.bool,
      onClick: _React['default'].PropTypes.func,
      onSelect: _React['default'].PropTypes.func,
      disabled: _React['default'].PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        dropdownTitle: 'Toggle dropdown'
      };
    },

    render: function render() {
      var groupClasses = {
        'open': this.state.open,
        'dropup': this.props.dropup
      };

      var button = _React['default'].createElement(
        _Button2['default'],
        _extends({}, this.props, {
          ref: 'button',
          onClick: this.handleButtonClick,
          title: null,
          id: null }),
        this.props.title
      );

      var dropdownButton = _React['default'].createElement(
        _Button2['default'],
        _extends({}, this.props, {
          ref: 'dropdownButton',
          className: (0, _classNames['default'])(this.props.className, 'dropdown-toggle'),
          onClick: this.handleDropdownClick,
          title: null,
          href: null,
          target: null,
          id: null }),
        _React['default'].createElement(
          'span',
          { className: 'sr-only' },
          this.props.dropdownTitle
        ),
        _React['default'].createElement('span', { className: 'caret' }),
        _React['default'].createElement(
          'span',
          { style: { letterSpacing: '-.3em' } },
          ' '
        )
      );

      return _React['default'].createElement(
        _ButtonGroup2['default'],
        {
          bsSize: this.props.bsSize,
          className: (0, _classNames['default'])(groupClasses),
          id: this.props.id },
        button,
        dropdownButton,
        _React['default'].createElement(
          _DropdownMenu2['default'],
          {
            ref: 'menu',
            onSelect: this.handleOptionSelect,
            'aria-labelledby': this.props.id,
            pullRight: this.props.pullRight },
          this.props.children
        )
      );
    },

    handleButtonClick: function handleButtonClick(e) {
      if (this.state.open) {
        this.setDropdownState(false);
      }

      if (this.props.onClick) {
        this.props.onClick(e, this.props.href, this.props.target);
      }
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

  module.exports = SplitButton;
});