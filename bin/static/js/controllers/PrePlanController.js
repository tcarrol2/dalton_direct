app.controller('PrePlanController', [ '$scope', '$http', '$interval', '$q', '$rootScope', '$timeout', '$log', 'modal', function($scope, $http, $interval, $q, $rootScope, $timeout, $log, modal) {

	var myModal = new modal();

	$scope.hideGrid = true;

	var fakeI18n = function(title) {
		var deferred = $q.defer();
		$interval(function() {
			deferred.resolve('col: ' + title);
		}, 1000, 1);
		return deferred.promise;
	};

	$scope.gridPrePlanOrderGroups = {
		headerTemplate : 'html/PrePlanLoadGroupsGridHeader.html',
		rowHeight : 30,
		enableFiltering : true,
		enableColumnResize : true,
		exporterMenuCsv : true,
		enableGridMenu : true,
		gridMenuTitleFilter : fakeI18n,
		columnDefs : [ {
			displayName : "Order Group ID",
			field : "orderGroupId",
			width : "14%",
			filter : {
				placeholder : 'Search By Order Group ID'
			},
		}, {
			displayName : "Load Group ID",
			field : "loadGroupId",
			width : "14%",
			filter : {
				placeholder : 'Search By Load Group ID'
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
			displayName : "Load Count",
			field : "totalLoadCount",
			width : "12%",
			filter : {
				placeholder : 'Load Count'
			},
		}, {
			displayName : "Load Group Version",
			field : "loadGroupVersion",
			width : "12%",
			filter : {
				placeholder : 'Search By Load Group Version'
			},
		}, {
			displayName : "Eligibility Flag",
			field : "orderEligFlag",
			width : "12%",
			filter : {
				placeholder : 'Search By Eligibility Flag'
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

	$scope.viewGridPrePlanOrderGroups = function() {
		if ($scope.gridPrePlanOrderGroups.data.length === 0) {
			$http.get('/TLR_UI/rs/AppServices/GetPrePlanLoadGroups').success(function(data) {
				$scope.gridPrePlanOrderGroups.data = data.data;
			}).error(function(data) {
				alert("There has been an error fetching data: " + data);
			});
		}
	};

	$scope.gridPrePlanStats = {
		headerTemplate : 'html/SmoothingStatsGridHeader.html',
		rowHeight : 30,
		enableFiltering : true,
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

	$scope.viewPrePlanStats = function(orderGroupId) {
		$http.get('/TLR_UI/rs/AppServices/GetStatsData?OrderGroupNbr=' + orderGroupId).success(function(data) {
			$scope.gridPrePlanStats.data = data.data;
		}).error(function(data) {
			alert("There has been an error fetching data: " + data);
		});
	};

	$scope.gridPrePlanLoads = {
		headerTemplate : 'html/PrePlanLoadsGridHeader.html',
		rowHeight : 35,
		enableFiltering : true,
		enableColumnResize : true,
		exporterMenuCsv : true,
		enableGridMenu : true,
		gridMenuTitleFilter : fakeI18n,
		columnDefs : [ {
			displayName : "View SKUs",
			field : "planLoadId",
			width : "10%",
			cellTemplate : 'html/PrePlanLoadSKUsButton.html',
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

	$scope.viewPrePlanLoads = function(orderGroupId) {
		$http.get('/TLR_UI/rs/AppServices/GetPrePlannedLoadData?OrderGroupNbr=' + orderGroupId).success(function(data) {
			$scope.gridPrePlanLoads.data = data.data;
		}).error(function(data) {
			alert("There has been an error fetching data: " + data);
		});
	};

	$rootScope.gridPrePlanSKUs = {
		headerTemplate : 'html/PrePlanLoadSkusGridHeader.html',
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
				placeholder : 'Search By Mer Base'
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

	$scope.viewGridPrePlanSKUs = function(loadId) {
		$http.get('/TLR_UI/rs/AppServices/GetPrePlanLoadSkuData?loadId=' + loadId).success(function(data) {
			$rootScope.gridPrePlanSKUs.data = data.data;
			var height = $scope.getGridPrePlanSKUsHeight();
			var dialogBackGroundHeight = height.height + 168;
			dialogBackGroundHeight += "px";
			var tableHeight = height.height + "px";
			myModal.openPrePlanSKUsModal(tableHeight, dialogBackGroundHeight);
		}).error(function(data) {
			alert("There has been an error fetching data: " + data);
		});
	};

	$scope.mainGridPrePlanSKUs = {
		headerTemplate : 'html/PrePlanLoadSkusGridHeader.html',
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
				placeholder : 'Search By Mer Base'
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

	$scope.viewMainPrePlanSKUs = function(orderGroupID) {
		$http.get('/TLR_UI/rs/AppServices/GetPrePlanSKUsByOrderGroupID?orderGroupID=' + orderGroupID).success(function(data) {
			$scope.mainGridPrePlanSKUs.data = data.data;
		}).error(function(data) {
			alert("There has been an error fetching data: " + data);
		});
	};

	$scope.getGridPrePlanOrderGroupsHeight = function() {
		var rowHeight = 30; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($scope.gridPrePlanOrderGroups.data.length * rowHeight + headerHeight);

		if (tableHeight > 550) {
			tableHeight = 550;
		}
		return {
			height : tableHeight + "px"
		};
	};

	$scope.getGridPrePlanStatsHeight = function() {
		var rowHeight = 30; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($scope.gridPrePlanStats.data.length * rowHeight + headerHeight);

		if (tableHeight > 550) {
			tableHeight = 550;
		}
		return {
			height : tableHeight + "px"
		};
	};

	$scope.getGridPrePlanLoadsHeight = function() {
		var rowHeight = 35; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($scope.gridPrePlanLoads.data.length * rowHeight + headerHeight);

		if (tableHeight > 550) {
			tableHeight = 550;
		}
		return {
			height : tableHeight + "px"
		};
	};

	$scope.getMainGridPrePlanSKUsHeight = function() {
		var rowHeight = 30; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($scope.mainGridPrePlanSKUs.data.length * rowHeight + headerHeight);

		if (tableHeight > 550) {
			tableHeight = 550;
		}
		return {
			height : tableHeight + "px"
		};
	};

	$scope.getGridPrePlanSKUsHeight = function() {
		var rowHeight = 30; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($rootScope.gridPrePlanSKUs.data.length * rowHeight + headerHeight);

		if (tableHeight > 407) {
			tableHeight = 407;
		}
		return {
			height : tableHeight
		};
	};

} ]);
