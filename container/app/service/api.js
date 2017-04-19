'use strict';

var express = require('express'),
    bodyParser = require('body-parser');




module.exports = function(apis){
    var app = module.exports = express();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use('/docs', express.static(__dirname+'/../lib/swagger-ui'));
    apis.forEach(function(manifest){
        var apiModule = require(manifest.resolvedPath + '/' + manifest.main);
        if(apiModule.initalize){
            apiModule.initalize(function(swagger){
                swagger.configure('/', '0.1');
            });
            app.use(apiModule);
        }
        
    });
    return app;
};