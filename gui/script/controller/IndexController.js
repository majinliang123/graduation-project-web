'use strict';

angular.module('coolest', ['ngCookies'], function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller('IndexController', ['$location', '$scope', '$cookies', '$rootScope', 'Search', function($location, $scope, $cookies, $rootScope, Search) {

        $scope.main = './view/welcome.html';
        $scope.nav = './view/nav.html';

        $rootScope.username = $cookies.get('username');
        fetchAuthority();
        $scope.$on('$locationChangeStart', function() {
            var url = $location.url();
            var urlArray = url.split('/');
            var path = urlArray[2];
            if (path) {
                $scope.main = './view/main.html';
            }
        });

        function fetchAuthority() {
            Search.get('/api/authority/', $rootScope.username, '').then(function(data) {
                $rootScope.authority = data;
            });
        }
    }]);