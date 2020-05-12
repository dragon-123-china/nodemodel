const koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const path = require('path');
const bodyParser = require('koa-bodyparser')
const Db = require('./module/db')

const app = new koa();
const router = new Router();

render(app, {
    root: path.join(__dirname, 'view'),   // 视图的位置
    extname: '.html',  // 后缀名
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
});

router.get('/', async (ctx) => {
    await ctx.render('index')
})

router.get('/edit', async (ctx) => {
    let data = await Db.find('img',{})
    await ctx.render('edit',{list: data})
})

router.get('/getImg', async (ctx) => {
    let data = await Db.find('img',{})
    let arr = []
    data.forEach((item,key) => {
        let obj = {
            id: key,
            img: item.img
        }
        arr.push(obj)
    })
    ctx.body = arr
})

router.get('/remove', async (ctx) => {
    let id = ctx.query.id
    let data = await Db.remove('img',{'_id':Db.getObjectId(id)})
    try {
        if (data.result.ok) {
            ctx.redirect('/edit')
        }
    } catch (e) {
        console.log(e)
        return
    }
})

router.post('/add', async (ctx) => {
    let img = ctx.request.body
    let result = await Db.insert('img',img)
    try {
        if (result.result.ok) {
            ctx.redirect('/edit')
        }
    } catch (e) {
        console.log(e)
        return
    }
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
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000);