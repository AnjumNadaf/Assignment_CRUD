sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/ValueState",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function (Controller, ValueState, MessageBox, JSONModel, Fragment) {
	"use strict";

	return Controller.extend("ACRUD.Assignment_CRUD.controller.view2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ACRUD.Assignment_CRUD.view.view2
		 */
		onInit: function () {
			this.getView().byId("employeelist").bindElement("/EMPLOYEESet('Empno')");

			this.oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
		},
		onClickItems: function (oEvent) {
			debugger;
			var listpaths = oEvent.getParameter("listItem").getBindingContextPath();
			this.getView().bindElement(listpaths);

		},

		onNavBack: function () {
			debugger

			this.oRouter.navTo("RouteView1");

		},

		onEdit: function () {
			debugger;

			var empIDU = this.getView().byId("empTextId").getValue();
			if (empIDU === "" || empIDU === undefined) {
				MessageBox.error("Please enter Employee Number");
			} else {
				var That = this;

				var empIDU = this.getView().byId("empTextId").getValue();

				if (empIDU !== "") {
					this.getOwnerComponent().getModel().read("/EMPLOYEESet", {
						success: function (oData, oResponse) {
							var vFlag = false;
							for (var i = 0; i < oData.results.length; i++) {
								if (oData.results[i].Empno === empIDU) {
									vFlag = true;

								}
							}
							if (vFlag) {

								this.getOwnerComponent().getModel().read("/EMPLOYEESet('" + empIDU + "')", {
									success: function (oData1, oResponse1) {
										var oModel_EMPUpdate = new JSONModel();
										oModel_EMPUpdate.setData(oData1);
										That.getView().setModel(oModel_EMPUpdate, "oModel_EMPUpdate");
										That.getView().getModel("oModel_EMPUpdate").refresh();

									}.bind(this),
									error: function (oError) {

									}.bind(this)
								});
								this.getView().byId("empNameLabelU").setVisible(true);

								this.getView().byId("empNameInputU").setVisible(true);

								this.getView().byId("empNoLabelU").setVisible(true);

								this.getView().byId("empNoInputU").setVisible(true);

								this.getView().byId("idUpdate").setEnabled(true);

							} else {
								MessageBox.error("Record with this Employee ID doesn't exists. Please select an existing value");
								this.getView().byId("empNameLabelU").setVisible(false);
								this.getView().byId("empNameInputU").setVisible(false);
								this.getView().byId("empNoLabelU").setVisible(false);
								this.getView().byId("empNoInputU").setVisible(false);

								this.getView().byId("idUpdate").setEnabled(false);
							}
						}.bind(this),
						error: function (oError) {

						}.bind(this)

					});

				}
			}
		},
	

		createDetailsinMaster: function () {
			debugger;
			if (!this.Frgament) {
				var dia = this.createId("X");
				this.Frgament = new sap.ui.xmlfragment(dia, "ACRUD.Assignment_CRUD.Fragments.CreateForm", this);
				this.getView().addDependent(this.Fragment);
			}
			this.Frgament.open();
		},

		onCloses: function () {
			debugger;
			var dia = this.createId("X");
			var empIDC = sap.ui.core.Fragment.byId(dia, "empIDC");
			empIDC.setValue("");
			var empNameC = sap.ui.core.Fragment.byId(dia, "empNameC");
			empNameC.setValue("");

			this.Frgament.close();
		},

		CreateDetails: function () {
			debugger;
			var dia = this.createId("X");
			var empIDC = sap.ui.core.Fragment.byId(dia, "empIDC").getValue();

			var empNameC = sap.ui.core.Fragment.byId(dia, "empNameC").getValue();

			var empNum = sap.ui.core.Fragment.byId(dia, "typeOfd").getSelectedItem();
			var empNumC = sap.ui.core.Fragment.byId(dia, "typeOfd").getSelectedItem().getKey();

			if (empIDC === "" || empIDC === undefined || empNameC === "" || empNameC === undefined || empNumC === "" || empNumC === undefined) {
				MessageBox.error("Please enter mandatory details");
			} else {

				this.getOwnerComponent().getModel().read("/EMPLOYEESet", {
					success: function (oData, oResponse) {
						var vFlag = false;
						var sParam = "";
						for (var i = 0; i < oData.results.length; i++) {
							if (oData.results[i].Empno === empIDC) {
								vFlag = true;
								sParam = "ID";
								break;

							} else if (oData.results[i].Empname === empNameC) {
								vFlag = true;
								sParam = sParam + "Name";
								break;
							}
						}
						if (vFlag) {
							MessageBox.error("Record with the same " + sParam + " already exists. Please select a unique value");
						} else {
							this.commonFunc();
						}
					}.bind(this),
					error: function (oError) {

					}.bind(this)

				});
			}

		},

		updateDetails: function () {
			debugger;

			var empIDU = this.getView().byId("empTextId").getValue();
			var empNameU = this.getView().byId("setTextId").getValue();
			var empNumU = this.getView().byId("setDesintionId").getValue();

			var payLoad = {
				Empno: empIDU,
				Empname: empNameU,
				Empdesig: empNumU

			};

			var input = this.getView().byId("setTextId").setText(empNameU);

			var input2 = this.getView().byId("setDesintionId").setText(empNumU);

			this.getOwnerComponent().getModel().update("/EMPLOYEESet('" + empIDU + "')", payLoad, {
				method: "PUT",

				success: function (odata, Response) {

					if (odata !== "" || odata !== undefined) {
						MessageBox.success("Updated successfully.");
					} else {
						MessageBox.error("Not updated.");
					}

				},
				error: function (cc, vv) {

				}

			});

		},
		deleteDetails: function () {
			debugger;
			// var empIDD = this.getView().byId("empTextId").getValue();
			var empIDD = this.getView().byId("empTextId").getText();

			if (empIDD === "" || empIDD === undefined) {
				MessageBox.error("Please enter Employee ID to delete the record.");
			}

			this.getOwnerComponent().getModel().remove("/EMPLOYEESet('" + empIDD + "')", {
				method: "DELETE",
				success: function (odata, Response) {

					if (odata !== "" || odata !== undefined) {
						MessageBox.success("Deleted successfully.");
					} else {
						MessageBox.error("Not able to delete.");
					}

				},
				error: function (cc, vv) {

				}

			});
		},

		onLiveChangeCreateID: function (oEvt) {
			debugger;
			var regex = /^[0-9]*$/;
			var valID = oEvt.mParameters.value;

			var dia = this.createId("X");
			var empIDC = sap.ui.core.Fragment.byId(dia, "empIDC");

			if (valID === "" || valID === undefined || valID.match(regex) === null) {

				empIDC.setValueState(ValueState.Error);

				empIDC.setValueStateText("Please enter a numeric value. Limited to 3 digits");

				empIDC.setValue("");
			} else {

				empIDC.setValueState(ValueState.None);

			}

		},
		onLiveChangeCreateName: function (oEvt) {
			debugger;
			var regex = /^[A-Za-z]*$/;
			var valName = oEvt.mParameters.value;

			var dia = this.createId("X");
			var empName = sap.ui.core.Fragment.byId(dia, "empNameC");

			if (valName === "" || valName === undefined || valName.match(regex) === null) {

				empName.setValueState(ValueState.Error);

				empName.setValueStateText("Please enter charecters. Limited to 15 characters");
				this.getView().byId("empNameC").setValue("");
				empName.setValue("");
			} else {

				empName.setValueState(ValueState.None);
			}
		},
		onLiveChangeCreateNum: function (oEvt) {
			debugger;
			var regex = /^[a-zA-Z]*$/;
			var valNum = oEvt.mParameters.value;
			var dia = this.createId("X");
			var empDeig = sap.ui.core.Fragment.byId(dia, "empNumC");

			if (valNum === "" || valNum === undefined || valNum.match(regex) === null) {

				empDeig.setValueState(ValueState.Error);

			} else {

				empDeig.setValueState(ValueState.None);
			}
		},
		commonFunc: function () {
			debugger;

			var dia = this.createId("X");
			var empIDC = sap.ui.core.Fragment.byId(dia, "empIDC").getValue();

			var empNameC = sap.ui.core.Fragment.byId(dia, "empNameC").getValue();

			var empNum = sap.ui.core.Fragment.byId(dia, "typeOfd").getSelectedItem();
			var empNumC = sap.ui.core.Fragment.byId(dia, "typeOfd").getSelectedItem().getKey();

			var payLoad = {
				Empno: empIDC,
				Empname: empNameC,
				Empdesig: empNumC

			};
			this.getOwnerComponent().getModel().create("/EMPLOYEESet", payLoad, {
				success: function (odata, Response) {

					if (odata !== "" || odata !== undefined) {
						MessageBox.success("Created successfully.");
					} else {
						MessageBox.error("New entry not created.");
					}
				},
				error: function (cc, vv) {

				}
			});

			this.Frgament.close();
			var empIDC = sap.ui.core.Fragment.byId(dia, "empIDC");
			empIDC.setValue("");
			var empNameC = sap.ui.core.Fragment.byId(dia, "empNameC");
			empNameC.setValue("");

		},

		onNext: function () {
			debugger;

			this.oRouter.navTo("RouteView3");

		},

		open: function (oEvent) {
			debugger;

			this._getDialog().open();

			var emIDC = this.getView().byId("empTextId").getText();

			var updateId = sap.ui.getCore().byId("idFragment--empTextId3");
			updateId.setValue(emIDC);

			var emName = this.getView().byId("setTextId").getText();
			var updateName = sap.ui.getCore().byId("idFragment--setTextId3");
			updateName.setValue(emName);

			var empDesignmation = this.getView().byId("setDesintionId").getText();
			var updateDesignation = sap.ui.getCore().byId("idFragment--setDesintionId3");
			updateDesignation.setValue(empDesignmation);

		},

		_getDialog: function () {
			debugger;
			// create a fragment with dialog, and pass the selected data
			if (!this.dialog) {
				// This fragment can be instantiated from a controller as follows:
				this.dialog = sap.ui.xmlfragment("idFragment", "ACRUD.Assignment_CRUD.Fragments.updateForm", this);

				//debugger;

			}
			//debugger;
			return this.dialog;
		},

		onClosesUpdate: function () {
			debugger;

			this._getDialog().close();

		},
		onSaveUpdate: function () {
			debugger;

			var empIDU = sap.ui.getCore().byId("idFragment--empTextId3").getValue();

			var empNameU = sap.ui.getCore().byId("idFragment--setTextId3").getValue();

			var empNumU = sap.ui.getCore().byId("idFragment--setDesintionId3").getValue();

			var payLoad = {
				Empno: empIDU,
				Empname: empNameU,
				Empdesig: empNumU

			};

			var input = this.getView().byId("setTextId").setText(empNameU);

			var input2 = this.getView().byId("setDesintionId").setText(empNumU);

			if (empIDU === "" || empIDU === undefined || empNameU === "" || empNameU === undefined || empNumU === "" || empNumU ===
				undefined) {
				MessageBox.error("Please enter mandatory details");
			} else {

				this.getOwnerComponent().getModel().update("/EMPLOYEESet('" + empIDU + "')", payLoad, {
					method: "PUT",

					success: function (odata, Response) {

						if (odata !== "" || odata !== undefined) {
							MessageBox.success("Updated successfully.");

						} else {
							MessageBox.error("Not updated.");
						}

					},
					error: function (cc, vv) {

					}

				});

			}

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ACRUD.Assignment_CRUD.view.view2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ACRUD.Assignment_CRUD.view.view2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ACRUD.Assignment_CRUD.view.view2
		 */
		//	onExit: function() {
		//
		//	}

	});

});