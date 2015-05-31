define(['exports', 'module', 'react', 'classnames', './BootstrapMixin', './FadeMixin', './utils/domUtils', './utils/EventListener'], function (exports, module, _react, _classnames, _BootstrapMixin, _FadeMixin, _utilsDomUtils, _utilsEventListener) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _FadeMixin2 = _interopRequireDefault(_FadeMixin);

  var _domUtils = _interopRequireDefault(_utilsDomUtils);

  var _EventListener = _interopRequireDefault(_utilsEventListener);

  // TODO:
  // - aria-labelledby
  // - Add `modal-body` div if only one child passed in that doesn't already have it
  // - Tests

  var Modal = _React['default'].createClass({
    displayName: 'Modal',

    mixins: [_BootstrapMixin2['default'], _FadeMixin2['default']],

    propTypes: {
      title: _React['default'].PropTypes.node,
      backdrop: _React['default'].PropTypes.oneOf(['static', true, false]),
      keyboard: _React['default'].PropTypes.bool,
      closeButton: _React['default'].PropTypes.bool,
      animation: _React['default'].PropTypes.bool,
      onRequestHide: _React['default'].PropTypes.func.isRequired,
      dialogClassName: _React['default'].PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'modal',
        backdrop: true,
        keyboard: true,
        animation: true,
        closeButton: true
      };
    },

    render: function render() {
      var modalStyle = { display: 'block' };
      var dialogClasses = this.getBsClassSet();
      delete dialogClasses.modal;
      dialogClasses['modal-dialog'] = true;

      var classes = {
        modal: true,
        fade: this.props.animation,
        'in': !this.props.animation
      };

      var modal = _React['default'].createElement(
        'div',
        _extends({}, this.props, {
          title: null,
          tabIndex: '-1',
          role: 'dialog',
          style: modalStyle,
          className: (0, _classNames['default'])(this.props.className, classes),
          onClick: this.props.backdrop === true ? this.handleBackdropClick : null,
          ref: 'modal' }),
        _React['default'].createElement(
          'div',
          { className: (0, _classNames['default'])(this.props.dialogClassName, dialogClasses) },
          _React['default'].createElement(
            'div',
            { className: 'modal-content' },
            this.props.title ? this.renderHeader() : null,
            this.props.children
          )
        )
      );

      return this.props.backdrop ? this.renderBackdrop(modal) : modal;
    },

    renderBackdrop: function renderBackdrop(modal) {
      var classes = {
        'modal-backdrop': true,
        fade: this.props.animation,
        'in': !this.props.animation
      };

      var onClick = this.props.backdrop === true ? this.handleBackdropClick : null;

      return _React['default'].createElement(
        'div',
        null,
        _React['default'].createElement('div', { className: (0, _classNames['default'])(classes), ref: 'backdrop', onClick: onClick }),
        modal
      );
    },

    renderHeader: function renderHeader() {
      var closeButton = undefined;
      if (this.props.closeButton) {
        closeButton = _React['default'].createElement(
          'button',
          { type: 'button', className: 'close', 'aria-hidden': 'true', onClick: this.props.onRequestHide },
          '×'
        );
      }

      return _React['default'].createElement(
        'div',
        { className: 'modal-header' },
        closeButton,
        this.renderTitle()
      );
    },

    renderTitle: function renderTitle() {
      return _React['default'].isValidElement(this.props.title) ? this.props.title : _React['default'].createElement(
        'h4',
        { className: 'modal-title' },
        this.props.title
      );
    },

    iosClickHack: function iosClickHack() {
      // IOS only allows click events to be delegated to the document on elements
      // it considers 'clickable' - anchors, buttons, etc. We fake a click handler on the
      // DOM nodes themselves. Remove if handled by React: https://github.com/facebook/react/issues/1169
      _React['default'].findDOMNode(this.refs.modal).onclick = function () {};
      _React['default'].findDOMNode(this.refs.backdrop).onclick = function () {};
    },

    componentDidMount: function componentDidMount() {
      this._onDocumentKeyupListener = _EventListener['default'].listen(_domUtils['default'].ownerDocument(this), 'keyup', this.handleDocumentKeyUp);

      var container = this.props.container && _React['default'].findDOMNode(this.props.container) || _domUtils['default'].ownerDocument(this).body;
      container.className += container.className.length ? ' modal-open' : 'modal-open';

      this.focusModalContent();

      if (this.props.backdrop) {
        this.iosClickHack();
      }
    },

    componentDidUpdate: function componentDidUpdate(prevProps) {
      if (this.props.backdrop && this.props.backdrop !== prevProps.backdrop) {
        this.iosClickHack();
      }
    },

    componentWillUnmount: function componentWillUnmount() {
      this._onDocumentKeyupListener.remove();
      var container = this.props.container && _React['default'].findDOMNode(this.props.container) || _domUtils['default'].ownerDocument(this).body;
      container.className = container.className.replace(/ ?modal-open/, '');

      this.restoreLastFocus();
    },

    handleBackdropClick: function handleBackdropClick(e) {
      if (e.target !== e.currentTarget) {
        return;
      }

      this.props.onRequestHide();
    },

    handleDocumentKeyUp: function handleDocumentKeyUp(e) {
      if (this.props.keyboard && e.keyCode === 27) {
        this.props.onRequestHide();
      }
    },

    focusModalContent: function focusModalContent() {
      this.lastFocus = _domUtils['default'].ownerDocument(this).activeElement;
      var modalContent = _React['default'].findDOMNode(this.refs.modal);
      modalContent.focus();
    },

    restoreLastFocus: function restoreLastFocus() {
      if (this.lastFocus) {
        this.lastFocus.focus();
        this.lastFocus = null;
      }
    }
  });

  module.exports = Modal;
});