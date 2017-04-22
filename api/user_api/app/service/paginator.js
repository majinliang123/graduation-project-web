'use strict';

var extend = require('util')._extend,
	ObjectID = require('mongodb').ObjectID;

function getPaginatedById(database, params, callback) {

	var query = {};

	var pageSize = params.pageSize;
	var lastId = params.lastId;
	var returnField = params.returnField;
	var collection = params.collection;

	if (lastId) {
		query = extend(query, { '_id': { $lt: new ObjectID(lastId) } });
	}
	if (params.query) {
		query = extend(query, params.query);
	}

	database.collection(collection).find(query, returnField).limit(pageSize).sort({ '_id': -1 }).toArray(function (err, docs) {
		if (!err) {
			callback(null, docs);
		} else {
			callback(err);
		}
	});
}


module.exports.getPaginatedById = getPaginatedById;
