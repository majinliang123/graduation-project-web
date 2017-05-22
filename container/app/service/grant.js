'use strict';

function grant(database, username, password, grantCollection) {
    return new Promise(function(resolve, reject) {
        database.collection(grantCollection).find({ 'username': username, 'password': password }).toArray(function(err, docs) {
            if (!err) {
                if (docs.length > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } else {
                reject(err);
            }
        });
    });
}

module.exports.grant = grant;