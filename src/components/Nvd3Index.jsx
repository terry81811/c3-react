"use strict";

const React = require("react/addons");
const {
	Button, ButtonToolbar,
	MenuItem,
	SplitButton
} = require("react-bootstrap");

const d3 = require("d3");
const nvd3 = require("nvd3");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;


let Nvd3Index = React.createClass({
	displayName: "Nvd3Component",
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


	drawGraph: function() {
		let data = this.state.DataStore.data;

		nv.addGraph(function() {
		let chart = nv.models.discreteBarChart()
				.x(d => d.label)    //Specify the data accessors.
				.y(d => d.value)
				.staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
				.tooltips(true)        //Don't show tooltips
				.showValues(true)       //...instead, show the bar value right on top of each bar.
				.transitionDuration(350)
				;

		d3.select("svg")
			.datum(data)
			.call(chart);

		return chart;
		});
	},

  componentDidMount: function() {
		this.drawGraph();
  },

  componentDidUpdate: function () {
		this.drawGraph();
  },

  toggleData: function () {
//		this.setState({data: data});
  },

  render: function () {
    return (
			<div>
				<h1>Nvd3Index</h1>
				<ButtonToolbar>
				<SplitButton title={"Type"}>
					<MenuItem eventKey='1'>Bar</MenuItem>
					<MenuItem eventKey='2'>Pie</MenuItem>
					<MenuItem eventKey='3'>MultiBar</MenuItem>
					<MenuItem eventKey='4'>Line+Bar</MenuItem>
					<MenuItem eventKey='5'>Other</MenuItem>
				</SplitButton>
				<SplitButton title={"Data"}>
					<MenuItem eventKey='1'>New Data</MenuItem>
					<MenuItem eventKey='2'>Add Entry</MenuItem>
					<MenuItem eventKey='3'>Remove Entry</MenuItem>
					<MenuItem eventKey='4'>Remove Data</MenuItem>
				</SplitButton>
				</ButtonToolbar>
				<div>
					<svg ref="d3Svg" width="600" height="400"></svg>
				</div>
      </div>
    );
  }
});
module.exports = Nvd3Index;
