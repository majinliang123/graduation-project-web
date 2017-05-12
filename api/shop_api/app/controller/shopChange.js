'use strict';

var swagger = require('swagger-node-express'),
    nconf = require('nconf'),
    path = require('path'),
    winston = require('winston');

// init config
var configPath = path.resolve(__dirname + '/../config/globalConfig.json');
nconf.file('Base', { file: configPath });
var users_collection = nconf.get('collectoin');
var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({ filename: nconf.get('logging:file:path') })
    ]
});


function changeShopByShopnameHandler(req, res) {
    logger.info('handling by changeShopByShopnameHandler');

    var database = req.database;
    var shopname = req.params.shopname;
    var params = {};
    if (req.body.boss) {
        params.boss = req.body.boss;
    }

    database.collection(users_collection).update({ 'shopname': shopname }, { $set: params }, function(err) {
        if (!err) {
            logger.info('post data successfully');
            res.json({});
        }
    });
}

module.exports.changeShopByShopname = {
    'spec': {
        'description': 'Operations about user',
        'path': '/shopChange/{shopname}',
        'notes': 'Returns a shop info',
        'summary': 'post shop by shopname',
        'httpMethod': 'POST',
        'method': 'POST',
        'parameters': [
            swagger.pathParam('shopname', 'shopname of a shop', 'string')
        ],
        'type': 'Shop',
        'nickname': 'changeShopByShopnameHandler'
    },
    'action': changeShopByShopnameHandler
};