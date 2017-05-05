'use strict';

var Q = require('q');


function grant(database, username, password, grantCollection) {
    var deferred = Q.defer();

    database.collection(grantCollection).find({ 'username': username, 'password': password }).toArray(function (err, docs) {
        if (!err) {
            if (docs.length > 0) {
                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }
        } else {
            deferred.reject(err);
        }
    });
    return deferred.promise;
}

module.exports.grant = grant;