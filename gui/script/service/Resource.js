'use strict';

angular.module('coolest')
	.factory('Search', ['$http', '$q', function ($http, $q) {
		return {
			get: function (url, path, params) {
				var deferred = $q.defer();
				url = url + path;
				$http({
					method: 'GET',
					url: url,
					params: params
				}).then(function (data) {
					deferred.resolve(data.data);
				}, function (data, status) {
					deferred.reject(data, status);
				});
				return deferred.promise;
			}
		};
	}]);
