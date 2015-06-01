const React = require("react");
const { Table, ButtonGroup, Button } = require("react-bootstrap");

const d3 = require("d3");
const nvd3 = require("nvd3");

let Nvd3Index = React.createClass({
	displayName: "AppComponent",

  getInitialState: function() {
    return {
			data:[
				{
						key: "Cumulative Return",
						values: [
							{
								"label" : "A Label",
								"value" : -29.765957771107
							},
							{
								"label" : "B Label",
								"value" : 0
							},
							{
								"label" : "C Label",
								"value" : 32.807804682612
							},
							{
								"label" : "D Label",
								"value" : 196.45946739256
							},
							{
								"label" : "E Label",
								"value" : 0.19434030906893
							},
							{
								"label" : "F Label",
								"value" : -98.079782601442
							},
							{
								"label" : "G Label",
								"value" : -13.925743130903
							},
							{
								"label" : "H Label",
								"value" : -5.1387322875705
							}
						]
					}
				]
    };
  },


	drawGraph: function() {
		let data = this.state.data;
//		console.log(data);
		console.log(this.state);

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

		nv.utils.windowResize(chart.update);
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
		let data = [
				{
						key: "Cumulative Return",
						values: [
							{
								"label" : "A Label",
								"value" : -12.765957771107
							},
							{
								"label" : "B Label",
								"value" : 0
							},
							{
								"label" : "C Label",
								"value" : 32.807804682612
							},
							{
								"label" : "D Label",
								"value" : 196.45946739256
							},
							{
								"label" : "E Label",
								"value" : 0.19434030906893
							},
							{
								"label" : "F Label",
								"value" : -98.079782601442
							},
							{
								"label" : "G Label",
								"value" : -13.925743130903
							}
						]
					}
				];
		this.setState({data: data});
  },

  render: function () {
		console.log(this.state);
    return (
			<div>
				<h1>Nvd3Index</h1>
					<Button onClick={this.toggleData} >change</Button>
				<div>
					<svg ref="d3Svg" width="600" height="400"></svg>;
				</div>
      </div>
    );
  }
});
module.exports = Nvd3Index;
