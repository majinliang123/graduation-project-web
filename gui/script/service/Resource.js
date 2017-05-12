'use strict';

angular.module('coolest')
    .factory('Search', ['$http', '$q', function($http, $q) {
        return {
            get: function(url, path, params) {
                var deferred = $q.defer();
                url = url + path;
                $http({
                    method: 'GET',
                    url: url,
                    params: params
                }).then(function(data) {
                    deferred.resolve(data.data);
                }, function(data, status) {
                    deferred.reject(data, status);
                });
                return deferred.promise;
            },
            post: function(url, path, params) {
                var sendData = $.param(params);
                url = url + path;
                $http({
                    method: 'POST',
                    url: url,
                    data: sendData,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });
            }
        };
    }]);