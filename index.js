const koa = require('koa');

const app = new koa();


app.use(async (ctx)=>{
    ctx.body = 'hallo 玩卡莎的丁师傅'
})


app.listen(3000);