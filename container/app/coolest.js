var express = require("express"),
    nconf = require("nconf"),
    path = require("path"),
    bodyParser = require("body-parser"),
    winston = require("winston"),
    fs = require('fs'),
    session = require('express-session'),
    favicon = require('serve-favicon'),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    glob = require("glob"),
    Q = require('q'),
    elasticsearch = require('elasticsearch'),
    MongoClient = require('mongodb').MongoClient;


var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// init some configs
var configPath = path.resolve(__dirname + '/config/globalConfig.json');
nconf.file('Base', { file: configPath });
var port = nconf.get('port');
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: nconf.get('logging:file:path') })
    ]
});
var mongoDBUrl = nconf.get('mongoDBUrl');
var elasticSearchUrl = nconf.get('elasticSearchUrl');
var database = {};
var esClient;


logger.info('coolest is starting.');
connectToDB()
    .then(connectToES)
    .then(function () {
        app.use('*', function (req, res, next) {
            logger.info('Request method is: ' + req.method + ' . Url is: ' + req.originalUrl);
            req.database = database;
            req.esClient = esClient;
            next();
        });


        // session authorization
        /*
        app.use(session({
            secret: '12345',
            name: 'testapp',
            cookie: { maxAge: 80000 },
            resave: false,
            saveUninitialized: true,
        }));
        app.use(function (req, res, next) {
            logger.info('check if authorization');
            if (!req.session.user) {
                if (req.originalUrl == "/login") {
                    next();
                }
                else {
                    res.redirect('/login.html');
                }
            } else if (req.session.user) {
                next();
            }
        });

        app.post('/login', function (req, res) {
            if (true) {
                logger.info("login succeeds, will redirect to /");
                logger.info("user name is: " + req.body.username);
                var user = { 'username': 'love' };
                req.session.user = user;
                res.redirect('/index.html');
            }
            else {
                logger.info("login failed, will redirect to /login");
                res.redirect('/login.html');
            }
    });*/


        // init and run GUI
        if (nconf.get('guiPath')) {
            var gui = require(path.resolve(__dirname + '/' + nconf.get('guiPath') + '/gui.js'));
            if (gui) {
                logger.info('GUI is starting');
                app.use(gui);
            } else {
                logger.error('Can\'t discover GUI');
            }
        }


        // init and run apis
        logger.info('Apis is starting');
        var apiList = [];
        glob(__dirname + '/' + nconf.get('apiPath') + '/*/manifest.json', function (err, files) {
            if (err) {
                logger.error('No Api directory');
                return;
            }
            files.forEach(function (filePath) {
                var manifest = JSON.parse(fs.readFileSync(filePath));
                var resolvedPath;
                if (manifest) {
                    resolvePath = filePath.substring(0, filePath.lastIndexOf('/'));
                    manifest.resolvedPath = resolvePath;
                    apiList.push(manifest);
                    logger.info('Discovered API: ' + manifest.name);
                }
            });
            app.use('/api', require('./service/api.js')(apiList));
        });



        app.listen(port, function () {
            logger.info('coolest is started.');
            logger.info('coolest is listening at: ' + port);
        });

    }).
    fail(function (err) {
        ogger.info('Error initializing Coolest');
    });


function connectToDB() {
    var deferred = Q.defer();
    MongoClient.connect(mongoDBUrl, function (err, db) {
        if (!err) {
            logger.info("Connected successfully to mongodb: " + mongoDBUrl);
            database = db;
            deferred.resolve();
        } else {
            logger.error("Connected failed to mongodb: " + mongoDBUrl);
            deferred.reject("Connected failed to mongodb: " + mongoDBUrl);
        }
    });
    return deferred.promise;
}


function connectToES() {
    var deferred = Q.defer();
    esClient = new elasticsearch.Client({
        host: elasticSearchUrl
    });
    esClient.ping({
        requestTimeout: 1000
    }, function (error) {
        if (error) {
            logger.error('Connected failed to ElasticSearch: ' + elasticSearchUrl);
            deferred.reject('Connect failed to ElasticSearch: ' + elasticSearchUrl);

        } else {
            logger.info('Connected successfully to ElasticSearch: ' + elasticSearchUrl);
            deferred.resolve();
        }
    });
    return deferred.promise;
}