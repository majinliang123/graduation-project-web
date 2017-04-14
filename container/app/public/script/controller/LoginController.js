'use strict';

angular.module('CoolestLogin', [])
    .controller('LoginController', ['$scope', '$http', function ($scope, $http) {
        $scope.username = '';
        $scope.password = '';
        $scope.submit = function () {
            var data = {
                'username': $scope.username,
                'password': $scope.password
            };
            sendPost(data);
        };

        function sendPost(data) {
            var sendData = $.param(data);
            $http({
                method: 'POST',
                url: 'login',
                data: sendData,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        }
    }]);