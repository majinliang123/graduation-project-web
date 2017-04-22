'use strict';

var swagger = require('swagger-node-express'),
	nconf = require('nconf'),
	path = require('path'),
	hal = require('hal'),
	winston = require('winston');

var paginator = require('../service/paginator.js');

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
	var params = {};
	var pageSize = 100;

	if (req.query.shopname) {
		query.shopname = req.query.shopname;
	}
	if (req.query.boss) {
		query.boss = req.query.boss;
	}
	if (req.query.goods) {
		query.goods = req.query.goods;
	}

	if (req.query.lastId) {
		params.lastId = req.query.lastId;
	}

	params.returnField = {};
	params.collection = shops_collection;
	params.pageSize = pageSize;
	params.query = query;

	paginator.getPaginatedById(database, params, function (err, docs) {
		if (!err) {
			logger.info('Searching, query params is: ' + JSON.stringify(params));
			if (docs.length > 0) {
				var resource = new hal.Resource({ 'pageSize': pageSize }, 'shops?firstId=' + docs[0]._id);
				resource.link('Next', 'api/shops?lastId=' + docs[docs.length - 1]._id);
				resource.embed('shops', docs);
				res.json(resource);
			}else{
				res.json({});
			}

			logger.info('Search successfully, results are: ' + JSON.stringify(docs));
		}
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
