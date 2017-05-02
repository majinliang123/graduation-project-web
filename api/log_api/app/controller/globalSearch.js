'use strict';

var swagger = require('swagger-node-express'),
    nconf = require('nconf'),
    path = require('path'),
    hal = require('hal'),
    Q = require('q'),
    winston = require('winston');


// init config
var configPath = path.resolve(__dirname + '/../config/globalConfig.json');
nconf.file('Base', { file: configPath });
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: nconf.get('logging:file:path') })
    ]
});

function searchHandler(req, res) {
    logger.info('handling by searchHandler');

    var esClient = req.esClient;
    var item = req.params.item;

    var hits = [];

    var params = {
        'item': item,
        'hits': hits,
        'esClient': esClient
    };
    logger.info('search item is: '+ item);
    userSearch(params).then(shopSearch).then(logSearch)
        .then(function (params) {
            logger.info('search successfully');
            var resource = new hal.Resource({}, '/api/search/' + item);
            resource.embed('hits', params.hits);
            res.json(resource);
        }).fail(function (err) {
            logger.error(err);
        });

}

function userSearch(params) {
    var deferred = Q.defer();

    var item = params.item;
    var hits = params.hits;
    var esClient = params.esClient;

    esClient
        .search({
            index: 'coolest',
            type: 'users',
            q: item
        }).then(function (resp) {
            logger.info('fetch data from es successfully for type user');
            hits = hits.concat(resp.hits.hits);
            var params = {
                'item': item,
                'hits': hits,
                'esClient': esClient
            };
            deferred.resolve(params);
        }, function (err) {
            logger.error('error when search from es in type users');
            deferred.reject(err);
        });
    return deferred.promise;
}

function shopSearch(params) {
    var deferred = Q.defer();

    var item = params.item;
    var hits = params.hits;
    var esClient = params.esClient;

    esClient
        .search({
            index: 'coolest',
            type: 'shops',
            q: item
        }).then(function (resp) {
            logger.info('fetch data from es successfully for type shop');
            hits = hits.concat(resp.hits.hits);
            var params = {
                'item': item,
                'hits': hits,
                'esClient': esClient
            };
            deferred.resolve(params);
        }, function (err) {
            logger.error('error when search from es in type shops');
            deferred.reject(err);
        });
    return deferred.promise;
}

function logSearch(params) {
    var deferred = Q.defer();

    var item = params.item;
    var hits = params.hits;
    var esClient = params.esClient;

    esClient
        .search({
            index: 'coolest',
            type: 'logs',
            q: item
        }).then(function (resp) {
            logger.info('fetch data from es successfully for type log');
            hits = hits.concat(resp.hits.hits);
            var params = {
                'item': item,
                'hits': hits,
                'esClient': esClient
            };
            deferred.resolve(params);
        }, function (err) {
            logger.error('error when search from es in type logs');
            deferred.reject(err);
        });
    return deferred.promise;
}

module.exports.search = {
    'spec': {
        'description': 'Operations about log',
        'path': '/search/{item}',
        'notes': 'Returns a item info',
        'summary': 'Find item by info',
        'method': 'GET',
        'parameters': [
            swagger.pathParam('item', 'item of a document', 'string')],
        'type': 'Log',
        'nickname': 'findLogHandler'
    },
    'action': searchHandler
};
