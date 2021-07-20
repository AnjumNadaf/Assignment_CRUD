sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("ACRUD.Assignment_CRUD.controller.View1", {
		onInit: function () {
			this.oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
		},
		onPress: function () {
			debugger;
			var name = this.getView().byId("idUsername").getValue();
			var pass = this.getView().byId("idPassword").getValue();

			if (name === "" && pass === "") {

				this.getView().byId("idUsername").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("idUsername").setValueStateText("Please Enter Name");
				this.getView().byId("idPassword").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("idPassword").setValueStateText("please Enter Password");
			} else if (name === "") {
				this.getView().byId("idUsername").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("idUsername").setValueStateText("Please Enter Name");
			} else if (pass === "") {
				this.getView().byId("idPassword").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("idPassword").setValueStateText("please Enter Password");
			} else {

				if (name === "admin" && pass === "admin") {
					this.oRouter.navTo("RouteView2");
				}
				this.getView().byId("idUsername").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("idPassword").setValueState(sap.ui.core.ValueState.None);
			}

		}
	});
});