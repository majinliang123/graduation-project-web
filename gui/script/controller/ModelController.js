'use strict';

angular.module('coolest')
    .controller('ModelController', ['Search', 'Model', '$scope', '$rootScope', function(Search, Model, $scope, $rootScope) {
        $scope.detail = {};
        $scope.model = {};
        $rootScope.$watch('detail', function() {
            $scope.detail = $rootScope.detail;
            $scope.model = Model[$rootScope.path];
        });

        $scope.save = function() {
            if ($rootScope.path === 'users') {
                Search.post('/api/userChange', '/' + $scope.detail.username, $scope.detail);
            }
            if ($rootScope.path === 'shops') {
                Search.post('/api/shopChange', '/' + $scope.detail.shopname, $scope.detail);
            }
        };
    }]);