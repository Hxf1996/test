const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require('../config/mongodb.config')

require('./mongodb/schema/info');

module.exports.connectDatabase = function(uri) {
    return new Promise((resolve, reject) => {
        mongoose.connection
            .on('error', error => reject(error))
            .on('close', () => console.log('Database connection closed.'))
            .once('open', () => resolve(mongoose.connections[0]));

        mongoose.connect(uri || config.dbPath, {
            useMongoClient: true
        });
    }).catch((error) => {
        console.log('Promise error', error);
    });
}
