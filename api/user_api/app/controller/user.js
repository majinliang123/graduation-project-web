'use strict';

var swagger = require('swagger-node-express'),
	nconf = require('nconf'),
	path = require('path'),
	hal = require('hal'),
	ObjectID = require('mongodb').ObjectID,
	winston = require('winston');

var paginator = require('../service/paginator.js');

// init config
var configPath = path.resolve(__dirname + '/../config/globalConfig.json');
nconf.file('Base', { file: configPath });
var users_collection = nconf.get('collectoin');
var pageSize = nconf.get('pageSize');
var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: nconf.get('logging:file:path') })
	]
});


function findUserHandler(req, res) {
	logger.info('handling by findUserHandler');
	var database = req.database;
	var query = {};
	var params = {};

	if (req.query.username) {
		query.username = req.query.username;
	}
	if (req.query.age) {
		query.age = parseInt(req.query.age, 10);
	}
	if (req.query.sex) {
		query.sex = req.query.sex;
	}
	if (req.query.email) {
		query.email = req.query.email;
	}

	if (req.query.lastId) {
		params.lastId = req.query.lastId;
	}

	params.returnField = {};
	params.collection = users_collection;
	params.pageSize = pageSize;
	params.query = query;

	paginator.getPaginatedById(database, params, function (err, docs) {
		if (!err) {
			logger.info('Searching, query params is: ' + JSON.stringify(params));
			if (docs.length > 0) {
				var resource = new hal.Resource({ 'pageSize': pageSize }, 'users?firstId=' + docs[0]._id);
				resource.link('Next', '/api/users?lastId=' + docs[docs.length - 1]._id);
				resource.embed('user', docs);
				res.json(resource);
			} else {
				res.json({});
			}

			logger.info('Search successfully, results are: ' + JSON.stringify(docs));
		}
	});
}


function findUserByIdHandler(req, res) {
	logger.info('handling by findUserByIdHandler');
	var database = req.database;

	if (req.params.id) {
		var _id = new ObjectID(req.params.id);
	}

	var params = { '_id': _id };
	database.collection(users_collection).find(params).toArray(function (err, docs) {
		if (!err) {
			logger.info('Searching, query params is: ' + JSON.stringify(params));
			if (docs.length === 1) {
				var resource = new hal.Resource(docs[0], '/api/users/' + docs[0]._id);
				res.json(resource);
			} else {
				res.json({});
			}
		}
		logger.info('Search successfully, results are: ' + JSON.stringify(docs));
	});
}


module.exports.findUser = {
	'spec': {
		'description': 'Operations about user',
		'path': '/users',
		'notes': 'Returns a user info',
		'summary': 'Find user by info',
		'method': 'GET',
		'parameters': [
			swagger.queryParam('username', 'username of a user', 'string'),
			swagger.queryParam('age', 'age of a user', 'int'),
			swagger.queryParam('sex', 'sex of a user', 'string'),
			swagger.queryParam('email', 'email of a user', 'string')],
		'type': 'User',
		'nickname': 'findUserHandler'
	},
	'action': findUserHandler
};

module.exports.findUserById = {
	'spec': {
		'description': 'Operations about user',
		'path': '/users/{id}',
		'notes': 'Returns a user info',
		'summary': 'Find user by info',
		'method': 'GET',
		'parameters': [
			swagger.pathParam('id', 'ObjectID of a user', 'string')],
		'type': 'User',
		'nickname': 'findUserByIdHandler'
	},
	'action': findUserByIdHandler
};