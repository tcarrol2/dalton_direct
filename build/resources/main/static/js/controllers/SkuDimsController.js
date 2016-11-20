app.controller('SkuDimsController', [ '$scope', '$http', '$interval', '$q', '$rootScope', '$timeout', '$modal', '$log', function($scope, $http, $interval, $q, $rootScope, $timeout, $log) {

	var fakeI18n = function(title) {
		var deferred = $q.defer();
		$interval(function() {
			deferred.resolve('col: ' + title);
		}, 1000, 1);
		return deferred.promise;
	};

	$scope.gridSkusMissingDim = {
		headerTemplate : 'html/SkusMissingDimsGridHeader.html',
		rowHeight : 30,
		enableFiltering : true,
		enableColumnResize : true,
		exporterMenuCsv : true,
		enableGridMenu : true,
		gridMenuTitleFilter : fakeI18n,
		columnDefs : [ {
			displayName : "Vendor Number",
			field : "merchandiseVendorNumber",
			width : "34%",
			filter : {
				placeholder : 'Search By Vendor Number'
			},
		}, {
			displayName : "RDC Number",
			field : "distributionCenterNumber",
			width : "33%",
			filter : {
				placeholder : 'Search By RDC Number'
			},
		}, {
			displayName : "SKU Number",
			field : "skuNumber",
			width : "33%",
			filter : {
				placeholder : 'Search By SKU Number'
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

	$scope.viewGridSkusMissingDim = function(vendorNbr, rdcNbr) {
		$http.get('/TLR_UI/rs/AppServices/getSkusMissingDim?Vendor=' + vendorNbr + '&DC=' + rdcNbr).success(function(data) {
			$scope.gridSkusMissingDim.data = data.data;
		}).error(function(data) {
			alert("There has been an error fetching data: " + data);
		});
	};

	$scope.getGridSkusMissingDimHeight = function() {
		var rowHeight = 30; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($scope.gridSkusMissingDim.data.length * rowHeight + headerHeight);

		if (tableHeight > 550) {
			tableHeight = 550;
		}
		return {
			height : tableHeight + "px"
		};
	};

	$scope.gridSkuDims = {
		headerTemplate : 'html/SkuDimsGridHeader.html',
		rowHeight : 30,
		enableFiltering : true,
		enableColumnResize : true,
		exporterMenuCsv : true,
		enableGridMenu : true,
		gridMenuTitleFilter : fakeI18n,
		columnDefs : [ {
			displayName : "SKU Number",
			field : "skuNumber",
			width : "9%",
			filter : {
				placeholder : 'Search By SKU Number'
			},
		}, {
			displayName : "Vendor Number",
			field : "merchandiseVendorNumber",
			width : "7%",
			filter : {
				placeholder : 'Search By Vendor Number'
			},
		}, {
			displayName : "RDC Number",
			field : "distributionCenterNumber",
			width : "7%",
			filter : {
				placeholder : 'Search By RDC Number'
			},
		}, {
			displayName : "Package Level Type Code",
			field : "packageHierarchyLevelTypeCode",
			width : "7%",
			filter : {
				placeholder : 'Search By Package Level Type Code'
			},
		}, {
			displayName : "Item Weight",
			field : "itemWeight",
			width : "7%",
			filter : {
				placeholder : 'Search By Item Weight'
			},
		}, {
			displayName : "Item Width",
			field : "itemWidth",
			width : "7%",
			filter : {
				placeholder : 'Search By Item Width'
			},
		}, {
			displayName : "Item Height",
			field : "itemHeight",
			width : "7%",
			filter : {
				placeholder : 'Search By Item Height'
			},
		}, {
			displayName : "Item Depth",
			field : "itemDepth",
			width : "7%",
			filter : {
				placeholder : 'Search By Item Depth'
			},
		}, {
			displayName : "Package Unit Quantity",
			field : "packageUnitQty",
			width : "7%",
			filter : {
				placeholder : 'Search By Package Unit Quantity'
			},
		}, {
			displayName : "Non Stackable",
			field : "nonStackable",
			width : "7%",
			filter : {
				placeholder : 'Search By Non Stackable'
			},
		}, {
			displayName : "Nestable",
			field : "nestable",
			width : "7%",
			filter : {
				placeholder : 'Search By Nestable'
			},
		}, {
			displayName : "Nested Weight",
			field : "nestedWeight",
			width : "7%",
			filter : {
				placeholder : 'Search By Nested Weight'
			},
		}, {
			displayName : "Nested Volume",
			field : "nestedVolume",
			width : "7%",
			filter : {
				placeholder : 'Search By Nested Volume'
			},
		}, {
			displayName : "Item Volume",
			field : "itemVolume",
			width : "7%",
			filter : {
				placeholder : 'Search By Item Volume'
			},
		}, {
			displayName : "Non Stackable Volume",
			field : "nonStackableVolume",
			width : "7%",
			visible : false,
			filter : {
				placeholder : 'Search By Non Stackable Volume'
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

	$scope.viewGridSkuDims = function(vendorNbr, rdcNbr, skuNbr) {
		$http.get('/TLR_UI/rs/AppServices/getDim?Vendor=' + vendorNbr + '&DC=' + rdcNbr + '&SKUNbr=' + skuNbr).success(function(data) {
			$scope.gridSkuDims.data = data.data;
		}).error(function(data) {
			alert("There has been an error fetching data: " + data);
		});

	};

	$scope.getGridSkuDimsHeight = function() {
		var rowHeight = 30; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($scope.gridSkuDims.data.length * rowHeight + headerHeight);

		if (tableHeight > 550) {
			tableHeight = 550;
		}
		return {
			height : tableHeight + "px"
		};
	};

} ]);