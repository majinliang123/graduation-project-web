'use strict';

angular.module('coolest')
    .factory('SearchForms', [function () {
        return {
            'user': {
                'searchFileds': [
                    { 'name': 'username', 'displayName': 'User Name', placeholder:'Erica Cunningham'},
                    { 'name': 'sex', 'displayName': 'Sex', placeholder:'female'},
                    { 'name': 'age', 'displayName': 'Age', placeholder:'12'},
					{ 'name': 'email', 'displayName': 'Email', placeholder:'email'}
                ],
                'showFileds': [
                    { 'name': 'username', 'displayName': 'User Name' },
                    { 'name': 'sex', 'displayName': 'Sex' },
                    { 'name': 'age', 'displayName': 'Age' },
					{ 'name': 'email', 'displayName': 'Email' }
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
