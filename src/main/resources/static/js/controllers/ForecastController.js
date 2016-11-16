app.controller('ForecastController', [ '$scope', '$http', '$interval', '$q', '$rootScope', '$timeout', '$modal', '$log', function($scope, $http, $interval, $q, $rootScope, $timeout, $log) {

	var fakeI18n = function(title) {
		var deferred = $q.defer();
		$interval(function() {
			deferred.resolve('col: ' + title);
		}, 1000, 1);
		return deferred.promise;
	};

	$scope.gridForecast = {
		headerTemplate : 'html/ForecaseGridHeader.html',
		rowHeight : 30,
		enableFiltering : true,
		enableColumnResize : true,
		exporterMenuCsv : true,
		enableGridMenu : true,
		gridMenuTitleFilter : fakeI18n,
		columnDefs : [ {
			displayName : "Order Group ID",
			field : "orderGroupId",
			width : "7%",
			filter : {
				placeholder : 'Search By Order Group ID'
			},
		}, {
			displayName : "Forecast ID",
			field : "fcstId",
			width : "7%",
			visible : false,
			filter : {
				placeholder : 'Search By Forecast ID'
			},
		}, {
			displayName : "Create User",
			field : "createUserId",
			width : "6%",
			visible : false,
			filter : {
				placeholder : 'Search By Create User'
			},
		}, {
			displayName : "Create Time",
			field : "createTimeStamp",
			width : "6%",
			visible : false,
			filter : {
				placeholder : 'Search By Create Time'
			},
		}, {
			displayName : "Last User",
			field : "lastUser",
			width : "6%",
			visible : false,
			filter : {
				placeholder : 'Search By Last User'
			},
		}, {
			displayName : "Last Time Updated",
			field : "lastUserTimeStamp",
			width : "6%",
			visible : false,
			filter : {
				placeholder : 'Search By Last Time Updated'
			},
		}, {
			displayName : "Origin",
			field : "origin",
			width : "7%",
			visible : true,
			filter : {
				placeholder : 'Search By Origin'
			},
		}, {
			displayName : "Destination",
			field : "destination",
			width : "7%",
			visible : true,
			filter : {
				placeholder : 'Search By Destination'
			},
		}, {
			displayName : "Ship To Code",
			field : "shipToCode",
			width : 40,
			visible : false,
			filter : {
				placeholder : 'Search By Ship To Code'
			},
		}, {
			displayName : "Vendor #",
			field : "vendorNumber",
			width : "7%",
			visible : true,
			filter : {
				placeholder : 'Search By Vendor #'
			},
		}, {
			displayName : "Department #",
			field : "deptNumber",
			width : 40,
			visible : false,
			filter : {
				placeholder : 'Search By Department #'
			},
		}, {
			displayName : "SKU #",
			field : "skuNumber",
			width : "7%",
			filter : {
				placeholder : 'Search By SKU #'
			},
		}, {
			displayName : "Mer Base Code",
			field : "merBaseCode",
			width : 40,
			visible : false,
			filter : {
				placeholder : 'Search By Mer Base Code'
			},
		}, {
			displayName : "DC Pack",
			field : "dcBuyUomQty",
			width : 80,
			visible : false,
			filter : {
				placeholder : 'Search By DC Pack'
			},
		}, {
			displayName : "Forecast Type Code",
			field : "forecastTypeCode",
			width : "10%",
			filter : {
				placeholder : 'Search By Forecast Type Code'
			},
		}, {
			displayName : "Day 1",
			field : "dayOneVal",
			width : "5%",
		}, {
			displayName : "Day 2",
			field : "dayTwoVal",
			width : "5%",
		}, {
			displayName : "Day 3",
			field : "dayThreeVal",
			width : "5%",
		}, {
			displayName : "Day 4",
			field : "dayFourVal",
			width : "5%",
		}, {
			displayName : "Day 5",
			field : "dayFiveVal",
			width : "5%",
		}, {
			displayName : "Day 6",
			field : "daySixVal",
			width : "5%",
		}, {
			displayName : "Day 7",
			field : "daySevenVal",
			width : "5%",
		}, {
			displayName : "Day 8",
			field : "dayEightVal",
			width : "5%",
		}, {
			displayName : "Day 9",
			field : "dayNineVal",
			width : "5%",
		}, {
			displayName : "Day 10",
			field : "dayTenVal",
			width : "5%",
		}, {
			displayName : "Day 11",
			field : "dayElevenVal",
			width : "5%",
			visible : false
		}, {
			displayName : "Day 12",
			field : "dayTwelveVal",
			width : "5%",
			visible : false
		}, {
			displayName : "Day 13",
			field : "dayThirteenVal",
			width : "5%",
			visible : false
		}, {
			displayName : "Day 14",
			field : "dayFourteenVal",
			width : "5%",
			visible : false
		}, {
			displayName : "Day 15",
			field : "dayFifthteenVal",
			width : "5%",
			visible : false
		}, {
			displayName : "Day 16",
			field : "daySixteenVal",
			width : 70,
			visible : false
		}, {
			displayName : "Day 17",
			field : "daySeventeenVal",
			width : 70,
			visible : false
		}, {
			displayName : "Day 18",
			field : "dayEightteenVal",
			width : 70,
			visible : false
		}, {
			displayName : "Day 19",
			field : "dayNineteenVal",
			width : 70,
			visible : false
		}, {
			displayName : "Day 20",
			field : "dayTwentyVal",
			width : 70,
			visible : false
		}, {
			displayName : "Day 21",
			field : "dayTwentyOneVal",
			width : 70,
			visible : false
		}, {
			displayName : "Day 22",
			field : "dayTwentyTwoVal",
			width : 70,
			visible : false
		}, {
			displayName : "Day 23",
			field : "dayTwentyThreeVal",
			width : 70,
			visible : false
		}, {
			displayName : "Day 24",
			field : "dayTwentyFourVal",
			width : 70,
			visible : false
		}, {
			displayName : "Day 25",
			field : "dayTwentyFiveVal",
			width : 70,
			visible : false
		}, {
			displayName : "Day 26",
			field : "dayTwentySixVal",
			width : 70,
			visible : false
		}, {
			displayName : "Day 27",
			field : "dayTwentySevenVal",
			width : 70,
			visible : false
		}, {
			displayName : "Day 28",
			field : "dayTwentyEightVal",
			width : 70,
			visible : false
		}, {
			displayName : "Dispo Type",
			field : "dispositionType",
			width : "5%",
			visible : true,
			filter : {
				placeholder : 'Search By Dispo Type'
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

	$scope.viewAllForecast = function() {
		$http.get('/TLR_UI/rs/AppServices/GetForecastData').success(function(data) {
			$scope.gridForecast.data = data.data;
		}).error(function(data) {
			alert("There has been an error fetching data: " + data);
		});
	};

	$scope.viewForecastByOrderGroupId = function(orderGroupId) {
		$http.get('/TLR_UI/rs/AppServices/GetForecastData?OrderGroupNbr=' + orderGroupId).success(function(data) {
			$scope.gridForecast.data = data.data;
		}).error(function(data) {
			alert("There has been an error fetching data: " + data);
		});
	};

	$scope.getGridForecastHeight = function() {
		var rowHeight = 30; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($scope.gridForecast.data.length * rowHeight + headerHeight);

		if (tableHeight > 550) {
			tableHeight = 550;
		}
		return {
			height : tableHeight + "px"
		};
	};
} ]);