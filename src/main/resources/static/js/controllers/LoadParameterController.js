app.controller('LoadParameterController', [ '$scope', '$http', '$filter', '$interval', '$q', '$rootScope', '$timeout', '$modal', '$log', function($scope, $http, $filter, $interval, $q, $rootScope, $timeout, $log) {

	var fakeI18n = function(title) {
		var deferred = $q.defer();
		$interval(function() {
			deferred.resolve('col: ' + title);
		}, 1000, 1);
		return deferred.promise;
	};

	$scope.gridLoadGroupParm = {
		headerTemplate : 'html/LoadGroupParmGridHeader.html',
		rowHeight : 30,
		enableFiltering : true,
		enableColumnResize : true,
		exporterMenuCsv : true,
		enableGridMenu : true,
		gridMenuTitleFilter : fakeI18n,
		columnDefs : [ {
			displayName : "Full Truck Percentage",
			field : "fullTruckPercentage",
			width : "8%",
			filter : {
				placeholder : 'Search By Full Truck Percentage'
			},
		}, {
			displayName : "Truck Height",
			field : "truckHeight",
			width : "8%",
			filter : {
				placeholder : 'Search By Truck Height'
			},
		}, {
			displayName : "Truck Load Max Weight",
			field : "truckloadMaxWeight",
			width : "8%",
			filter : {
				placeholder : 'Search By Max Weight'
			},
		}, {
			displayName : "Truck Load Max Volume",
			field : "truckloadMaxVolume",
			width : "8%",
			filter : {
				placeholder : 'Search By Max Volume'
			},
		}, {
			displayName : "Smoothing Max Loads",
			field : "smoothingMaxLoads",
			width : "8%",
			filter : {
				placeholder : 'Search By Smoothing Max Loads'
			},
		}, {
			displayName : "Smoothing Interval",
			field : "smoothingInterval",
			width : "8%",
			filter : {
				placeholder : 'Search By Smoothing Interval'
			},
		}, {
			displayName : "Directional Rounding Threshold",
			field : "directionalRoundingThreshold",
			width : "8%",
			filter : {
				placeholder : 'Search By DRT'
			},
		}, {
			displayName : "Rounding Increment",
			field : "roundingIncrement",
			width : "8%",
			filter : {
				placeholder : 'Search By Rounding Increment'
			},
		}, {
			displayName : "Reconfigure Eligibility Flag",
			field : "reconfigureEligibilityFlag",
			width : "8%",
			filter : {
				placeholder : 'Search By Reconfigure Eligibility Flag'
			},
		}, {
			displayName : "Is Loads Tendered",
			field : "hasTenderedLoads",
			width : "8%",
			filter : {
				placeholder : 'Search By Is Loads Tendered'
			},
		}, {
			displayName : "Weight UOM CD",
			field : "weightUOM",
			width : "10%",
			filter : {
				placeholder : 'Search By Weight UOM CD'
			},
		}, {
			displayName : "Volume UOM CD",
			field : "volumeUOM",
			width : "10%",
			filter : {
				placeholder : 'Search By Volume UOM CD'
			},
		} ]
	};

	$scope.viewGridLoadGroupParm = function(loadGroupId, date) {
			$scope.date = $filter('date')(date, $scope.format);
			$http.get('/TLR_UI/rs/AppServices/constraints/loadgroup/' + loadGroupId + '/date/' + $scope.date).success(function(data) {
				$scope.gridLoadGroupParm.data = data.data;
			}).error(function(data) {
				alert("There has been an error fetching data: " + data);
			});
	};

	$scope.getGridLoadGroupParmHeight = function() {
		var rowHeight = 30; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($scope.gridLoadGroupParm.data.length * rowHeight + headerHeight);

		if (tableHeight > 550) {
			tableHeight = 550;
		}
		return {
			height : tableHeight + "px"
		};
	};

	$scope.gridSkuParm = {
		headerTemplate : 'html/LoadGroupSkuParmGridHeader.html',
		rowHeight : 30,
		enableFiltering : true,
		enableColumnResize : true,
		exporterMenuCsv : true,
		enableGridMenu : true,
		gridMenuTitleFilter : fakeI18n,
		columnDefs : [ {
			displayName : "SKU Number",
			field : "skuNumber",
			width : "14%",
			filter : {
				placeholder : 'Search By SKU'
			},
		}, {
			displayName : "Vendor Number",
			field : "vendorNumber",
			width : "14%",
			filter : {
				placeholder : 'Search By Vendor'
			},
		}, {
			displayName : "Parm Code",
			field : "parmCode",
			width : "14%",
			filter : {
				placeholder : 'Search By Parm Code'
			},
		}, {
			displayName : "Parameter Decimal Value",
			field : "parmDecValue",
			width : "16%",
			filter : {
				placeholder : 'Search By Decimal Value'
			},
		}, {
			displayName : "Parameter Character Value",
			field : "parmCharValue",
			width : "14%",
			filter : {
				placeholder : 'Search By Character Value'
			},
		}, {
			displayName : "Parameter Integer Value",
			field : "parmIntValue",
			width : "14%",
			filter : {
				placeholder : 'Search By Integer Value'
			},
		}, {
			displayName : "Parameter Flag Value",
			field : "parmFlagValue",
			width : "14%",
			filter : {
				placeholder : 'Search By Flag Value'
			},
		} ],
	};

	$scope.viewGridSkuParm = function(loadGroup, date, vndrNbr, skuNbr) {
		$scope.date = $filter('date')(date, $scope.format);
		$http.get('/TLR_UI/rs/AppServices/loadgroup/' + loadGroup + '/date/' + $scope.date + '/vendor/' + vndrNbr + '/sku/' + skuNbr).success(function(data) {
			$scope.gridSkuParm.data = data.data;
		}).error(function(data) {
			alert("There has been an error fetching data: " + data);
		});

	};

	$scope.getGridSkuParmHeight = function() {
		var rowHeight = 30; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($scope.gridSkuParm.data.length * rowHeight + headerHeight);

		if (tableHeight > 550) {
			tableHeight = 550;
		}
		return {
			height : tableHeight + "px"
		};
	};

	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();

	$scope.clear = function() {
		$scope.dt = null;
	};

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope[opened] = true;
	};

	$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate' ];
	$scope.format = $scope.formats[1];

	$scope.status = {
		opened : false
	};
} ]);