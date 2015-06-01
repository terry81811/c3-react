"use strict";

require("bootstrap/dist/css/bootstrap.css");
require("./assets/stylesheet.css");


const React = require("react");

let Fluxxor = require("fluxxor");

let Router = require("react-router");
let { Route, DefaultRoute, RouteHandler } = Router;

let { Navbar, Nav, NavItem,
			MenuItem, DropdownButton
} = require("react-bootstrap");

const d3Index = require("./components/d3Index.jsx");
const Nvd3Index = require("./components/Nvd3Index.jsx");
const C3Index = require("./components/C3Index.jsx");
const googleChartIndex = require("./components/googleChartIndex.jsx");

// Initialize Fluxxor
// Stores
let DataStore = require("./stores/DataStore");
let stores = {
  DataStore: new DataStore()
};

// Actions
let DataActions = require("./actions/DataActions");
let actions = {
  DataActions: DataActions
};

// Flux
let flux = new Fluxxor.Flux(stores, actions);
flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

let Index = React.createClass({
	displayName: "Index",
  render: function() {
    return (
      <div style={{height: "100%"}}>
        <Navbar fixedTop fluid style={{marginBottom: 0}} brand={<a href="#">React-d3-libraries</a>}>
          <Nav>
            <NavItem key={1} eventKey={1} href="#/d3"> d3.js </NavItem>
            <NavItem key={2} eventKey={2} href="#/nvd3"> nvd3.js </NavItem>
            <NavItem key={3} eventKey={3} href="#/c3"> c3.js </NavItem>
            <NavItem key={4} eventKey={4} href="#/googleChart"> googleChart </NavItem>
							<DropdownButton eventKey={5} title='Dropdown'>
								<MenuItem eventKey='1' href="htt://www.Github.com">Github Page</MenuItem>
							</DropdownButton>
          </Nav>
        </Navbar>
        <div className={"wrapper"}>
					<RouteHandler/>
        </div>
      </div>
    );
  }
});

let routes = (
  <Route name="index" path="/" handler={Index}>
    <Route name="d3" path="/d3" handler={d3Index}/>
    <Route name="nvd3" path="/nvd3" handler={Nvd3Index}/>
    <Route name="c3" path="/c3" handler={C3Index}/>
    <Route name="googleChart" path="/googleChart" handler={googleChartIndex}/>
    <DefaultRoute handler={Index}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById("container"));
});


