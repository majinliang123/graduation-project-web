'use strict';

angular.module('coolest')
	.factory('Model', [function () {
		return {
			'users': {
				'title': { 'name': 'username', 'displayName': 'User Name' },
				'detail': [
					{ 'name': 'username', 'displayName': 'User Name', type: 'text' },
					{ 'name': 'sex', 'displayName': 'Sex', type: 'text' },
					{ 'name': 'age', 'displayName': 'Age', type: 'text' },
					{ 'name': 'email', 'displayName': 'Email', type: 'text' }
				]
			},
			'shops': {
				'title': { 'name': 'shopname', 'displayName': 'Shop Name' },
				'detail': [
					{ 'name': 'shopname', 'displayName': 'Shop Name', type: 'text' },
					{ 'name': 'boss', 'displayName': 'Boss', type: 'text' },
					{ 'name': 'goods', 'displayName': 'Goods', type: 'array' }
				]
			},
			'logs': {
				'title': { 'name': '_id', 'displayName': 'Log Id' },
				'detail': [
					{ 'name': 'shop', 'displayName': 'Shop Name', type: 'text' },
					{ 'name': 'username', 'displayName': 'User Name', type: 'text' },
					{ 'name': 'sex', 'displayName': 'Sex', type: 'text' },
					{ 'name': 'age', 'displayName': 'Age', type: 'text' },
					{ 'name': 'date', 'displayName': 'Date', type: 'text' },
				]
			}
		};
	}]);
