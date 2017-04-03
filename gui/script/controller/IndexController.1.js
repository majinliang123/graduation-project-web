angular.module('coolest', [])
    .controller('IndexController', function ($scope) {
        $scope.main = './view/nav.html';
        $scope.nav = './view/main.html';
    });