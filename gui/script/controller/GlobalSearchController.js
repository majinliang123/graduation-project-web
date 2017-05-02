'use strict';

angular.module('coolest')
    .controller('GlobalSearchController', ['$scope', 'Search', function ($scope, Search) {
        $scope.globalSearch = '';
        $scope.items = {};
        var globalSearchUrl = '/api/search/';
        $scope.$watch('globalSearch', function (newVal) {
            if (newVal) {
                Search.get(globalSearchUrl + newVal, '', '').then(function (data) {
                    $scope.items = data._embedded.hits;
                });
            } else {
                $scope.items = {};
            }

        });
    }]);