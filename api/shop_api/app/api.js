'use strict';

var nconf = require('nconf'),
    path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express'),
    swagger = require('swagger-node-express');


var shop = require('./controller/shop.js');
var shopChange = require('./controller/shopChange.js');



// init config
var configPath = path.resolve(__dirname + '/config/globalConfig.json');
nconf.file('Base', { file: configPath });


var app = module.exports = express();
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({
    extended: true
}));

swagger.setAppHandler(app);

swagger.configureSwaggerPaths('', '/api-docs/shop', '');
swagger.setHeaders = function setHeaders(res) {
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-API-KEY');
    res.header('Content-Type', 'application/json; charset=utf-8');
};




module.exports.initalize = function(callback) {
    swagger
        .addGet(shop.findShop)
        .addGet(shop.findShopById)
        .addPost(shopChange.changeShopByShopname);
    callback(swagger);
};