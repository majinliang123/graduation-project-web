'use strict';

angular.module('CoolestLogin', [])
    .controller('LoginController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
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
            }, 300);

        }
    }]);