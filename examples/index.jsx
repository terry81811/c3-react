"use strict";

require("./assets/stylesheet.css");
//c3.js
require("c3/c3.min.css");

const React = require("react");

let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

let Router = require("react-router");
let { Route, DefaultRoute, RouteHandler } = Router;

let { Navbar, Nav, NavItem,
			MenuItem, DropdownButton
} = require("react-bootstrap");

const C3Index = require("./components/C3Index.jsx");
const DocIndex = require("./components/DocIndex.jsx");

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
  mixins: [FluxMixin],

  render: function() {
    return (
      <div style={{height: "100%"}}>
        <Navbar fixedTop fluid style={{marginBottom: 0}} brand={<a href="#">C3-React</a>}>
          <Nav>
            <NavItem key={1} eventKey={1} href="#/c3"> demo </NavItem>
							<DropdownButton eventKey={2} title='documents'>
                <MenuItem eventKey='1' href="#/doc">documents</MenuItem>
								<MenuItem eventKey='2' href="https://github.com/terry81811/c3-react">Github Page</MenuItem>
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
    <Route name="c3" path="/c3" handler={C3Index}/>
    <Route name="doc" path="/doc" handler={DocIndex}/>
    <DefaultRoute handler={C3Index}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler flux={flux} />, document.getElementById("container"));
});


