'use strict';

var swagger = require('swagger-node-express'),
	nconf = require('nconf'),
	path = require('path'),
	hal = require('hal'),
	winston = require('winston');


// init config
var configPath = path.resolve(__dirname + '/../config/globalConfig.json');
nconf.file('Base', { file: configPath });
var users_collection = nconf.get('analy_collectoin');
var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: nconf.get('logging:file:path') })
	]
});


function findUserByUsernameHandler(req, res) {
	logger.info('handling by findUserByUsernameHandler');
	var database = req.database;

	var username = req.params.username;
	
	var params = { 'username': username };
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


module.exports.findUserByUsername = {
	'spec': {
		'description': 'Operations about user',
		'path': '/userAnaly/{username}',
		'notes': 'Returns a user info',
		'summary': 'Find user by info',
		'method': 'GET',
		'parameters': [
			swagger.pathParam('username', 'username of a user', 'string')],
		'type': 'User',
		'nickname': 'findUserByIdHandler'
	},
	'action': findUserByUsernameHandler
};
