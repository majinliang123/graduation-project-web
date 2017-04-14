'use strict';

angular.module('coolest')
    .factory('SearchForms', [function () {
        return {
            'reports': {
                'searchFileds': [
                    { 'name': 'userName', 'displayName': 'User Name', placeholder:'User Name'},
                    { 'name': 'userId', 'displayName': 'User Id', placeholder:'User Id'},
                    { 'name': 'userAge', 'displayName': 'User Age', placeholder:'User Id'},
                ],
                'showFileds': [
                    { 'name': 'userName', 'displayName': 'User Name' },
                    { 'name': 'userId', 'displayName': 'User Id' },
                    { 'name': 'userAge', 'displayName': 'User Age' },
                ]
            },
            'export': {
                'searchFileds': [
                    { 'name': 'userName', 'displayName': 'User Name' },
                    { 'name': 'userId', 'displayName': 'User Id' },
                    { 'name': 'userAge', 'displayName': 'User Age' },
                ],
                'showFileds': [
                    { 'name': 'userName', 'displayName': 'User Name' },
                    { 'name': 'userId', 'displayName': 'User Id' },
                    { 'name': 'userAge', 'displayName': 'User Age' },
                ]
            },
            'analytics': {
                'searchFileds': [
                    { 'name': 'userName', 'displayName': 'User Name' },
                    { 'name': 'userId', 'displayName': 'User Id' },
                    { 'name': 'userAge', 'displayName': 'User Age' },
                ],
                'showFileds': [
                    { 'name': 'userName', 'displayName': 'User Name' },
                    { 'name': 'userId', 'displayName': 'User Id' },
                    { 'name': 'userAge', 'displayName': 'User Age' },
                ]
            }
        };
    }]);