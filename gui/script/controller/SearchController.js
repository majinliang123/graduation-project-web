'use strict';

angular.module('coolest')
	.controller('SearchController', ['SearchForms', 'Search', '$location', '$scope', '$rootScope', function (SearchForms, Search, $location, $scope, $rootScope) {

		var path = 'users';
		var pagination = false;
		var nextPageUrl;
		populatePath();
		
		$scope.$on('$locationChangeSuccess', function () {
			populatePath();
		});

		$scope.search = function () {
			Search.get('/api/' + path, '', $scope.formValue).then(function (data) {
				$scope.fetchedData = data._embedded[path];
				if(pagination){
					nextPageUrl = data._links.Next.href;
				}
			});
		};
		$scope.clear = function () {
			$scope.formValue = {};
		};
		$scope.fetchDetail = function (id) {
			Search.get('/api/' + path + '/' + id, '', {}).then(function (data) {
				$rootScope.detail = data;
			});
		};

		// trigger a event when the scroll bar scroll to the bottom
		$(document).scroll(function () {
			if ($(document).scrollTop() / $(document).height() >= 0.8 && pagination) {
				fetchNextPage();
			}
		});

		function fetchNextPage() {
			Search.get(nextPageUrl, '', $scope.formValue).then(function (data) {
				$scope.fetchedData = $scope.fetchedData.concat(data._embedded[path]);
				nextPageUrl = data._links.Next.href;
			});
		}

		function populatePath() {
			var url = $location.url();
			var urlArray = url.split('/');
			path = urlArray[2];
			$scope.searchFields = SearchForms[path].searchFileds;
			$scope.showFileds = SearchForms[path].showFileds;
			pagination = SearchForms[path].pagination;
			$scope.title = path.toUpperCase();
			$scope.fetchedData = {};
			$rootScope.path = path;
		}
	}]);
