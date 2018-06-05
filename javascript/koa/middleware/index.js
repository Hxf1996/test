const compose = require('koa-compose');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const error = require('koa-json-error');

module.exports = function middleware() {
    return compose([
        cors({
            origin: '*',
            allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
        }),
        bodyParser(),
        error(),
    ]);
}
