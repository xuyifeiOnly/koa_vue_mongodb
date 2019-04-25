let Router = require('koa-router');
let config = require('../config/index.js');
module.exports = app => {
  const router = new Router()
  router.get('/wehcat-hear', async (ctx, next) => {
    // const token = config.wechat.token
    // const {
    //   signature,
    //   nonce,
    //   timestamp,
    //   echostr,
    // } = ctx.query
    // const str = [token, timestamp, nonce].sort().join('')
    // const sha = sha1(str)
    // console.log(sha === signature)
    // if (sha === signature) {
    //   ctx.body = echostr
    // } else {
    //   ctx.body = 'Faild'
    // }

    ctx.response.status = 200
    ctx.response.body = 'home-list'
    await next()

  })

  app.use(router.routes())
  app.use(router.allowedMethods())

  // router.get('/user',async (ctx, next) => {
  //   ctx.response.status = 200
  //   ctx.response.body = 'home'
  //   app.use(router.routes())
  //   app.use(router.allowedMethods())
  //   await next()
  // })
}
