'use strict';

var nconf = require('nconf'),
    path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express'),
    swagger = require('swagger-node-express');


var user = require('./controller/user.js');
var userAnaly = require('./controller/userAnaly.js');
var userChange = require('./controller/userChange.js');
var authority = require('./controller/authority.js');



// init config
var configPath = path.resolve(__dirname + '/config/globalConfig.json');
nconf.file('Base', { file: configPath });


var app = module.exports = express();
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({
    extended: true
}));

swagger.setAppHandler(app);

swagger.configureSwaggerPaths('', '/api-docs/user', '');
swagger.setHeaders = function setHeaders(res) {
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-API-KEY');
    res.header('Content-Type', 'application/json; charset=utf-8');
};




module.exports.initalize = function(callback) {
    swagger
        .addGet(user.findUser)
        .addGet(user.findUserById)
        .addPost(userChange.changeUserByUsername)
        .addGet(userAnaly.findUserByUsername)
        .addGet(authority.findUserByUsername);
    callback(swagger);
};