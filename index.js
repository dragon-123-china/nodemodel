const koa = require('koa');

const app = new koa();


app.use(async (ctx)=>{
    ctx.body = 'hallo'
})


app.listen(3000);