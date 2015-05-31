define(['exports', 'module', 'react', 'classnames', './FormGroup'], function (exports, module, _react, _classnames, _FormGroup) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _FormGroup2 = _interopRequireDefault(_FormGroup);

  var InputBase = (function (_React$Component) {
    function InputBase() {
      _classCallCheck(this, InputBase);

      if (_React$Component != null) {
        _React$Component.apply(this, arguments);
      }
    }

    _inherits(InputBase, _React$Component);

    _createClass(InputBase, [{
      key: 'getInputDOMNode',
      value: function getInputDOMNode() {
        return _React['default'].findDOMNode(this.refs.input);
      }
    }, {
      key: 'getValue',
      value: function getValue() {
        if (this.props.type === 'static') {
          return this.props.value;
        } else if (this.props.type) {
          if (this.props.type === 'select' && this.props.multiple) {
            return this.getSelectedOptions();
          } else {
            return this.getInputDOMNode().value;
          }
        } else {
          throw 'Cannot use getValue without specifying input type.';
        }
      }
    }, {
      key: 'getChecked',
      value: function getChecked() {
        return this.getInputDOMNode().checked;
      }
    }, {
      key: 'getSelectedOptions',
      value: function getSelectedOptions() {
        var values = [];

        Array.prototype.forEach.call(this.getInputDOMNode().getElementsByTagName('option'), function (option) {
          if (option.selected) {
            var value = option.getAttribute('value') || option.innerHtml;
            values.push(value);
          }
        });

        return values;
      }
    }, {
      key: 'isCheckboxOrRadio',
      value: function isCheckboxOrRadio() {
        return this.props.type === 'checkbox' || this.props.type === 'radio';
      }
    }, {
      key: 'isFile',
      value: function isFile() {
        return this.props.type === 'file';
      }
    }, {
      key: 'renderInputGroup',
      value: function renderInputGroup(children) {
        var addonBefore = this.props.addonBefore ? _React['default'].createElement(
          'span',
          { className: 'input-group-addon', key: 'addonBefore' },
          this.props.addonBefore
        ) : null;

        var addonAfter = this.props.addonAfter ? _React['default'].createElement(
          'span',
          { className: 'input-group-addon', key: 'addonAfter' },
          this.props.addonAfter
        ) : null;

        var buttonBefore = this.props.buttonBefore ? _React['default'].createElement(
          'span',
          { className: 'input-group-btn' },
          this.props.buttonBefore
        ) : null;

        var buttonAfter = this.props.buttonAfter ? _React['default'].createElement(
          'span',
          { className: 'input-group-btn' },
          this.props.buttonAfter
        ) : null;

        var inputGroupClassName = undefined;
        switch (this.props.bsSize) {
          case 'small':
            inputGroupClassName = 'input-group-sm';break;
          case 'large':
            inputGroupClassName = 'input-group-lg';break;
        }

        return addonBefore || addonAfter || buttonBefore || buttonAfter ? _React['default'].createElement(
          'div',
          { className: (0, _classNames['default'])(inputGroupClassName, 'input-group'), key: 'input-group' },
          addonBefore,
          buttonBefore,
          children,
          addonAfter,
          buttonAfter
        ) : children;
      }
    }, {
      key: 'renderIcon',
      value: function renderIcon() {
        var classes = {
          'glyphicon': true,
          'form-control-feedback': true,
          'glyphicon-ok': this.props.bsStyle === 'success',
          'glyphicon-warning-sign': this.props.bsStyle === 'warning',
          'glyphicon-remove': this.props.bsStyle === 'error'
        };

        return this.props.hasFeedback ? _React['default'].createElement('span', { className: (0, _classNames['default'])(classes), key: 'icon' }) : null;
      }
    }, {
      key: 'renderHelp',
      value: function renderHelp() {
        return this.props.help ? _React['default'].createElement(
          'span',
          { className: 'help-block', key: 'help' },
          this.props.help
        ) : null;
      }
    }, {
      key: 'renderCheckboxAndRadioWrapper',
      value: function renderCheckboxAndRadioWrapper(children) {
        var classes = {
          'checkbox': this.props.type === 'checkbox',
          'radio': this.props.type === 'radio'
        };

        return _React['default'].createElement(
          'div',
          { className: (0, _classNames['default'])(classes), key: 'checkboxRadioWrapper' },
          children
        );
      }
    }, {
      key: 'renderWrapper',
      value: function renderWrapper(children) {
        return this.props.wrapperClassName ? _React['default'].createElement(
          'div',
          { className: this.props.wrapperClassName, key: 'wrapper' },
          children
        ) : children;
      }
    }, {
      key: 'renderLabel',
      value: function renderLabel(children) {
        var classes = {
          'control-label': !this.isCheckboxOrRadio()
        };
        classes[this.props.labelClassName] = this.props.labelClassName;

        return this.props.label ? _React['default'].createElement(
          'label',
          { htmlFor: this.props.id, className: (0, _classNames['default'])(classes), key: 'label' },
          children,
          this.props.label
        ) : children;
      }
    }, {
      key: 'renderInput',
      value: function renderInput() {
        if (!this.props.type) {
          return this.props.children;
        }

        switch (this.props.type) {
          case 'select':
            return _React['default'].createElement(
              'select',
              _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, 'form-control'), ref: 'input', key: 'input' }),
              this.props.children
            );
          case 'textarea':
            return _React['default'].createElement('textarea', _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, 'form-control'), ref: 'input', key: 'input' }));
          case 'static':
            return _React['default'].createElement(
              'p',
              _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, 'form-control-static'), ref: 'input', key: 'input' }),
              this.props.value
            );
        }

        var className = this.isCheckboxOrRadio() || this.isFile() ? '' : 'form-control';
        return _React['default'].createElement('input', _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, className), ref: 'input', key: 'input' }));
      }
    }, {
      key: 'renderFormGroup',
      value: function renderFormGroup(children) {
        return _React['default'].createElement(
          _FormGroup2['default'],
          this.props,
          children
        );
      }
    }, {
      key: 'renderChildren',
      value: function renderChildren() {
        return !this.isCheckboxOrRadio() ? [this.renderLabel(), this.renderWrapper([this.renderInputGroup(this.renderInput()), this.renderIcon(), this.renderHelp()])] : this.renderWrapper([this.renderCheckboxAndRadioWrapper(this.renderLabel(this.renderInput())), this.renderHelp()]);
      }
    }, {
      key: 'render',
      value: function render() {
        var children = this.renderChildren();
        return this.renderFormGroup(children);
      }
    }]);

    return InputBase;
  })(_React['default'].Component);

  InputBase.propTypes = {
    type: _React['default'].PropTypes.string,
    label: _React['default'].PropTypes.node,
    help: _React['default'].PropTypes.node,
    addonBefore: _React['default'].PropTypes.node,
    addonAfter: _React['default'].PropTypes.node,
    buttonBefore: _React['default'].PropTypes.node,
    buttonAfter: _React['default'].PropTypes.node,
    bsSize: _React['default'].PropTypes.oneOf(['small', 'medium', 'large']),
    bsStyle: _React['default'].PropTypes.oneOf(['success', 'warning', 'error']),
    hasFeedback: _React['default'].PropTypes.bool,
    id: _React['default'].PropTypes.string,
    groupClassName: _React['default'].PropTypes.string,
    wrapperClassName: _React['default'].PropTypes.string,
    labelClassName: _React['default'].PropTypes.string,
    multiple: _React['default'].PropTypes.bool,
    disabled: _React['default'].PropTypes.bool,
    value: _React['default'].PropTypes.any
  };

  module.exports = InputBase;
});