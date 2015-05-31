const React = require("react");
const { Table, ButtonGroup, Button } = require("react-bootstrap");

let AppComponent = React.createClass({
	displayName: "AppComponent",
  render: function () {
    return (
			<div>
			<Table>
				<tbody>
				</tbody>
			</Table>
			<h1>Hello world!!!!</h1>
      </div>
    );
  }
});
module.exports = AppComponent;
