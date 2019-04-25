const fs = require('fs')
const Router = require('koa-router')
const koa = require('koa')
const router = new Router()

const app = new koa()
// 首页
app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
      ctx.response.status = 200
      ctx.response.body = 'index'
    }
    await next()
})

// 其他页面通过 router 加载
let urls = fs.readdirSync(__dirname + '/urls')
urls.forEach((element) => {
    let module = require(__dirname + '/urls/' + element)
    /*
      urls 下面的每个文件负责一个特定的功能，分开管理
      通过 fs.readdirSync 读取 urls 目录下的所有文件名，挂载到 router 上面
    */
    router.use('/' + element.replace('.js', ''), module.routes(), module.allowedMethods())
})

app.use(router.routes()) //router.routes() 返回一个router的中间件 路由的中间件

app.listen(3000);