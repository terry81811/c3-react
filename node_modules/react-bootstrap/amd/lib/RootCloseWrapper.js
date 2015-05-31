define(['exports', 'module', 'react', './utils/domUtils', './utils/EventListener'], function (exports, module, _react, _utilsDomUtils, _utilsEventListener) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var _domUtils = _interopRequireDefault(_utilsDomUtils);

  var _EventListener = _interopRequireDefault(_utilsEventListener);

  // TODO: Merge this logic with dropdown logic once #526 is done.

  /**
   * Checks whether a node is within
   * a root nodes tree
   *
   * @param {DOMElement} node
   * @param {DOMElement} root
   * @returns {boolean}
   */
  function isNodeInRoot(node, root) {
    while (node) {
      if (node === root) {
        return true;
      }
      node = node.parentNode;
    }

    return false;
  }

  var RootCloseWrapper = (function (_React$Component) {
    function RootCloseWrapper(props) {
      _classCallCheck(this, RootCloseWrapper);

      _get(Object.getPrototypeOf(RootCloseWrapper.prototype), 'constructor', this).call(this, props);

      this.handleDocumentClick = this.handleDocumentClick.bind(this);
      this.handleDocumentKeyUp = this.handleDocumentKeyUp.bind(this);
    }

    _inherits(RootCloseWrapper, _React$Component);

    _createClass(RootCloseWrapper, [{
      key: 'bindRootCloseHandlers',
      value: function bindRootCloseHandlers() {
        var doc = _domUtils['default'].ownerDocument(this);

        this._onDocumentClickListener = _EventListener['default'].listen(doc, 'click', this.handleDocumentClick);
        this._onDocumentKeyupListener = _EventListener['default'].listen(doc, 'keyup', this.handleDocumentKeyUp);
      }
    }, {
      key: 'handleDocumentClick',
      value: function handleDocumentClick(e) {
        // If the click originated from within this component, don't do anything.
        if (isNodeInRoot(e.target, _React['default'].findDOMNode(this))) {
          return;
        }

        this.props.onRootClose();
      }
    }, {
      key: 'handleDocumentKeyUp',
      value: function handleDocumentKeyUp(e) {
        if (e.keyCode === 27) {
          this.props.onRootClose();
        }
      }
    }, {
      key: 'unbindRootCloseHandlers',
      value: function unbindRootCloseHandlers() {
        if (this._onDocumentClickListener) {
          this._onDocumentClickListener.remove();
        }

        if (this._onDocumentKeyupListener) {
          this._onDocumentKeyupListener.remove();
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.bindRootCloseHandlers();
      }
    }, {
      key: 'render',
      value: function render() {
        return _React['default'].Children.only(this.props.children);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.unbindRootCloseHandlers();
      }
    }]);

    return RootCloseWrapper;
  })(_React['default'].Component);

  module.exports = RootCloseWrapper;

  RootCloseWrapper.propTypes = {
    onRootClose: _React['default'].PropTypes.func.isRequired
  };
});