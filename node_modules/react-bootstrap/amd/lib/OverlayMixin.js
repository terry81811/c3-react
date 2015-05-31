define(['exports', 'module', 'react', './utils/CustomPropTypes', './utils/domUtils'], function (exports, module, _react, _utilsCustomPropTypes, _utilsDomUtils) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _CustomPropTypes = _interopRequireDefault(_utilsCustomPropTypes);

  var _domUtils = _interopRequireDefault(_utilsDomUtils);

  module.exports = {
    propTypes: {
      container: _CustomPropTypes['default'].mountable
    },

    componentWillUnmount: function componentWillUnmount() {
      this._unrenderOverlay();
      if (this._overlayTarget) {
        this.getContainerDOMNode().removeChild(this._overlayTarget);
        this._overlayTarget = null;
      }
    },

    componentDidUpdate: function componentDidUpdate() {
      this._renderOverlay();
    },

    componentDidMount: function componentDidMount() {
      this._renderOverlay();
    },

    _mountOverlayTarget: function _mountOverlayTarget() {
      this._overlayTarget = document.createElement('div');
      this.getContainerDOMNode().appendChild(this._overlayTarget);
    },

    _renderOverlay: function _renderOverlay() {
      if (!this._overlayTarget) {
        this._mountOverlayTarget();
      }

      var overlay = this.renderOverlay();

      // Save reference to help testing
      if (overlay !== null) {
        this._overlayInstance = _React['default'].render(overlay, this._overlayTarget);
      } else {
        // Unrender if the component is null for transitions to null
        this._unrenderOverlay();
      }
    },

    _unrenderOverlay: function _unrenderOverlay() {
      _React['default'].unmountComponentAtNode(this._overlayTarget);
      this._overlayInstance = null;
    },

    getOverlayDOMNode: function getOverlayDOMNode() {
      if (!this.isMounted()) {
        throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
      }

      if (this._overlayInstance) {
        return _React['default'].findDOMNode(this._overlayInstance);
      }

      return null;
    },

    getContainerDOMNode: function getContainerDOMNode() {
      return _React['default'].findDOMNode(this.props.container) || _domUtils['default'].ownerDocument(this).body;
    }
  };
});