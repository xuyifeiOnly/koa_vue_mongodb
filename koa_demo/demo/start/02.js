/**
 * async await 中间件开发和只能在koa v2中使用
 *  */ 

const Koa = require('koa') // koa v2
const loggerAsync  = require('../middleware/logger-async')
const app = new Koa()

app.use(loggerAsync())

app.use(( ctx ) => {
    ctx.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')