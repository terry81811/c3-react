"use strict";

require("bootstrap/dist/css/bootstrap.css");


const React = require("react");


let Router = require("react-router");
let { Route, DefaultRoute, RouteHandler } = Router;

let { Navbar, Nav, NavItem } = require("react-bootstrap");


const Nvd3Index = require("./components/AppComponent.jsx");

let Index = React.createClass({

  render: function() {
    return (
      <div style={{height: "100%"}}>
        <Navbar fixedTop fluid style={{marginBottom: 0}} brand={<a href="#">React-d3-libraries</a>}>
          <Nav>
            <NavItem key={1} eventKey={1} href="#/nvd3"> nvd3 </NavItem>
            <NavItem key={2} eventKey={2} href="#/query"> Query Mode </NavItem>
            <NavItem key={3} eventKey={3} href="#/docs"> Documents </NavItem>
          </Nav>
        </Navbar>

        <RouteHandler/>
      </div>
    );
  }
});

let routes = (
  <Route name="index" path="/" handler={Index}>
    <Route name="nvd3" path="/nvd3" handler={Nvd3Index}/>
    <DefaultRoute handler={Index}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById("container"));
});


