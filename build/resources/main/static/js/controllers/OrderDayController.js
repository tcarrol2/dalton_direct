app.controller('OrderDayController', [ '$scope', '$http', '$interval', '$q', '$rootScope', '$timeout', '$log', 'modal', function($scope, $http, $interval, $q, $rootScope, $timeout, $log, modal) {

	var myModal = new modal();

	$scope.hideGrid = true;

	var fakeI18n = function(title) {
		var deferred = $q.defer();
		$interval(function() {
			deferred.resolve('col: ' + title);
		}, 1000, 1);
		return deferred.promise;
	};

	$scope.gridOrderDayGroups = {
		headerTemplate : 'html/PlanLoadGroupsGridHeader.html',
		enableFiltering : true,
		rowHeight : 30,
		enableColumnResize : true,
		exporterMenuCsv : true,
		enableGridMenu : true,
		gridMenuTitleFilter : fakeI18n,
		columnDefs : [ {
			displayName : "Work Order ID",
			field : "workOrderId",
			width : "14%",
			filter : {
				placeholder : 'Search By Work Order ID'
			},
		}, {
			displayName : "Job Date",
			field : "jobDate",
			width : "14%",
			filter : {
				placeholder : 'Search By Job Date'
			},
		}, {
			displayName : "First Name",
			field : "firstName",
			width : "12%",
			filter : {
				placeholder : 'Search By First Name'
			},
		}, {
			displayName : "Last Name",
			field : "lastName",
			width : "12%",
			filter : {
				placeholder : 'Search By Last Name'
			},
		}, {
			displayName : "Create Time",
			field : "createTimeStamp",
			width : "12%",
			filter : {
				placeholder : 'Search By Create Time'
			},
		} ],
		onRegisterApi : function(gridApi) {
			$scope.gridApi = gridApi;
			$scope.gridApi.core.handleWindowResize();
			// interval of zero just to ow the
			// directive to have initialized
			$interval(function() {
				$scope.gridApi.core.handleWindowResize();
				gridApi.core.addToGridMenu(gridApi.grid, [ {
					title : 'Dynamic item',
					order : 100
				} ]);
			}, 0, 1);

			gridApi.core.on.columnVisibilityChanged($scope, function(changedColumn) {
				$scope.columnChanged = {
					name : changedColumn.colDef.name,
					visible : changedColumn.colDef.visible
				};
			});
		}
	};

	$scope.viewGridOrderDayGroups = function() {
		if ($scope.gridOrderDayGroups.data.length === 0) {
			$http.get('/TLR_UI/rs/AppServices/GetLoadGroups').success(function(data) {
				$scope.gridOrderDayGroups.data = data;
			}).error(function(data) {
				alert("There has been an error fetching data: " + data);
			});
		}
	};

	$scope.gridStats = {
		headerTemplate : 'html/SmoothingStatsGridHeader.html',
		enableFiltering : true,
		rowHeight : 30,
		enableColumnResize : true,
		exporterMenuCsv : true,
		enableGridMenu : true,
		gridMenuTitleFilter : fakeI18n,
		columnDefs : [ {
			displayName : "Order Group ID",
			field : "orderGroupId",
			width : "16%",
			filter : {
				placeholder : 'Search By Order Group ID'
			},
		}, {
			displayName : "Effective Date",
			field : "effectiveDate",
			width : "12%",
			filter : {
				placeholder : 'Search By Effective Date'
			},
		}, {
			displayName : "Create User",
			field : "createUserId",
			width : "12%",
			filter : {
				placeholder : 'Search By Create User'
			},
		}, {
			displayName : "Create Time",
			field : "createTimeStamp",
			width : "12%",
			filter : {
				placeholder : 'Search By Create Time'
			},
		}, {
			displayName : "Last Update User",
			field : "lastUpdatedSysUserId",
			width : "12%",
			filter : {
				placeholder : 'Search By Last Update User'
			},
		}, {
			displayName : "Last Update Time",
			field : "last_updatedTimeStamp",
			width : "12%",
			filter : {
				placeholder : 'Search By Last Update Time'
			},
		}, {
			displayName : "Maximum Number of Trucks",
			field : "dailyTruckOrderMaxQty",
			width : "12%",
			filter : {
				placeholder : 'Search By Maximum Number of Trucks'
			},
		}, {
			displayName : "Tender Load Flag",
			field : "tenderLoadFlag",
			width : "12%",
			filter : {
				placeholder : 'Search By Tender Load Flag'
			},
		} ],
		onRegisterApi : function(gridApi) {
			$scope.gridApi = gridApi;

			// interval of zero just to ow the
			// directive to have initialized
			$interval(function() {
				$scope.gridApi.core.handleWindowResize();
				gridApi.core.addToGridMenu(gridApi.grid, [ {
					title : 'Dynamic item',
					order : 100
				} ]);
			}, 0, 1);

			gridApi.core.on.columnVisibilityChanged($scope, function(changedColumn) {
				$scope.columnChanged = {
					name : changedColumn.colDef.name,
					visible : changedColumn.colDef.visible
				};
			});
		}
	};

	$scope.viewGridStats = function(orderGroupId) {
		$http.get('/TLR_UI/rs/AppServices/GetStatsData?OrderGroupNbr=' + orderGroupId).success(function(data) {
			$scope.gridStats.data = data.data;
		}).error(function(data) {
			alert("There has been an error fetching data: " + data);
		});
	};

	$scope.gridOrderDayLoads = {
		headerTemplate : 'html/PlanLoadsGridHeader.html',
		enableFiltering : true,
		rowHeight : 35,
		enableColumnResize : true,
		exporterMenuCsv : true,
		enableGridMenu : true,
		gridMenuTitleFilter : fakeI18n,
		columnDefs : [ {
			displayName : "View SKUs",
			field : "planLoadId",
			width : "10%",
			cellTemplate : 'html/PlanLoadSKUsButton.html',
			filter : {
				placeholder : 'Search By Load ID'
			},
		}, {
			displayName : "Create User",
			field : "createUserId",
			width : "10%",
			filter : {
				placeholder : 'Search By Create User'
			},
		}, {
			displayName : "Create Time",
			field : "createTimeStamp",
			width : "10%",
			filter : {
				placeholder : 'Search By Create Time'
			},
		}, {
			displayName : "Last Update User",
			field : "lastUpdatedSysUserId",
			width : "10%",
			filter : {
				placeholder : 'Search By Last Update User'
			},
		}, {
			displayName : "Last Update Time",
			field : "last_updatedTimeStamp",
			width : "10%",
			filter : {
				placeholder : 'Search By Last Update Time'
			},
		}, {
			displayName : "Load Volume",
			field : "loadVolume",
			width : "10%",
			filter : {
				placeholder : 'Search By Load Volume'
			},
		}, {
			displayName : "Load Weight",
			field : "loadWeight",
			width : "10%",
			filter : {
				placeholder : 'Search By Load Weight'
			},
		}, {
			displayName : "Full Load Flag",
			field : "fullLoadFlag",
			width : "10%",
			filter : {
				placeholder : 'Search By Full Load Flag'
			},
		}, {
			displayName : "Reason Code",
			field : "planLoadReasonCode",
			width : "10%",
			filter : {
				placeholder : 'Search By Reason Code'
			},
		}, {
			displayName : "Tender Load Flag",
			field : "tenderLoadFlag",
			width : "10%",
			filter : {
				placeholder : 'Search By Tender Load Flag'
			},
		} ],
		onRegisterApi : function(gridApi) {
			$scope.gridApi = gridApi;

			// interval of zero just to ow the
			// directive to have initialized
			$interval(function() {
				$scope.gridApi.core.handleWindowResize();
				gridApi.core.addToGridMenu(gridApi.grid, [ {
					title : 'Dynamic item',
					order : 100
				} ]);
			}, 0, 1);

			gridApi.core.on.columnVisibilityChanged($scope, function(changedColumn) {
				$scope.columnChanged = {
					name : changedColumn.colDef.name,
					visible : changedColumn.colDef.visible
				};
			});
		}
	};

	$scope.viewOrderDayLoads = function(orderGroupId) {
		$http.get('/TLR_UI/rs/AppServices/GetPlannedLoadData?OrderGroupNbr=' + orderGroupId).success(function(data) {
			$scope.gridOrderDayLoads.data = data.data;
		}).error(function(data) {
			alert("There has been an error fetching data: " + data);
		});
	};

	$rootScope.gridOrderDaySKUs = {
		headerTemplate : 'html/PlanLoadSkusGridHeader.html',
		enableFiltering : true,
		rowHeight : 30,
		enableColumnResize : true,
		exporterMenuCsv : true,
		enableGridMenu : true,
		gridMenuTitleFilter : fakeI18n,
		columnDefs : [ {
			displayName : "Load ID",
			field : "loadId",
			width : "10%",
			filter : {
				placeholder : 'Search By Load ID'
			},
		}, {
			displayName : "SKU #",
			field : "skuNumber",
			width : "10%",
			filter : {
				placeholder : 'Search By SKU #'
			},
		}, {
			displayName : "Mer Base",
			field : "merBaseCode",
			width : "10%",
			filter : {
				placeholder : 'Search By Mer Base Code'
			},
		}, {
			displayName : "Vendor #",
			field : "mvendorNumber",
			width : "10%",
			filter : {
				placeholder : 'Search By Vendor #'
			},
		}, {
			displayName : "Dept #",
			field : "depatmentNumber",
			width : "10%",
			filter : {
				placeholder : 'Search By Department #'
			},
		}, {
			displayName : "Total Load Quantity",
			field : "totalLoadQty",
			width : "10%",
		}, {
			displayName : "MOQ",
			field : "moq",
			width : "10%",
		}, {
			displayName : "SOQ",
			field : "soq",
			width : "10%",
		}, {
			displayName : "HOST",
			field : "hostQty",
			width : "10%",
		}, {
			displayName : "SER",
			field : "ser",
			width : "10%",
		} ],
		onRegisterApi : function(gridApi) {
			$scope.gridApi = gridApi;

			// interval of zero just to ow the
			// directive to have initialized
			$interval(function() {
				$scope.gridApi.core.handleWindowResize();
				gridApi.core.addToGridMenu(gridApi.grid, [ {
					title : 'Dynamic item',
					order : 100
				} ]);
			}, 0, 1);

			gridApi.core.on.columnVisibilityChanged($scope, function(changedColumn) {
				$scope.columnChanged = {
					name : changedColumn.colDef.name,
					visible : changedColumn.colDef.visible
				};
			});
		}
	};

	$scope.viewGridOrderDaySKUs = function(loadId) {
		$http.get('/TLR_UI/rs/AppServices/GetPlannedLoadSkuData?loadId=' + loadId).success(function(data) {
			$rootScope.gridOrderDaySKUs.data = data.data;
			var height = $scope.getGridOrderDaySKUsHeight();
			var dialogBackGroundHeight = height.height + 168;
			dialogBackGroundHeight += "px";
			var tableHeight = height.height + "px";
			myModal.openOrderDaySKUsModal(tableHeight, dialogBackGroundHeight);
		}).error(function(data) {
			alert("There has been an error fetching data: " + data);
		});
	};

	$scope.mainGridOrderDaySKUs = {
		headerTemplate : 'html/PlanLoadSkusGridHeader.html',
		enableFiltering : true,
		rowHeight : 30,
		enableColumnResize : true,
		exporterMenuCsv : true,
		enableGridMenu : true,
		gridMenuTitleFilter : fakeI18n,
		columnDefs : [ {
			displayName : "Load ID",
			field : "loadId",
			width : "10%",
			filter : {
				placeholder : 'Search By Load ID'
			},
		}, {
			displayName : "SKU #",
			field : "skuNumber",
			width : "10%",
			filter : {
				placeholder : 'Search By SKU #'
			},
		}, {
			displayName : "Mer Base",
			field : "merBaseCode",
			width : "10%",
			filter : {
				placeholder : 'Search By Mer Base Code'
			},
		}, {
			displayName : "Vendor #",
			field : "mvendorNumber",
			width : "10%",
			filter : {
				placeholder : 'Search By Vendor #'
			},
		}, {
			displayName : "Dept #",
			field : "depatmentNumber",
			width : "10%",
			filter : {
				placeholder : 'Search By Department #'
			},
		}, {
			displayName : "Total Load Quantity",
			field : "totalLoadQty",
			width : "10%",
		}, {
			displayName : "MOQ",
			field : "moq",
			width : "10%",
		}, {
			displayName : "SOQ",
			field : "soq",
			width : "10%",
		}, {
			displayName : "HOST",
			field : "hostQty",
			width : "10%",
		}, {
			displayName : "SER",
			field : "ser",
			width : "10%",
		} ],
		onRegisterApi : function(gridApi) {
			$scope.gridApi = gridApi;

			// interval of zero just to ow the
			// directive to have initialized
			$interval(function() {
				$scope.gridApi.core.handleWindowResize();
				gridApi.core.addToGridMenu(gridApi.grid, [ {
					title : 'Dynamic item',
					order : 100
				} ]);
			}, 0, 1);

			gridApi.core.on.columnVisibilityChanged($scope, function(changedColumn) {
				$scope.columnChanged = {
					name : changedColumn.colDef.name,
					visible : changedColumn.colDef.visible
				};
			});
		}
	};

	$scope.viewMainGridOrderDaySKUs = function(orderGroupID) {
		$http.get('/TLR_UI/rs/AppServices/GetOrderDaySKUsByOrderGroupID?orderGroupID=' + orderGroupID).success(function(data) {
			$scope.mainGridOrderDaySKUs.data = data.data;
		}).error(function(data) {
			alert("There has been an error fetching data: " + data);
		});
	};

	$scope.getGridOrderDayLoadsHeight = function() {
		var rowHeight = 35; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($scope.gridOrderDayLoads.data.length * rowHeight + headerHeight);

		if (tableHeight > 550) {
			tableHeight = 550;
		}
		return {
			height : tableHeight + "px"
		};
	};

	$scope.getGridOrderDayGroupsHeight = function() {
		var rowHeight = 30; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($scope.gridOrderDayGroups.data.length * rowHeight + headerHeight);

		if (tableHeight > 550) {
			tableHeight = 550;
		}
		return {
			height : tableHeight + "px"
		};
	};

	$scope.getGridStatsHeight = function() {
		var rowHeight = 30; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($scope.gridStats.data.length * rowHeight + headerHeight);

		if (tableHeight > 550) {
			tableHeight = 550;
		}
		return {
			height : tableHeight + "px"
		};
	};

	$scope.getMainGridOrderDaySKUsUHeight = function() {
		var rowHeight = 30; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($scope.mainGridOrderDaySKUs.data.length * rowHeight + headerHeight);

		if (tableHeight > 550) {
			tableHeight = 550;
		}
		return {
			height : tableHeight + "px"
		};
	};

	$scope.getGridOrderDaySKUsHeight = function() {
		var rowHeight = 30; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($rootScope.gridOrderDaySKUs.data.length * rowHeight + headerHeight);

		if (tableHeight > 407) {
			tableHeight = 407;
		}
		return {
			height : tableHeight
		};
	};

} ]);

app.factory('modal', [ '$compile', '$rootScope', function($compile, $rootScope) {
	return function() {
		var elm;
		var modal = {
			openOrderDaySKUsModal : function(tableHeight, dialogBackGroundHeight) {
				var html = '<div class="dialogBackGround ng-modal-overlay" ng-drag="true" style="height:' + dialogBackGroundHeight + '">' + '<button id="buttonClose" class="btn btn-danger dialog-button" ng-click="close()">Close Dialog</button>' + '<div id="gridOrderDaySKUs" ui-grid="gridOrderDaySKUs" style="height:' + tableHeight + '" ui-if="gridOrderDaySKUs.data.length>0" class="gridOrderDaySKUs" ui-grid-auto-resize ui-grid-resize-columns ui-grid-move-columns ui-grid-exporter ng-cancel-drag ng-cloak>' + '</div>' + '</div>';
				elm = angular.element(html);
				angular.element(document.body).prepend(elm);

				$rootScope.close = function() {
					modal.close();
				};

				$compile(elm)($rootScope);
			},
			openPrePlanSKUsModal : function(tableHeight, dialogBackGroundHeight) {
				var html = '<div class="dialogBackGround ng-modal-overlay" ng-drag="true" style="height:' + dialogBackGroundHeight + '">' + '<button id="buttonClose" class="btn btn-danger dialog-button" ng-click="close()">Close Dialog</button>' + '<di id="gridPrePlanSKUs" ui-grid="gridPrePlanSKUs"  style="height:' + tableHeight + '" ui-if="gridPrePlanSKUs.data.length>0" class="gridPrePlanSKUs" ui-grid-auto-resize ui-grid-resize-columns ui-grid-move-columns ui-grid-exporter ng-cancel-drag ng-cloak>' + '</div>' + '</div>';
				elm = angular.element(html);
				angular.element(document.body).prepend(elm);

				$rootScope.close = function() {
					modal.close();
				};

				$compile(elm)($rootScope);
			},
			close : function() {
				if (elm) {
					elm.remove();
				}
			}
		};

		return modal;
	};
} ]);
