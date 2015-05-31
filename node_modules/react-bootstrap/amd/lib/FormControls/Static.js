define(['exports', 'module', 'react', 'classnames', '../InputBase', '../utils/childrenValueInputValidation'], function (exports, module, _react, _classnames, _InputBase2, _utilsChildrenValueInputValidation) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _InputBase3 = _interopRequireDefault(_InputBase2);

  var _childrenValueValidation = _interopRequireDefault(_utilsChildrenValueInputValidation);

  var Static = (function (_InputBase) {
    function Static() {
      _classCallCheck(this, Static);

      if (_InputBase != null) {
        _InputBase.apply(this, arguments);
      }
    }

    _inherits(Static, _InputBase);

    _createClass(Static, [{
      key: 'getValue',
      value: function getValue() {
        var _props = this.props;
        var children = _props.children;
        var value = _props.value;

        return children ? children : value;
      }
    }, {
      key: 'renderInput',
      value: function renderInput() {
        return _React['default'].createElement(
          'p',
          _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, 'form-control-static'), ref: 'input', key: 'input' }),
          this.getValue()
        );
      }
    }]);

    return Static;
  })(_InputBase3['default']);

  Static.propTypes = {
    value: _childrenValueValidation['default'],
    children: _childrenValueValidation['default']
  };

  module.exports = Static;
});