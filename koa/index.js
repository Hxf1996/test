const Koa = require('koa');

const middleware = require('./middleware');
const routes = require('./routes');
const mongodb = require('./mongodb');

mongodb();

const app = new Koa();

app.use(middleware());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(8080);
