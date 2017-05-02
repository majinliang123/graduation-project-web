'use strict';

var swagger = require('swagger-node-express'),
	nconf = require('nconf'),
	path = require('path'),
	hal = require('hal'),
	ObjectID = require('mongodb').ObjectID,
	winston = require('winston');


// init config
var configPath = path.resolve(__dirname + '/../config/globalConfig.json');
nconf.file('Base', { file: configPath });
var shops_collection = nconf.get('collectoin');
var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: nconf.get('logging:file:path') })
	]
});


function findShopHandler(req, res) {
	logger.info('handling by findShopHandler');
	var database = req.database;
	var query = {};
	var returnField = {};

	if (req.query.shopname) {
		query.shopname = req.query.shopname;
	}
	if (req.query.boss) {
		query.boss = req.query.boss;
	}
	if (req.query.goods) {
		query.goods = req.query.goods;
	}

	database.collection(shops_collection).find(query, returnField).toArray(function (err, docs) {
		if (!err) {
			logger.info('Searching, query params is: ' + JSON.stringify(query));
			if (docs.length > 0) {
				var resource = new hal.Resource({}, 'shops?firstId=' + docs[0]._id);
				resource.embed('shops', docs);
				res.json(resource);
			} else {
				res.json({});
			}

			logger.info('Search successfully, results are: ' + JSON.stringify(docs));
		}

	});
}


function findShopByIdHandler(req, res) {
	logger.info('handling by findShopByIdHandler');
	var database = req.database;

	if (req.params.id) {
		var _id = new ObjectID(req.params.id);
	}

	var params = { '_id': _id };
	database.collection(shops_collection).find(params).toArray(function (err, docs) {
		if (!err) {
			logger.info('Searching, query params is: ' + JSON.stringify(params));
			if (docs.length === 1) {
				var resource = new hal.Resource(docs[0], '/api/shops/' + docs[0]._id);
				res.json(resource);
			} else {
				res.json({});
			}
		}
		logger.info('Search successfully, results are: ' + JSON.stringify(docs));
	});
}

module.exports.findShop = {
	'spec': {
		'description': 'Operations about shop',
		'path': '/shops',
		'notes': 'Returns a shop info',
		'summary': 'Find shop by info',
		'method': 'GET',
		'parameters': [
			swagger.queryParam('shopname', 'shopname of a shop', 'string'),
			swagger.queryParam('boss', 'boss of a shop', 'string'),
			swagger.queryParam('goods', 'goods of a shop', 'string')],
		'type': 'Shop',
		'nickname': 'findShopHandler'
	},
	'action': findShopHandler
};

module.exports.findShopById = {
	'spec': {
		'description': 'Operations about user',
		'path': '/shops/{id}',
		'notes': 'Returns a shop info',
		'summary': 'Find shop by info',
		'method': 'GET',
		'parameters': [
			swagger.pathParam('id', 'ObjectID of a shop', 'string')],
		'type': 'Shop',
		'nickname': 'findShopByIdHandler'
	},
	'action': findShopByIdHandler
};
