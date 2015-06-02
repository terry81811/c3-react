"use strict";

const Fluxxor = require("fluxxor");

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
	},

	getState: function() {
		return {
			data: _data,
			type: _type
		};
	},

});
module.exports = DataStore;