const Router = require('koa-router');

const { saveInfo } = require('../controlers/info')
const router = new Router();

router.get('/', async (ctx, next) => {
    ctx.body = {
        message: 'Hi there. ' + process.env.npm_package_version,
    };
});

router.post('/saveinfo', saveInfo)

module.exports = router;
