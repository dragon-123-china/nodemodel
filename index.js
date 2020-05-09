const koa = require('koa');
const Router = require('koa-router');

const app = new koa();
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'hello 卡莎丁'
})
app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000);