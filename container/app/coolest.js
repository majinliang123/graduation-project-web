var express = require("express"),
    nconf = require("nconf"),
    path = require("path"),
    bodyParser = require("body-parser"),
    winston = require("winston"),
    fs = require('fs'),
    glob = require("glob");

var app = express();

// init some configs
var configPath = path.resolve(__dirname + '/config/globalConfig.json');
nconf.file('Base', { file: configPath });
var port = nconf.get('port');
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: nconf.get('logging:file:path'), })
    ]
});

// load and init gui
function getGui() {
    if (nconf.get('guiPath')) {
        var gui = require(path.resolve(__dirname + '/' + nconf.get('guiPath') + '/gui.js'));
        if (gui) {
            gui(8082);
            logger.info('Discovered GUI');
        } else {
            logger.error('Can\'t discover GUI');
        }
    }
};

// load and init apis
function getApis() {
    logger.info('Starting Apis');
    var apiList = [];
    glob(__dirname + '/' + nconf.get('apiPath') + '/*/manifest.json', function (err, files) {
        if (err) {
            logger.error('No API directory');
            return;
        }

        files.forEach(function (filePath) {
            var manifest = JSON.parse(fs.readFileSync(filePath));
            var resolvedPath;

            if (manifest) {
                resolvedPath = filePath.substring(0, filePath.lastIndexOf('/'));
                manifest.resolvedPath = resolvedPath;
                apiList.push(manifest);
                logger.info('Discovered API: ' + manifest.name);
            }
        });
    });
    require('./service/api.js')(apiList);
}

function start(){
     getGui();
}

start();