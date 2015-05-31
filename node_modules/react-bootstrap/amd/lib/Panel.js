define(['exports', 'module', 'react', 'classnames', './BootstrapMixin', './CollapsibleMixin'], function (exports, module, _react, _classnames, _BootstrapMixin, _CollapsibleMixin) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _CollapsibleMixin2 = _interopRequireDefault(_CollapsibleMixin);

  var Panel = _React['default'].createClass({
    displayName: 'Panel',

    mixins: [_BootstrapMixin2['default'], _CollapsibleMixin2['default']],

    propTypes: {
      collapsible: _React['default'].PropTypes.bool,
      onSelect: _React['default'].PropTypes.func,
      header: _React['default'].PropTypes.node,
      id: _React['default'].PropTypes.string,
      footer: _React['default'].PropTypes.node,
      eventKey: _React['default'].PropTypes.any
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'panel',
        bsStyle: 'default'
      };
    },

    handleSelect: function handleSelect(e) {
      e.selected = true;

      if (this.props.onSelect) {
        this.props.onSelect(e, this.props.eventKey);
      } else {
        e.preventDefault();
      }

      if (e.selected) {
        this.handleToggle();
      }
    },

    handleToggle: function handleToggle() {
      this.setState({ expanded: !this.state.expanded });
    },

    getCollapsibleDimensionValue: function getCollapsibleDimensionValue() {
      return _React['default'].findDOMNode(this.refs.panel).scrollHeight;
    },

    getCollapsibleDOMNode: function getCollapsibleDOMNode() {
      if (!this.isMounted() || !this.refs || !this.refs.panel) {
        return null;
      }

      return _React['default'].findDOMNode(this.refs.panel);
    },

    render: function render() {
      return _React['default'].createElement(
        'div',
        _extends({}, this.props, {
          className: (0, _classNames['default'])(this.props.className, this.getBsClassSet()),
          id: this.props.collapsible ? null : this.props.id, onSelect: null }),
        this.renderHeading(),
        this.props.collapsible ? this.renderCollapsibleBody() : this.renderBody(),
        this.renderFooter()
      );
    },

    renderCollapsibleBody: function renderCollapsibleBody() {
      var collapseClass = this.prefixClass('collapse');

      return _React['default'].createElement(
        'div',
        {
          className: (0, _classNames['default'])(this.getCollapsibleClassSet(collapseClass)),
          id: this.props.id,
          ref: 'panel',
          'aria-expanded': this.isExpanded() ? 'true' : 'false' },
        this.renderBody()
      );
    },

    renderBody: function renderBody() {
      var allChildren = this.props.children;
      var bodyElements = [];
      var panelBodyChildren = [];
      var bodyClass = this.prefixClass('body');

      function getProps() {
        return { key: bodyElements.length };
      }

      function addPanelChild(child) {
        bodyElements.push((0, _react.cloneElement)(child, getProps()));
      }

      function addPanelBody(children) {
        bodyElements.push(_React['default'].createElement(
          'div',
          _extends({ className: bodyClass }, getProps()),
          children
        ));
      }

      function maybeRenderPanelBody() {
        if (panelBodyChildren.length === 0) {
          return;
        }

        addPanelBody(panelBodyChildren);
        panelBodyChildren = [];
      }

      // Handle edge cases where we should not iterate through children.
      if (!Array.isArray(allChildren) || allChildren.length === 0) {
        if (this.shouldRenderFill(allChildren)) {
          addPanelChild(allChildren);
        } else {
          addPanelBody(allChildren);
        }
      } else {

        allChildren.forEach((function (child) {
          if (this.shouldRenderFill(child)) {
            maybeRenderPanelBody();

            // Separately add the filled element.
            addPanelChild(child);
          } else {
            panelBodyChildren.push(child);
          }
        }).bind(this));

        maybeRenderPanelBody();
      }

      return bodyElements;
    },

    shouldRenderFill: function shouldRenderFill(child) {
      return _React['default'].isValidElement(child) && child.props.fill != null;
    },

    renderHeading: function renderHeading() {
      var header = this.props.header;

      if (!header) {
        return null;
      }

      if (!_React['default'].isValidElement(header) || Array.isArray(header)) {
        header = this.props.collapsible ? this.renderCollapsibleTitle(header) : header;
      } else {
        var className = (0, _classNames['default'])(this.prefixClass('title'), header.props.className);

        if (this.props.collapsible) {
          header = (0, _react.cloneElement)(header, {
            className: className,
            children: this.renderAnchor(header.props.children)
          });
        } else {
          header = (0, _react.cloneElement)(header, { className: className });
        }
      }

      return _React['default'].createElement(
        'div',
        { className: this.prefixClass('heading') },
        header
      );
    },

    renderAnchor: function renderAnchor(header) {
      return _React['default'].createElement(
        'a',
        {
          href: '#' + (this.props.id || ''),
          className: this.isExpanded() ? null : 'collapsed',
          'aria-expanded': this.isExpanded() ? 'true' : 'false',
          onClick: this.handleSelect },
        header
      );
    },

    renderCollapsibleTitle: function renderCollapsibleTitle(header) {
      return _React['default'].createElement(
        'h4',
        { className: this.prefixClass('title') },
        this.renderAnchor(header)
      );
    },

    renderFooter: function renderFooter() {
      if (!this.props.footer) {
        return null;
      }

      return _React['default'].createElement(
        'div',
        { className: this.prefixClass('footer') },
        this.props.footer
      );
    }
  });

  module.exports = Panel;
});