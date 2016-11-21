app.controller('WorkOrdersController', [ '$scope', '$http', '$interval', '$q', '$rootScope', '$timeout', '$modal', '$log', 
                                         function($scope, $http, $interval, $q, $rootScope, $timeout, $log) {

	$scope.gridWorkOrders = {
		headerTemplate : 'html/WorkOrdersHeader.html',
		rowHeight : 30,
		enableFiltering : true,
		enableColumnResize : true,
		exporterMenuCsv : true,
		enableGridMenu : true,
		gridMenuTitleFilter : fakeI18n,
		columnDefs : [ {
			displayName : "Work Order ID",
			field : "workorderID",
			width : "9%",
			filter : {
				placeholder : 'Search By Work Order ID'
			},
		}, {
			displayName : "Installer One",
			field : "installerOne",
			width : "7%",
			filter : {
				placeholder : 'Search By Installer One'
			},
		}, {
			displayName : "Installer Two",
			field : "installerTwo",
			width : "7%",
			filter : {
				placeholder : 'Search By Installer Two'
			},
		}, {
			displayName : "Starting Date",
			field : "startingDate",
			width : "7%",
			filter : {
				placeholder : 'Search By Starting Date'
			},
		}, {
			displayName : "Customer Name",
			field : "customerName",
			width : "7%",
			filter : {
				placeholder : 'Search By Customer Name'
			},
		}, {
			displayName : "Address",
			field : "address",
			width : "7%",
			filter : {
				placeholder : 'Search By Address'
			},
		}, {
			displayName : "City",
			field : "city",
			width : "7%",
			filter : {
				placeholder : 'Search By City'
			},
		}, {
			displayName : "State",
			field : "state",
			width : "7%",
			filter : {
				placeholder : 'Search By State'
			},
		}, {
			displayName : "Zip",
			field : "zip",
			width : "7%",
			filter : {
				placeholder : 'Search By Zip'
			},
		}, {
			displayName : "Job Phone",
			field : "jobPhone",
			width : "7%",
			filter : {
				placeholder : 'Search By Job Phone'
			},
		}, {
			displayName : "Access Codes",
			field : "accessCodes",
			width : "7%",
			filter : {
				placeholder : 'Search By Access Codes'
			},
		}, {
			displayName : "Job Description",
			field : "jobDescription",
			width : "7%",
			filter : {
				placeholder : 'Search By Job Description'
			},
		}, {
			displayName : "Nested Volume",
			field : "nestedVolume",
			width : "7%",
			filter : {
				placeholder : 'Search By Nested Volume'
			},
		}, {
			displayName : "Cell One",
			field : "cellOne",
			width : "7%",
			filter : {
				placeholder : 'Search By Cell One'
			},
		}, {
			displayName : "Cell Two",
			field : "cellTwo",
			width : "7%",
			filter : {
				placeholder : 'Search By Cell Two'
			},
		},{
			displayName : "Cell Three",
			field : "cellThree",
			width : "7%",
			filter : {
				placeholder : 'Search By Cell Three'
			},
		},{
			displayName : "Cell Four",
			field : "cellFour",
			width : "7%",
			filter : {
				placeholder : 'Search By Cell Four'
			},
		},{
			displayName : "Total Cost",
			field : "totalCost",
			width : "7%",
			visible : false,
			filter : {
				placeholder : 'Search By Total Cost'
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


		$http.get('/workorder/workorders').success(function(data) {
			//$scope.gridWorkOrders.data = data.data;
			$rootScope.gridWorkOrders.data = data;
		}).error(function(data) {
			alert("There has been an error fetching data: " + data);
		});



	$scope.getGridWorkOrders = function() {
		var rowHeight = 30; // your row height
		var headerHeight = 70; // your header height
		var tableHeight = ($scope.gridWorkOrders.data.length * rowHeight + headerHeight);

		if (tableHeight > 550) {
			tableHeight = 550;
		}
		return {
			height : tableHeight + "px"
		};
	};

} ]);