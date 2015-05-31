define(['exports', 'module', 'react', './OverlayMixin', './utils/createChainedFunction', './utils/createContextWrapper'], function (exports, module, _react, _OverlayMixin, _utilsCreateChainedFunction, _utilsCreateContextWrapper) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _OverlayMixin2 = _interopRequireDefault(_OverlayMixin);

  var _createChainedFunction = _interopRequireDefault(_utilsCreateChainedFunction);

  var _createContextWrapper = _interopRequireDefault(_utilsCreateContextWrapper);

  var ModalTrigger = _React['default'].createClass({
    displayName: 'ModalTrigger',

    mixins: [_OverlayMixin2['default']],

    propTypes: {
      modal: _React['default'].PropTypes.node.isRequired
    },

    getInitialState: function getInitialState() {
      return {
        isOverlayShown: false
      };
    },

    show: function show() {
      this.setState({
        isOverlayShown: true
      });
    },

    hide: function hide() {
      this.setState({
        isOverlayShown: false
      });
    },

    toggle: function toggle() {
      this.setState({
        isOverlayShown: !this.state.isOverlayShown
      });
    },

    renderOverlay: function renderOverlay() {
      if (!this.state.isOverlayShown) {
        return _React['default'].createElement('span', null);
      }

      return (0, _react.cloneElement)(this.props.modal, {
        onRequestHide: this.hide
      });
    },

    render: function render() {
      var child = _React['default'].Children.only(this.props.children);
      var props = {};

      props.onClick = (0, _createChainedFunction['default'])(child.props.onClick, this.toggle);
      props.onMouseOver = (0, _createChainedFunction['default'])(child.props.onMouseOver, this.props.onMouseOver);
      props.onMouseOut = (0, _createChainedFunction['default'])(child.props.onMouseOut, this.props.onMouseOut);
      props.onFocus = (0, _createChainedFunction['default'])(child.props.onFocus, this.props.onFocus);
      props.onBlur = (0, _createChainedFunction['default'])(child.props.onBlur, this.props.onBlur);

      return (0, _react.cloneElement)(child, props);
    }
  });

  /**
   * Creates a new ModalTrigger class that forwards the relevant context
   *
   * This static method should only be called at the module level, instead of in
   * e.g. a render() method, because it's expensive to create new classes.
   *
   * For example, you would want to have:
   *
   * > export default ModalTrigger.withContext({
   * >   myContextKey: React.PropTypes.object
   * > });
   *
   * and import this when needed.
   */
  ModalTrigger.withContext = (0, _createContextWrapper['default'])(ModalTrigger, 'modal');

  module.exports = ModalTrigger;
});