"use strict";

var React = require("react");
var _ = require("lodash");

var c3 = require("c3");
var d3 = require("d3");

var C3Chart = React.createClass({
	displayName: "C3Chart",
	propTypes: {
		type: React.PropTypes.string.isRequired,
		data: React.PropTypes.array.isRequired,
		options: React.PropTypes.shape({
			padding: React.PropTypes.shape({
				top: React.PropTypes.number,
				bottom: React.PropTypes.number,
				left: React.PropTypes.number,
				right: React.PropTypes.number
			}),
			size: React.PropTypes.shape({
				width: React.PropTypes.number,
				height: React.PropTypes.number
			}),
			labels: React.PropTypes.bool,
			onclick: React.PropTypes.func,
			axisLabel: React.PropTypes.shape({
				x: React.PropTypes.string,
				y: React.PropTypes.string
			}),
			subchart: React.PropTypes.bool,
			zoom: React.PropTypes.bool,
			grid: React.PropTypes.shape({
				x: React.PropTypes.bool,
				y: React.PropTypes.bool
			}),
			legend: React.PropTypes.bool
		})
	},

	//color theme
	colors: function colors(count) {
		var colors = [];
		var color = d3.scale.category10();
		for (var i = 0; i < count; i++) {
			colors.push(color(i));
		}
		return colors;
	},

	//apply props.options to graph json
	graphObject: function graphObject() {
		var graphObject = {
			data: {},
			axis: { x: null, y: null },
			bindto: React.findDOMNode(this.refs.myTextInput),
			color: {
				pattern: this.colors(20)
			}
		};
		var options = this.props.options;
		if (options.padding) {
			graphObject.padding = {
				top: options.padding.top,
				left: options.padding.left,
				right: options.padding.right,
				bottom: options.padding.bottom
			};
		}
		if (options.size) {
			graphObject.size = {
				width: options.size.width,
				height: options.size.height
			};
		}
		if (options.labels === false) {
			graphObject.data.labels = options.labels;
		}
		if (options.onClick) {
			graphObject.data.onclick = options.onClick;
		}
		if (options.axisLabel) {
			graphObject.axis.x = { label: options.axisLabel.x };
			graphObject.axis.y = { label: options.axisLabel.y };
		}
		if (options.subchart) {
			graphObject.subchart = { show: options.subchart };
		}
		if (options.zoom) {
			graphObject.zoom = { enabled: options.zoom };
		}
		if (options.grid) {
			graphObject.grid = {
				x: { show: options.grid.x },
				y: { show: options.grid.y }
			};
		}
		if (options.legend === false) {
			graphObject.legend = { show: options.legend };
		}
		if (options.tick) {
			graphObject.axis.x.tick = options.tick.x;
			graphObject.axis.y.tick = options.tick.y;
		}
		return graphObject;
	},

	//c3.js
	drawGraph: function drawGraph() {
		switch (this.props.type) {
			case "line":
				this.drawGraphLine();
				break;
			case "bar":
				this.drawGraphBar();
				break;
			case "pie":
				this.drawGraphPie();
				break;
			case "multiBar":
				this.drawGraphMultiBar();
				break;
			case "lineBar":
				this.drawGraphlLineBar();
				break;
		}
	},

	drawGraphLine: function drawGraphLine() {
		var graphObject = this.graphObject();
		var graphObjectData = {
			json: this.props.data[0].values,
			keys: { x: "label", value: ["value"] },
			names: { value: this.props.data[0].key }
		};
		var graphObjectAxis = {
			x: { type: "category" } // this needed to load string x value
		};

		graphObject.data = _.merge(graphObjectData, graphObject.data);
		graphObject.axis = _.merge(graphObjectAxis, graphObject.axis);

		var chart = c3.generate(graphObject);
		return chart;
	},

	drawGraphBar: function drawGraphBar() {
		var graphObject = this.graphObject();
		var graphObjectData = {
			x: "x",
			json: this.props.data[0].values,
			keys: { x: "label", value: ["value"] },
			names: { value: this.props.data[0].key },
			type: "bar",
			labels: true
		};
		var graphObjectAxis = {
			x: { type: "category" } // this needed to load string x value
		};

		graphObject.data = _.merge(graphObjectData, graphObject.data);
		graphObject.axis = _.merge(graphObjectAxis, graphObject.axis);

		var chart = c3.generate(graphObject);
		return chart;
	},

	pieChartDataPreparator: function pieChartDataPreparator(rawData) {
		var data = undefined;
		data = _.map(rawData, function (d) {
			return [d.label, d.value];
		});
		return data;
	},

	drawGraphPie: function drawGraphPie() {
		var graphObject = this.graphObject();
		var graphObjectData = {
			columns: this.pieChartDataPreparator(this.props.data[0].values),
			type: "pie"
		};

		graphObject.data = _.merge(graphObjectData, graphObject.data);

		var chart = c3.generate(graphObject);
		return chart;
	},

	multiDmsDataPreparator: function multiDmsDataPreparator(rawData) {
		var xLabels = ["x"]; // to make ['x', 'a', 'b', 'c' ...] for labels
		_.map(rawData[0].values, function (d) {
			xLabels.push(d.label);
		});

		var data = undefined;
		data = _.map(rawData, function (datum) {
			var row = [datum.key]; // to make ['key', 30, 200, 100, 400 ...] for each row
			_.map(datum.values, function (d) {
				row.push(d.value);
			});
			return row;
		});
		data.push(xLabels);
		return data;
	},

	drawGraphMultiBar: function drawGraphMultiBar() {
		var graphObject = this.graphObject();
		var graphObjectData = {
			x: "x",
			columns: this.multiDmsDataPreparator(this.props.data),
			type: "bar",
			labels: true
		};
		var graphObjectAxis = {
			x: { type: "category" } // this needed to load string x value
		};

		graphObject.data = _.merge(graphObjectData, graphObject.data);
		graphObject.axis = _.merge(graphObjectAxis, graphObject.axis);

		var chart = c3.generate(graphObject);
		return chart;
	},

	drawGraphlLineBar: function drawGraphlLineBar() {
		var graphObject = this.graphObject();
		var graphObjectData = {
			x: "x",
			columns: this.multiDmsDataPreparator(this.props.data),
			types: { dataSource1: "bar" }
		};
		var graphObjectAxis = {
			x: { type: "category" } // this needed to load string x value
		};

		graphObject.data = _.merge(graphObjectData, graphObject.data);
		graphObject.axis = _.merge(graphObjectAxis, graphObject.axis);

		var chart = c3.generate(graphObject);
		return chart;
	},

	componentDidMount: function componentDidMount() {
		this.drawGraph();
	},

	componentDidUpdate: function componentDidUpdate() {
		this.drawGraph();
	},

	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement("div", { id: "chartContainer", ref: "myTextInput" })
		);
	}
});

module.exports = C3Chart;
