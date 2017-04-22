'use strict'

angular.module('coolest')
	.controller('ModelController', ['Model','$scope', '$rootScope', function (Model,$scope, $rootScope) {
		$scope.detail = {};
		$scope.model = {};
		$rootScope.$watch('detail', function(newValue){
			$scope.detail = $rootScope.detail;
			$scope.model = Model[$rootScope.path];
		});
		
	}]);
