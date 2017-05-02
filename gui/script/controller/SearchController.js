'use strict';

angular.module('coolest')
	.controller('SearchController', ['SearchForms', 'Search', '$location', '$scope', '$rootScope', function (SearchForms, Search, $location, $scope, $rootScope) {

		var path = 'users';
		var pagination = false;
		var analyze = false;
		var analyzePath;
		var analyzeWord;
		var analyzeField = [];
		var nextPageUrl;
		$scope.formValue = {};
		populatePath();

		$scope.$on('$locationChangeSuccess', function () {
			populatePath();
		});

		$scope.search = search;
		$scope.clear = function () {
			$scope.formValue = {};
		};
		$scope.fetchDetail = function (id) {
			Search.get('/api/' + path + '/' + id, '', {}).then(function (data) {
				$rootScope.detail = data;
				if (analyze) {
					Search.get('/api/' + analyzePath + '/', $rootScope.detail[analyzeWord], {}).then(function (data) {
						analyzeField.forEach(function (element) {
							$rootScope.detail[element] = data[element];
						});
					});
				}
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
			if (urlArray[2].indexOf('?') >= 0) {
				var paramArray = urlArray[2].split('?');
				path = paramArray[0];
				$rootScope.path = path;
				$scope.fetchedData = {};
				var queryParams = $location.search();
				for (var m in queryParams) {
					if (queryParams.hasOwnProperty(m)) {
						$scope.formValue[m] = queryParams[m];
					}
				}
				search();
			} else {
				path = urlArray[2];
				$rootScope.path = path;
				$scope.fetchedData = {};
			}
			$scope.searchFields = SearchForms[path].searchFileds;
			$scope.showFileds = SearchForms[path].showFileds;
			pagination = SearchForms[path].pagination;
			analyze = SearchForms[path].analyze;
			analyzePath = SearchForms[path].analyzePath;
			analyzeWord = SearchForms[path].analyzeWord;
			analyzeField = SearchForms[path].analyzeField;
			$scope.title = path.toUpperCase();
		}

		function search() {
			Search.get('/api/' + path, '', $scope.formValue).then(function (data) {
				$scope.fetchedData = data._embedded[path];
				if (pagination) {
					nextPageUrl = data._links.Next.href;
				}
			});
		}
	}]);
