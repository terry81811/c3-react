const React = require("react");
const {
	Button, ButtonToolbar,
	MenuItem,
	SplitButton
} = require("react-bootstrap");

const ReactD3 = require("react-d3-components");
const d3 = require("d3");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;


let reactD3ComponentIndex = React.createClass({
	displayName: "reactD3Component",

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

  renderGraph: function () {
  	console.log(this.state);
  	if(this.state.DataStore.data[0].values.length === 0){
  		return <h4>No Data Available!</h4>;
  	}else{
			let tooltip = function(x, y0, y, total) {
				return y.toString();
			};
	  	let BarChart = ReactD3.BarChart;

			let labelAccessor = function(stack) { return stack.key; };
			let valuesAccessor = function(stack) { return stack.values; };
			let xAccessor = function(element) { return element.label; };
			let yAccessor = function(element) { return element.value; };
			let colorScale = d3.scale.category20();
			
  		return (
				<BarChart
				   data={this.state.DataStore.data}
				   width={400}
				   height={400}
				   margin={{top: 10, bottom: 50, left: 50, right: 10}}
				   tooltipHtml={tooltip}
				   label={labelAccessor}
				   x={xAccessor}
				   y={yAccessor}
				   values={valuesAccessor}
				   colorScale={colorScale}
				   />
			);
  	}
  },

  render: function () {
    return (
			<div>
				<h1>reactD3ComponentIndex</h1>
				<ButtonToolbar>
				<SplitButton title={"Type"}>
					<MenuItem eventKey='1'>Bar</MenuItem>
					<MenuItem eventKey='2'>Pie</MenuItem>
					<MenuItem eventKey='3'>MultiBar</MenuItem>
					<MenuItem eventKey='4'>Line+Bar</MenuItem>
					<MenuItem eventKey='5'>Other</MenuItem>
				</SplitButton>
				<SplitButton title={"Data"}>
					<MenuItem eventKey='1' onClick={this.handleNewDataClick}>New Data</MenuItem>
					<MenuItem eventKey='2' onClick={this.handleAddEntryClick}>Add Entry</MenuItem>
					<MenuItem eventKey='3' onClick={this.handleRemoveEntryClick}>Remove Entry</MenuItem>
					<MenuItem eventKey='4' onClick={this.handleRemoveDataClick}>Remove Data</MenuItem>
				</SplitButton>
				</ButtonToolbar>
				<div>
					{this.renderGraph()}
				</div>
      </div>

    );
  }
});
module.exports = reactD3ComponentIndex;



