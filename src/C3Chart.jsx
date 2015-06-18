const React = require("react");
const _ = require("lodash");

const c3 = require("c3");
const d3 = require("d3");

let C3Chart = React.createClass({
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
				height: React.PropTypes.number,
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
			})
		})
  },

//color theme
	colors: function(count) {
		let colors = [];
		let color = d3.scale.category10();
		for(let i = 0; i < count; i++){
			colors.push(color(i));
		}
		return colors;
	},

//apply props.options to graph json
  graphObject: function() {
		let graphObject = {
			data: {},
			axis: {},
			bindto: "#chartContainer",
			color: {
				pattern: this.colors(20)
			}
		};
		let options = this.props.options;
		if(options.padding){
			graphObject.padding = {
				top: options.padding.top,
				left: options.padding.left,
				right: options.padding.right,
				bottom: options.padding.bottom
			};
		}
		if(options.size){
			graphObject.size = {
				width: options.size.width,
				height: options.size.height
			};
		}
		if(options.labels){
			graphObject.data.labels = options.labels;
		}
		if(options.onClick){
			graphObject.data.onclick = options.onClick;
		}
		if(options.axisLabel){
			graphObject.axis.x = {label: options.axisLabel.x};
			graphObject.axis.y = {label: options.axisLabel.y};
		}
		if(options.subchart){
			graphObject.subchart = {show: options.subchart};
		}
		if(options.zoom){
			graphObject.zoom = {enabled: options.zoom};
		}
		if(options.grid){
			graphObject.grid = {
				x:{show: options.grid.x},
				y:{show: options.grid.y}
			};
		}
		return graphObject;
  },

//c3.js
	drawGraph: function() {
		switch(this.props.type){
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

	drawGraphLine: function() {
		console.log("drawing line");
		let graphObject = this.graphObject();
		let graphObjectData = {
			json: this.props.data[0].values,
			keys: { x: "label", value: ["value"] },
      names: { value: this.props.data[0].key }
		};
		let graphObjectAxis = {
			x: { type: "category" } // this needed to load string x value
		};

		graphObject.data = _.merge(graphObjectData, graphObject.data);
		graphObject.axis = _.merge(graphObjectAxis, graphObject.axis);

		let chart = c3.generate(graphObject);
		return chart;
	},

	drawGraphBar: function() {
		console.log("drawing bar");
		let graphObject = this.graphObject();
		let graphObjectData = {
			x: "x",
			json: this.props.data[0].values,
			keys: { x: "label", value: ["value"] },
      names: { value: this.props.data[0].key },
      type: "bar",
      labels: true
		};
		let graphObjectAxis = {
			x: { type: "category" } // this needed to load string x value
		};

		graphObject.data = _.merge(graphObjectData, graphObject.data);
		graphObject.axis = _.merge(graphObjectAxis, graphObject.axis);

		let chart = c3.generate(graphObject);
		return chart;
	},

	pieChartDataPreparator: function(rawData) {
		let data;
		data = _.map(rawData, (d) => {
			return [d.label, d.value];
		});
		return data;
	},

	drawGraphPie: function() {
		console.log("drawing pie");
		let graphObject = this.graphObject();
		let graphObjectData = {
			columns: this.pieChartDataPreparator(this.props.data[0].values),
			type : "pie"
		};

		graphObject.data = _.merge(graphObjectData, graphObject.data);

		let chart = c3.generate(graphObject);
		return chart;
	},

	multiDmsDataPreparator: function(rawData) {
		let xLabels = ["x"];	// to make ['x', 'a', 'b', 'c' ...] for labels
		_.map(rawData[0].values, (d) => {
			xLabels.push(d.label);
		});

		let data;
		data = _.map(rawData, (datum) => {
			let row = [datum.key];	// to make ['key', 30, 200, 100, 400 ...] for each row
			_.map(datum.values, (d) => {
				row.push(d.value);
			});
			return row;
		});
		data.push(xLabels);
		return data;
	},

	drawGraphMultiBar: function() {
		console.log("drawing multiBar");
		let graphObject = this.graphObject();
		let graphObjectData = {
			x: "x",
			columns: this.multiDmsDataPreparator(this.props.data),
			type: "bar",
      labels: true,
		};
		let graphObjectAxis = {
			x: { type: "category" } // this needed to load string x value
		};

		graphObject.data = _.merge(graphObjectData, graphObject.data);
		graphObject.axis = _.merge(graphObjectAxis, graphObject.axis);

		let chart = c3.generate(graphObject);
		return chart;
	},

	drawGraphlLineBar: function() {
		console.log("drawing LineBar");
		let graphObject = this.graphObject();
		let graphObjectData = {
			x: "x",
			columns: this.multiDmsDataPreparator(this.props.data),
			types: {dataSource1: "bar"},
		};
		let graphObjectAxis = {
			x: { type: "category" } // this needed to load string x value
		};

		graphObject.data = _.merge(graphObjectData, graphObject.data);
		graphObject.axis = _.merge(graphObjectAxis, graphObject.axis);

		let chart = c3.generate(graphObject);
		return chart;
	},

  componentDidMount: function() {
		this.drawGraph();
  },

  componentDidUpdate: function () {
		this.drawGraph();
  },

  render: function() {
		return (
			<div>
				<div id="chartContainer"></div>
			</div>);
  }
});

module.exports = C3Chart;
