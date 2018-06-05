const Koa = require('koa');

const middleware = require('./middleware');
const mongodb = require('./mongodb');
// 必须在引入路由前创建schema
mongodb.connectDatabase();

const routes = require('./routes');

const app = new Koa();

app.use(middleware());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(8080);
