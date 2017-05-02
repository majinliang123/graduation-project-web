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
var logs_collection = nconf.get('collectoin');
var pageSize = nconf.get('pageSize');
var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: nconf.get('logging:file:path') })
	]
});


function findLogHandler(req, res) {
	logger.info('handling by findLogHandler');
	var database = req.database;
	var query = {};
	var params = {};

	if (req.query.shop) {
		query.shop = req.query.shop;
	}
	if (req.query.age) {
		query.age = parseInt(req.query.age, 10);
	}
	if (req.query.username) {
		query.username = req.query.username;
	}
	if (req.query.sex) {
		query.sex = req.query.sex;
	}

	if (req.query.lastId) {
		params.lastId = req.query.lastId;
	}

	params.returnField = {};
	params.collection = logs_collection;
	params.pageSize = pageSize;
	params.query = query;

	paginator.getPaginatedById(database, params, function (err, docs) {
		if (!err) {
			logger.info('Searching, query params is: ' + JSON.stringify(params));
			if (docs.length > 0) {
				var resource = new hal.Resource({ 'pageSize': pageSize }, 'logs?firstId=' + docs[0]._id);
				resource.link('Next', '/api/logs?lastId=' + docs[docs.length - 1]._id);
				resource.embed('logs', docs);
				res.json(resource);
			} else {
				res.json({});
			}

			logger.info('Search successfully, results are: ' + JSON.stringify(docs));
		}
	});
}


function findLogByIdHandler(req, res) {
	logger.info('handling by findLogByIdHandler');
	var database = req.database;

	if (req.params.id) {
		var _id = new ObjectID(req.params.id);
	}

	var params = { '_id': _id };
	database.collection(logs_collection).find(params).toArray(function (err, docs) {
		if (!err) {
			logger.info('Searching, query params is: ' + JSON.stringify(params));
			if (docs.length === 1) {
				var resource = new hal.Resource(docs[0], '/api/logs/' + docs[0]._id);
				res.json(resource);
			} else {
				res.json({});
			}
		}
		logger.info('Search successfully, results are: ' + JSON.stringify(docs));
	});
}


module.exports.findLog = {
	'spec': {
		'description': 'Operations about log',
		'path': '/logs',
		'notes': 'Returns a log info',
		'summary': 'Find log by info',
		'method': 'GET',
		'parameters': [
			swagger.queryParam('shop', 'shop of a log', 'string'),
			swagger.queryParam('age', 'age of a log', 'int'),
			swagger.queryParam('sex', 'sex of a log', 'string'),
			swagger.queryParam('username', 'username of a log', 'string')],
		'type': 'Log',
		'nickname': 'findLogHandler'
	},
	'action': findLogHandler
};

module.exports.findLogById = {
	'spec': {
		'description': 'Operations about log',
		'path': '/logs/{id}',
		'notes': 'Returns a log info',
		'summary': 'Find log by info',
		'method': 'GET',
		'parameters': [
			swagger.pathParam('id', 'ObjectID of a log', 'string')],
		'type': 'Log',
		'nickname': 'findLogByIdHandler'
	},
	'action': findLogByIdHandler
};
