define(['exports', 'module', 'react', './OverlayMixin', './RootCloseWrapper', './utils/createChainedFunction', './utils/createContextWrapper', './utils/domUtils', './utils/Object.assign'], function (exports, module, _react, _OverlayMixin, _RootCloseWrapper, _utilsCreateChainedFunction, _utilsCreateContextWrapper, _utilsDomUtils, _utilsObjectAssign) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _OverlayMixin2 = _interopRequireDefault(_OverlayMixin);

  var _RootCloseWrapper2 = _interopRequireDefault(_RootCloseWrapper);

  var _createChainedFunction = _interopRequireDefault(_utilsCreateChainedFunction);

  var _createContextWrapper = _interopRequireDefault(_utilsCreateContextWrapper);

  var _domUtils = _interopRequireDefault(_utilsDomUtils);

  var _assign = _interopRequireDefault(_utilsObjectAssign);

  /**
   * Check if value one is inside or equal to the of value
   *
   * @param {string} one
   * @param {string|array} of
   * @returns {boolean}
   */
  function isOneOf(one, of) {
    if (Array.isArray(of)) {
      return of.indexOf(one) >= 0;
    }
    return one === of;
  }

  var OverlayTrigger = _React['default'].createClass({
    displayName: 'OverlayTrigger',

    mixins: [_OverlayMixin2['default']],

    propTypes: {
      trigger: _React['default'].PropTypes.oneOfType([_React['default'].PropTypes.oneOf(['manual', 'click', 'hover', 'focus']), _React['default'].PropTypes.arrayOf(_React['default'].PropTypes.oneOf(['click', 'hover', 'focus']))]),
      placement: _React['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
      delay: _React['default'].PropTypes.number,
      delayShow: _React['default'].PropTypes.number,
      delayHide: _React['default'].PropTypes.number,
      defaultOverlayShown: _React['default'].PropTypes.bool,
      overlay: _React['default'].PropTypes.node.isRequired,
      containerPadding: _React['default'].PropTypes.number,
      rootClose: _React['default'].PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        placement: 'right',
        trigger: ['hover', 'focus'],
        containerPadding: 0
      };
    },

    getInitialState: function getInitialState() {
      return {
        isOverlayShown: this.props.defaultOverlayShown == null ? false : this.props.defaultOverlayShown,
        overlayLeft: null,
        overlayTop: null,
        arrowOffsetLeft: null,
        arrowOffsetTop: null
      };
    },

    show: function show() {
      this.setState({
        isOverlayShown: true
      }, function () {
        this.updateOverlayPosition();
      });
    },

    hide: function hide() {
      this.setState({
        isOverlayShown: false
      });
    },

    toggle: function toggle() {
      if (this.state.isOverlayShown) {
        this.hide();
      } else {
        this.show();
      }
    },

    renderOverlay: function renderOverlay() {
      if (!this.state.isOverlayShown) {
        return _React['default'].createElement('span', null);
      }

      var overlay = (0, _react.cloneElement)(this.props.overlay, {
        onRequestHide: this.hide,
        placement: this.props.placement,
        positionLeft: this.state.overlayLeft,
        positionTop: this.state.overlayTop,
        arrowOffsetLeft: this.state.arrowOffsetLeft,
        arrowOffsetTop: this.state.arrowOffsetTop
      });

      if (this.props.rootClose) {
        return _React['default'].createElement(
          _RootCloseWrapper2['default'],
          { onRootClose: this.hide },
          overlay
        );
      } else {
        return overlay;
      }
    },

    render: function render() {
      var child = _React['default'].Children.only(this.props.children);
      if (this.props.trigger === 'manual') {
        return child;
      }

      var props = {};

      props.onClick = (0, _createChainedFunction['default'])(child.props.onClick, this.props.onClick);
      if (isOneOf('click', this.props.trigger)) {
        props.onClick = (0, _createChainedFunction['default'])(this.toggle, props.onClick);
      }

      if (isOneOf('hover', this.props.trigger)) {
        props.onMouseOver = (0, _createChainedFunction['default'])(this.handleDelayedShow, this.props.onMouseOver);
        props.onMouseOut = (0, _createChainedFunction['default'])(this.handleDelayedHide, this.props.onMouseOut);
      }

      if (isOneOf('focus', this.props.trigger)) {
        props.onFocus = (0, _createChainedFunction['default'])(this.handleDelayedShow, this.props.onFocus);
        props.onBlur = (0, _createChainedFunction['default'])(this.handleDelayedHide, this.props.onBlur);
      }

      return (0, _react.cloneElement)(child, props);
    },

    componentWillUnmount: function componentWillUnmount() {
      clearTimeout(this._hoverDelay);
    },

    componentDidMount: function componentDidMount() {
      if (this.props.defaultOverlayShown) {
        this.updateOverlayPosition();
      }
    },

    handleDelayedShow: function handleDelayedShow() {
      if (this._hoverDelay != null) {
        clearTimeout(this._hoverDelay);
        this._hoverDelay = null;
        return;
      }

      var delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;

      if (!delay) {
        this.show();
        return;
      }

      this._hoverDelay = setTimeout((function () {
        this._hoverDelay = null;
        this.show();
      }).bind(this), delay);
    },

    handleDelayedHide: function handleDelayedHide() {
      if (this._hoverDelay != null) {
        clearTimeout(this._hoverDelay);
        this._hoverDelay = null;
        return;
      }

      var delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;

      if (!delay) {
        this.hide();
        return;
      }

      this._hoverDelay = setTimeout((function () {
        this._hoverDelay = null;
        this.hide();
      }).bind(this), delay);
    },

    updateOverlayPosition: function updateOverlayPosition() {
      if (!this.isMounted()) {
        return;
      }

      this.setState(this.calcOverlayPosition());
    },

    calcOverlayPosition: function calcOverlayPosition() {
      var childOffset = this.getPosition();

      var overlayNode = this.getOverlayDOMNode();
      var overlayHeight = overlayNode.offsetHeight;
      var overlayWidth = overlayNode.offsetWidth;

      var placement = this.props.placement;
      var overlayLeft = undefined,
          overlayTop = undefined,
          arrowOffsetLeft = undefined,
          arrowOffsetTop = undefined;

      if (placement === 'left' || placement === 'right') {
        overlayTop = childOffset.top + (childOffset.height - overlayHeight) / 2;

        if (placement === 'left') {
          overlayLeft = childOffset.left - overlayWidth;
        } else {
          overlayLeft = childOffset.left + childOffset.width;
        }

        var topDelta = this._getTopDelta(overlayTop, overlayHeight);
        overlayTop += topDelta;
        arrowOffsetTop = 50 * (1 - 2 * topDelta / overlayHeight) + '%';
        arrowOffsetLeft = null;
      } else if (placement === 'top' || placement === 'bottom') {
        overlayLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;

        if (placement === 'top') {
          overlayTop = childOffset.top - overlayHeight;
        } else {
          overlayTop = childOffset.top + childOffset.height;
        }

        var leftDelta = this._getLeftDelta(overlayLeft, overlayWidth);
        overlayLeft += leftDelta;
        arrowOffsetLeft = 50 * (1 - 2 * leftDelta / overlayWidth) + '%';
        arrowOffsetTop = null;
      } else {
        throw new Error('calcOverlayPosition(): No such placement of "' + this.props.placement + '" found.');
      }

      return { overlayLeft: overlayLeft, overlayTop: overlayTop, arrowOffsetLeft: arrowOffsetLeft, arrowOffsetTop: arrowOffsetTop };
    },

    _getTopDelta: function _getTopDelta(top, overlayHeight) {
      var containerDimensions = this._getContainerDimensions();
      var containerScroll = containerDimensions.scroll;
      var containerHeight = containerDimensions.height;

      var padding = this.props.containerPadding;
      var topEdgeOffset = top - padding - containerScroll;
      var bottomEdgeOffset = top + padding - containerScroll + overlayHeight;

      if (topEdgeOffset < 0) {
        return -topEdgeOffset;
      } else if (bottomEdgeOffset > containerHeight) {
        return containerHeight - bottomEdgeOffset;
      } else {
        return 0;
      }
    },

    _getLeftDelta: function _getLeftDelta(left, overlayWidth) {
      var containerDimensions = this._getContainerDimensions();
      var containerWidth = containerDimensions.width;

      var padding = this.props.containerPadding;
      var leftEdgeOffset = left - padding;
      var rightEdgeOffset = left + padding + overlayWidth;

      if (leftEdgeOffset < 0) {
        return -leftEdgeOffset;
      } else if (rightEdgeOffset > containerWidth) {
        return containerWidth - rightEdgeOffset;
      } else {
        return 0;
      }
    },

    _getContainerDimensions: function _getContainerDimensions() {
      var containerNode = this.getContainerDOMNode();
      var width = undefined,
          height = undefined,
          scroll = undefined;

      if (containerNode.tagName === 'BODY') {
        width = window.innerWidth;
        height = window.innerHeight;
        scroll = _domUtils['default'].ownerDocument(containerNode).documentElement.scrollTop || containerNode.scrollTop;
      } else {
        width = containerNode.offsetWidth;
        height = containerNode.offsetHeight;
        scroll = containerNode.scrollTop;
      }

      return { width: width, height: height, scroll: scroll };
    },

    getPosition: function getPosition() {
      var node = _React['default'].findDOMNode(this);
      var container = this.getContainerDOMNode();

      var offset = container.tagName === 'BODY' ? _domUtils['default'].getOffset(node) : _domUtils['default'].getPosition(node, container);

      return (0, _assign['default'])({}, offset, {
        height: node.offsetHeight,
        width: node.offsetWidth
      });
    }
  });

  /**
   * Creates a new OverlayTrigger class that forwards the relevant context
   *
   * This static method should only be called at the module level, instead of in
   * e.g. a render() method, because it's expensive to create new classes.
   *
   * For example, you would want to have:
   *
   * > export default OverlayTrigger.withContext({
   * >   myContextKey: React.PropTypes.object
   * > });
   *
   * and import this when needed.
   */
  OverlayTrigger.withContext = (0, _createContextWrapper['default'])(OverlayTrigger, 'overlay');

  module.exports = OverlayTrigger;
});