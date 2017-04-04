var express = require("express"),
    nconf = require("nconf"),
    path = require("path"),
    winston = require("winston"),
    bodyParser = require("body-parser");

// init some configs
var configPath = path.resolve(__dirname + '/config/globalConfig.json');
nconf.file('Base', { file: configPath });
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: nconf.get('logging:file:path'), })
    ]
});

logger.info('GUI is starting');
var app = express();
app.use(express.static(__dirname));

app.get('/login', function (req, res) {
    logger.info('Request method is: ' + req.method + ' . Url is: ' + req.path);
    res.sendFile(__dirname + "/" + "login.html");
});
app.all('*', function (req, res) {
    logger.info('Request method is: ' + req.method + ' . Url is: ' + req.path);
    res.sendFile(__dirname + "/" + "index.html");
});


module.exports = function (port) {
    app.listen(port, function () {
        logger.info('gui is started.');
        logger.info('gui is listening at: ' + port);
    });
};
