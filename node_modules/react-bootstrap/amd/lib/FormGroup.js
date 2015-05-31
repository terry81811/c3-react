define(['exports', 'module', 'react', 'classnames'], function (exports, module, _react, _classnames) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var FormGroup = (function (_React$Component) {
    function FormGroup() {
      _classCallCheck(this, FormGroup);

      if (_React$Component != null) {
        _React$Component.apply(this, arguments);
      }
    }

    _inherits(FormGroup, _React$Component);

    _createClass(FormGroup, [{
      key: 'render',
      value: function render() {
        var classes = {
          'form-group': !this.props.standalone,
          'form-group-lg': !this.props.standalone && this.props.bsSize === 'large',
          'form-group-sm': !this.props.standalone && this.props.bsSize === 'small',
          'has-feedback': this.props.hasFeedback,
          'has-success': this.props.bsStyle === 'success',
          'has-warning': this.props.bsStyle === 'warning',
          'has-error': this.props.bsStyle === 'error'
        };

        return _React['default'].createElement(
          'div',
          { className: (0, _classNames['default'])(classes, this.props.groupClassName) },
          this.props.children
        );
      }
    }]);

    return FormGroup;
  })(_React['default'].Component);

  FormGroup.defaultProps = {
    standalone: false
  };

  FormGroup.propTypes = {
    standalone: _React['default'].PropTypes.bool,
    hasFeedback: _React['default'].PropTypes.bool,
    bsSize: function bsSize(props) {
      if (props.standalone && props.bsSize !== undefined) {
        return new Error('bsSize will not be used when `standalone` is set.');
      }

      return _React['default'].PropTypes.oneOf(['small', 'medium', 'large']).apply(null, arguments);
    },
    bsStyle: _React['default'].PropTypes.oneOf(['success', 'warning', 'error']),
    groupClassName: _React['default'].PropTypes.string
  };

  module.exports = FormGroup;
});