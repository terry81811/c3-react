const React = require("react");
const {
	ButtonToolbar,
	MenuItem,
	SplitButton
} = require("react-bootstrap");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

const C3Chart = require("./C3Chart.jsx");

let C3Index = React.createClass({
	displayName: "C3Component",
  mixins: [FluxMixin, StoreWatchMixin("DataStore")],

  getInitialState: function() {
    return {};
  },

  getStateFromFlux: function() {
    let flux = this.getFlux();
    return {
      DataStore: flux.store("DataStore").getState(),
    };
  },

  handleNewDataClick: function() {
    this.getFlux().actions.DataActions.newData();
  },

  handleAddEntryClick: function() {
    this.getFlux().actions.DataActions.addEntry();
  },

  handleRemoveEntryClick: function() {
    this.getFlux().actions.DataActions.removeEntry();
  },

  handleRemoveDataClick: function() {
    this.getFlux().actions.DataActions.removeData();
  },

  handleChartTypeChange: function(type) {
    this.getFlux().actions.DataActions.changeChartType(type);
  },

  render: function () {
		//sample options
		let options = {
			padding: {
				top: 20,
				bottom: 20,
				left: 40,
				right: 10
			},
			size: {
				width: 640,
				height: 480
			},
			subchart: true,
			zoom: true,
			grid: {
				y: true
			},
			labels: true,
			axisLabel: {
				x: "x軸",
				y: "y軸"
			},
			onClick: function(d) {
				let categories = this.categories();
				console.log(d);
				console.log("you clicked {" + d.name + ": " + categories[d.x] + ": " + d.value + "}");
			}
		};
    return (
			<div>
				<h1>C3-React-Component</h1>
        <h3>{this.state.DataStore.type}</h3>
				<ButtonToolbar>
				<SplitButton title={"Type"}>
					<MenuItem eventKey='1' onClick={this.handleChartTypeChange.bind(null, "line")}>Line</MenuItem>
					<MenuItem eventKey='2' onClick={this.handleChartTypeChange.bind(null, "bar")}>Bar</MenuItem>
					<MenuItem eventKey='3' onClick={this.handleChartTypeChange.bind(null, "pie")}>Pie</MenuItem>
					<MenuItem eventKey='4' onClick={this.handleChartTypeChange.bind(null, "multiBar")}>MultiBar</MenuItem>
					<MenuItem eventKey='5' onClick={this.handleChartTypeChange.bind(null, "lineBar")}>Line+Bar</MenuItem>
					<MenuItem eventKey='6'>Other</MenuItem>
				</SplitButton>
				<SplitButton title={"Data"}>
					<MenuItem eventKey='1' onClick={this.handleNewDataClick}>New Data</MenuItem>
					<MenuItem eventKey='2' onClick={this.handleAddEntryClick}>Add Entry</MenuItem>
					<MenuItem eventKey='3' onClick={this.handleRemoveEntryClick}>Remove Entry</MenuItem>
					<MenuItem eventKey='4' onClick={this.handleRemoveDataClick}>Remove Data</MenuItem>
				</SplitButton>
				</ButtonToolbar>
				<div id="chart">
					<C3Chart  data={this.state.DataStore.data}
                    type={this.state.DataStore.type}
                    options={options}/>
				</div>
      </div>
    );
  }
});
module.exports = C3Index;
