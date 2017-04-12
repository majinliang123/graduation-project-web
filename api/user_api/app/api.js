var nconf = require("nconf"),
  path = require("path"),
  winston = require("winston"),
  bodyParser = require("body-parser"),
  express = require("express"),
  url = require("url"),
  swagger = require("swagger-node-express");



// init config
var configPath = path.resolve(__dirname + '/config/globalConfig.json');
nconf.file('Base', { file: configPath });
var users_collection = nconf.get('collectoin');
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: nconf.get('logging:file:path') })
  ]
});


var app = module.exports = express();
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({
  extended: true
}));

swagger.setAppHandler(app);

swagger.configureSwaggerPaths("", "/api-docs", "");
swagger.setHeaders = function setHeaders(res) {
  res.header("Access-Control-Allow-Headers", "Content-Type, X-API-KEY");
  res.header("Content-Type", "application/json; charset=utf-8");
};

var findById = {
  'spec': {
    "description": "Operations about pets",
    "path": "/pet/{petId}",
    "notes": "Returns a pet based on ID",
    "summary": "Find pet by ID",
    "method": "GET",
    "parameters": [swagger.pathParam("petId", "ID of pet that needs to be fetched", "string")],
    "type": "Pet",
    "errorResponses": [swagger.errors.invalid('id'), swagger.errors.notFound('pet')],
    "nickname": "getPetById"
  },
  'action': function (req, res) {
    res.send(JSON.stringify(req.params.petId));
  }
};


module.exports.initalize = function (callback) {
  swagger.configure("/api11/", "0.2");
  swagger.addGet(findById);
}
