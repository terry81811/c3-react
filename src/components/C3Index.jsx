const React = require("react");
const {
	ButtonToolbar,
	MenuItem,
	SplitButton
} = require("react-bootstrap");

const c3 = require("c3");
const d3 = require("d3");
const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

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

//c3.js 
	drawGraph: function() {
		let colorScale = d3.scale.category20();
		let chart = c3.generate({
			bindto: "#chart",
			data: {
				json: this.state.DataStore.data[0].values,
				keys: {
					x: "label",
					value: ["value"]
				},
        names: {
            value: this.state.DataStore.data[0].key
        },
        type: "bar",
        color: function (color, d) {
            return colorScale(d.index);
        },
				onclick: function (d, element) {
					console.log(d);
				}
			},
    axis: {
        x: {
            type: "category" // this needed to load string x value
        }
    },
			size: {
				width: 600,
				height: 400
			},
			tooltip: {
				grouped: true // Default true
			}
		});
		return chart;
	},

  componentDidMount: function() {
		this.drawGraph();
  },

  componentDidUpdate: function () {
		this.drawGraph();
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
    return (
			<div>
				<h1>C3Index</h1>
				<ButtonToolbar>
				<SplitButton title={"Type"}>
					<MenuItem eventKey='1' onClick={this.handleChartTypeChange.bind(null, "bar")}>Bar</MenuItem>
					<MenuItem eventKey='2' onClick={this.handleChartTypeChange.bind(null, "pie")}>Pie</MenuItem>
					<MenuItem eventKey='3' onClick={this.handleChartTypeChange.bind(null, "multiBar")}>MultiBar</MenuItem>
					<MenuItem eventKey='4' onClick={this.handleChartTypeChange.bind(null, "lineBar")}>Line+Bar</MenuItem>
					<MenuItem eventKey='5'>Other</MenuItem>
				</SplitButton>
				<SplitButton title={"Data"}>
					<MenuItem eventKey='1' onClick={this.handleNewDataClick}>New Data</MenuItem>
					<MenuItem eventKey='2' onClick={this.handleAddEntryClick}>Add Entry</MenuItem>
					<MenuItem eventKey='3' onClick={this.handleRemoveEntryClick}>Remove Entry</MenuItem>
					<MenuItem eventKey='4' onClick={this.handleRemoveDataClick}>Remove Data</MenuItem>
				</SplitButton>
				</ButtonToolbar>
				<div id="chart">
				</div>
      </div>
    );
  }
});
module.exports = C3Index;
