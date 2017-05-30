'use strict';

angular.module('coolest')
    .controller('TopbarController', ['$scope', '$rootScope', '$window', function($scope, $rootScope, $window) {
        $scope.globalSearch = './view/globalSearch.html';
        $scope.username = $rootScope.username;

        $scope.logout = function() {
            $window.location.href = '/logout';
        };
    }]);