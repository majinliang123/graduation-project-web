'use strict';

var swagger = require('swagger-node-express'),
    nconf = require('nconf'),
    path = require('path'),
    winston = require('winston');

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


function findByUsernameHandler(req, res) {
    logger.info('handling by findByUsername');
    var database = req.database;
    var esClient = req.esClient;
    var query = {};

    if (req.params.username) {
        query.userName = req.params.username;
    }

    esClient.search({
        q: '1'
    }).then(function (body) {
        var hits = body.hits.hits;
        console.log(hits);
    }, function (error) {
        console.trace(error.message);
    });

    database.collection(users_collection).find(query).toArray(function (err, docs) {
        if (!err) {
            logger.info('Searching, query params is: ' + JSON.stringify(query));
            res.json(docs);
            logger.info('Search successfully, results are: ' + JSON.stringify(docs));
        }
    });
}

module.exports.findByUsername = {
    'spec': {
        'description': 'Operations about pets',
        'path': '/username/{username}',
        'notes': 'Returns a user info',
        'summary': 'Find user by username',
        'method': 'GET',
        'parameters': [swagger.pathParam('username', 'Iusername of a user', 'string')],
        'type': 'User',
        'nickname': 'findByUsername'
    },
    'action': findByUsernameHandler
};