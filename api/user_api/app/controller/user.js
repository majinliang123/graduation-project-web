'use strict';

var swagger = require('swagger-node-express'),
	nconf = require('nconf'),
	path = require('path'),
	hal = require('hal'),
	winston = require('winston');

var paginator = require('../service/paginator.js');

var users_collection = 'users';
// init config
var configPath = path.resolve(__dirname + '/../config/globalConfig.json');
nconf.file('Base', { file: configPath });
var users_collection = nconf.get('collectoin');
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
	var pageSize = 100;

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
				var resource = new hal.Resource({ 'pageSize': pageSize }, 'user?firstId=' + docs[0]._id);
				resource.link('Next', 'api/user?lastId=' + docs[docs.length - 1]._id);
				resource.embed('users', docs);
				res.json(resource);
			}else{
				res.json({});
			}

			logger.info('Search successfully, results are: ' + JSON.stringify(docs));
		}
	});
}

module.exports.findUser = {
	'spec': {
		'description': 'Operations about pets',
		'path': '/user',
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
