var express = require("express"),
    nconf = require("nconf"),
    path = require("path"),
    winston = require("winston");

// init some configs
var configPath = path.resolve(__dirname + '/config/globalConfig.json');
nconf.file('Base', { file: configPath });
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: nconf.get('logging:file:path') })
    ]
});


var app = express();
app.use(express.static(__dirname));



module.exports = app;
