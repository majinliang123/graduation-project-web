'use strict';

angular.module('coolest', [], function ($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
})
	.controller('IndexController', ['$location', '$scope', function ($location, $scope) {

		$scope.main = './view/welcome.html';
		$scope.nav = './view/nav.html';
		$scope.$on('$locationChangeStart', function (event, newUrl) {
			var url = $location.url();
			var urlArray = url.split("/");
			var path = urlArray[2];
			if (path) {
				$scope.main = './view/main.html';
			}
		});
	}]);
