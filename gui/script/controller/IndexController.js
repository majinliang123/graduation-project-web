'use strict';

angular.module('coolest', ['ngCookies'], function ($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
})
	.controller('IndexController', ['$location', '$scope', '$cookies', '$rootScope', function ($location, $scope, $cookies, $rootScope) {

		$scope.main = './view/welcome.html';
		$scope.nav = './view/nav.html';

		$rootScope.username = $cookies.get('username');

		$scope.$on('$locationChangeStart', function () {
			var url = $location.url();
			var urlArray = url.split('/');
			var path = urlArray[2];
			if (path) {
				$scope.main = './view/main.html';
			}
		});
	}]);
