sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ACRUD.Assignment_CRUD.controller.View3", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ACRUD.Assignment_CRUD.view.View3
		 */
		onInit: function () {
            this.oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
            this.getView().bindElement("/EMPLOYEESet('Empno')");
		},
		OnLogout:function(){
			debugger;
			this.oRouter.navTo("RouteView1");
			
		},
		onNavBack2:function(){
			debugger;
			this.oRouter.navTo("RouteView2");
		},
		

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ACRUD.Assignment_CRUD.view.View3
		 */
			onBeforeRendering: function() {
				debugger;
		      this.getView().byId("smartTable_ResponsiveTable").bindElement("/EMPLOYEESet('Empno')");
			}

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ACRUD.Assignment_CRUD.view.View3
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ACRUD.Assignment_CRUD.view.View3
		 */
		//	onExit: function() {
		//
		//	}

	});

});