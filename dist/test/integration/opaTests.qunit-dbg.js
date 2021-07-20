/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ACRUD/Assignment_CRUD/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});