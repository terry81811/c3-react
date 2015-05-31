define(['exports', 'module', 'react', './CustomPropTypes'], function (exports, module, _react, _CustomPropTypes) {
  'use strict';

  module.exports = valueValidation;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var propList = ['children', 'value'];
  var typeList = [_React['default'].PropTypes.number, _React['default'].PropTypes.string];

  function valueValidation(props, propName, componentName) {
    var error = (0, _CustomPropTypes.singlePropFrom)(propList)(props, propName, componentName);
    if (!error) {
      var oneOfType = _React['default'].PropTypes.oneOfType(typeList);
      error = oneOfType(props, propName, componentName);
    }
    return error;
  }
});