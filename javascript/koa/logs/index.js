const log4js = require('log4js');

const config = require('../config/logs.config');

log4js.configure(config);

module.exports = log4js.getLogger();
