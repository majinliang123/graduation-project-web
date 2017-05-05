'use strict';

angular.module('CoolestLogin', ['ngCookies'])
    .controller('LoginController', ['$scope', '$http', '$window', '$cookies', function ($scope, $http, $window, $cookies) {
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
            setTimeout(function () {
                $window.location.href = '/gui';
                $cookies.put('username', $scope.username);
            }, 300);

        }
    }]);