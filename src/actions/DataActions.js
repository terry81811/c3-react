"use strict";

const Const = require("../constants");
const DataActTypes = Const.ActTypes.Data;

const DataActions = exports;

DataActions.newData = function () {
	this.dispatch(
		DataActTypes.NEW_DATA, {}
	);
};

DataActions.addEntry = function () {
	this.dispatch(
		DataActTypes.ADD_ENTRY, {}
	);
};

DataActions.removeEntry = function () {
	this.dispatch(
		DataActTypes.REMOVE_ENTRY, {}
	);
};

DataActions.removeData = function () {
	this.dispatch(
		DataActTypes.REMOVE_DATA, {}
	);
};