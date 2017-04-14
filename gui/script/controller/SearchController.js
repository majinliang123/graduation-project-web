'use strict';

angular.module('coolest')
    .controller('SearchController', ['SearchForms','$location', '$scope', function (SearchForms,$location, $scope) {
        var path = $location.url();
        $scope.searchFields = SearchForms[path].searchFileds;
    }]);