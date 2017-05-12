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


function changeUserByUsernameHandler(req, res) {
    logger.info('handling by changeUserByUsernameHandler');

    var database = req.database;
    var username = req.params.username;
    var params = {};
    if (req.body.sex) {
        params.sex = req.body.sex;
    }
    if (req.body.age) {
        params.age = req.body.age;
    }
    if (req.body.email) {
        params.email = req.body.email;
    }
    database.collection(users_collection).update({ 'username': username }, { $set: params }, function(err) {
        if (!err) {
            logger.info('post data successfully');
            res.json({});
        }
    });
}

module.exports.changeUserByUsername = {
    'spec': {
        'description': 'Operations about user',
        'path': '/userChange/{username}',
        'notes': 'Returns a user info',
        'summary': 'post user by username',
        'httpMethod': 'POST',
        'method': 'POST',
        'parameters': [
            swagger.pathParam('username', 'username of a user', 'string')
        ],
        'type': 'User',
        'nickname': 'changeUserByUsernameHandler'
    },
    'action': changeUserByUsernameHandler
};