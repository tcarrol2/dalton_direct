app.controller('WorkOrderFormController', [ '$scope', '$http', '$interval', '$q', '$rootScope', '$timeout', '$log', 'modal', function($scope, $http, $interval, $q, $rootScope, $timeout, $log, modal) {

	$scope.reset = function(form) {
	      if (form) {
	        form.$setPristine();
	        form.$setUntouched();
	      }
	      $scope.user = angular.copy($scope.master);
	    };

	    $scope.reset();
	    
	    $scope.submit = function(){		
			$scope.workorders.push({ 'installerOne':$scope.user.installerOne, 'installerTwo': $scope.user.installerTwo, 
				'customerName':$scope.user.customerName, 'address':$scope.user.address, 'state':$scope.user.state,
				'city':$scope.user.city, 'zip':$scope.user.zip, 'joPhone':$scope.user.jobPhone, 'accessCodes':$scope.user.accessCodes,
				'descriptionOfWork':$scope.user.descriptionOfWork, 'cellOne':$scope.user.cellOne, 'cellTwo':$scope.user.cellTwo,
				'cellThree':$scope.user.cellThree, 'cellFour':$scope.user.cellour, 'cellFive':$scope.user.cellFive, 
				'cellSix':$scope.user.cellSix, 'totalAmount':$scope.user.totalAmount});
			// Writing it to the server
			//		
			var dataObj = {
					installerOne : $scope.user.installerOne,
					installerTwo : $scope.user.installerTwo,
					customerName : $scope.user.customerName,
					address : $scope.user.address,
					state : $scope.user.state,
					city : $scope.user.city,
					zip : $scope.user.zip,
					jobPhone : $scope.user.jobPhone,
					accessCodes : $scope.user.accessCodes,
					descriptionOfWork : $scope.user.descriptionOfWork,
					cellOne : $scope.user.cellOne,
					cellTwo : $scope.user.cellTwo,
					cellThree : $scope.user.cellThree,
					cellFour : $scope.user.cellFour,
					cellFive : $scope.user.cellFive,
					cellSix : $scope.user.cellSix,
					totalAmount : $scope.user.totalAmount
			};	
			var res = $http.post('/saveworkorder', dataObj);
			res.success(function(data, status, headers, config) {
				$scope.message = data;
			});
			res.error(function(data, status, headers, config) {
				alert( "failure message: " + JSON.stringify({data: data}));
			});		
			// Making the fields empty
			//
			$scope.user.totalAmount='';

		};
		

} ]);

