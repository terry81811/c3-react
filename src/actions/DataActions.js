"use strict";

const Const = require("../constants");
const DataActTypes = Const.ActTypes.Data;

const DataActions = exports;

DataActions.newData = function () {
	this.dispatch(
		DataActTypes.NEW_DATA, {}
	);
};