"use strict";

const Fluxxor = require("fluxxor");
const Const = require("../constants");
const DataActTypes = Const.ActTypes.Data;

// Keeping these variables outside the PageStore makes them private.
// We surely don"t want others use these variables directly -- this
// makes sure we have proper consistency.
let _data;
let _type;
let _charGenerator = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let DataStore = Fluxxor.createStore({
	dataGenerator: function() {
		let data = [];
		for(let i = 0; i < 10; i++){
			data.push({label: _charGenerator.charAt(i), value: Math.floor((Math.random() * 100) + 1)});
		}
		return data;
	},

	initialize: function() {
		_data = [{
			key: "1",
			values: this.dataGenerator()
		}];
		_type = "bar";

    this.bindActions(
      DataActTypes.NEW_DATA, this.onNewData,
      DataActTypes.ADD_ENTRY, this.onAddEntry,
      DataActTypes.REMOVE_ENTRY, this.onRemoveEntry,
      DataActTypes.REMOVE_DATA, this.onRemoveData
      );
	},

	getState: function() {
		return {
			data: _data,
			type: _type
		};
	},

	onNewData: function() {
		_data = [{
			key: "1",
			values: this.dataGenerator()
		}];
    this.emit(Const.CHANGE_EVENT);
	},

	onAddEntry: function() {
		console.log("add entry");
		let values = _data[0].values;
		values.push({label: _charGenerator.charAt(values.length), value: Math.floor((Math.random() * 100) + 1)});
		_data = [{
			key: "1",
			values: values
		}];
    this.emit(Const.CHANGE_EVENT);
	},

	onRemoveEntry: function() {
		console.log("remove entry");
		let values = _data[0].values;
		console.log(values);
		values.pop();
//		values = values.splice(1,-1)
		console.log(values);

		_data = [{
			key: "1",
			values: values
		}];
    this.emit(Const.CHANGE_EVENT);
	},

	onRemoveData: function() {
		console.log("remove data");
		_data = [{
			key: "1",
			values: []
		}];
    this.emit(Const.CHANGE_EVENT);

	}

});
module.exports = DataStore;