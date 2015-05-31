'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Interpolate = require('./Interpolate');

var _Interpolate2 = _interopRequireDefault(_Interpolate);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var ProgressBar = _react2['default'].createClass({
  displayName: 'ProgressBar',

  propTypes: {
    min: _react2['default'].PropTypes.number,
    now: _react2['default'].PropTypes.number,
    max: _react2['default'].PropTypes.number,
    label: _react2['default'].PropTypes.node,
    srOnly: _react2['default'].PropTypes.bool,
    striped: _react2['default'].PropTypes.bool,
    active: _react2['default'].PropTypes.bool
  },

  mixins: [_BootstrapMixin2['default']],

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'progress-bar',
      min: 0,
      max: 100
    };
  },

  getPercentage: function getPercentage(now, min, max) {
    var roundPrecision = 1000;
    return Math.round((now - min) / (max - min) * 100 * roundPrecision) / roundPrecision;
  },

  render: function render() {
    var classes = {
      progress: true
    };

    if (this.props.active) {
      classes['progress-striped'] = true;
      classes.active = true;
    } else if (this.props.striped) {
      classes['progress-striped'] = true;
    }

    if (!_utilsValidComponentChildren2['default'].hasValidComponent(this.props.children)) {
      if (!this.props.isChild) {
        return _react2['default'].createElement(
          'div',
          _extends({}, this.props, { className: (0, _classnames2['default'])(this.props.className, classes) }),
          this.renderProgressBar()
        );
      } else {
        return this.renderProgressBar();
      }
    } else {
      return _react2['default'].createElement(
        'div',
        _extends({}, this.props, { className: (0, _classnames2['default'])(this.props.className, classes) }),
        _utilsValidComponentChildren2['default'].map(this.props.children, this.renderChildBar)
      );
    }
  },

  renderChildBar: function renderChildBar(child, index) {
    return (0, _react.cloneElement)(child, {
      isChild: true,
      key: child.key ? child.key : index
    });
  },

  renderProgressBar: function renderProgressBar() {
    var percentage = this.getPercentage(this.props.now, this.props.min, this.props.max);

    var label = undefined;

    if (typeof this.props.label === 'string') {
      label = this.renderLabel(percentage);
    } else if (this.props.label) {
      label = this.props.label;
    }

    if (this.props.srOnly) {
      label = this.renderScreenReaderOnlyLabel(label);
    }

    var classes = this.getBsClassSet();

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: (0, _classnames2['default'])(this.props.className, classes), role: 'progressbar',
        style: { width: percentage + '%' },
        'aria-valuenow': this.props.now,
        'aria-valuemin': this.props.min,
        'aria-valuemax': this.props.max }),
      label
    );
  },

  renderLabel: function renderLabel(percentage) {
    var InterpolateClass = this.props.interpolateClass || _Interpolate2['default'];

    return _react2['default'].createElement(
      InterpolateClass,
      {
        now: this.props.now,
        min: this.props.min,
        max: this.props.max,
        percent: percentage,
        bsStyle: this.props.bsStyle },
      this.props.label
    );
  },

  renderScreenReaderOnlyLabel: function renderScreenReaderOnlyLabel(label) {
    return _react2['default'].createElement(
      'span',
      { className: 'sr-only' },
      label
    );
  }
});

exports['default'] = ProgressBar;
module.exports = exports['default'];