const Koa = require('koa')
const consola = require('consola')
const R = require('ramda')
const { resolve } = require('path')
const { Nuxt, Builder } = require('nuxt')

const r = path => resolve(__dirname,path)
const router = require('./middlewares/router.js')
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env === 'production')
const MIDDLEWARS = ['router']

class Server{
  constructor(){
    this.app = new Koa()
    router(this.app)
  }

  useMiddleWare(app){
    return R.map(R.compose(
      R.map(i => i(app)),
      require,
      i=> `${r('./middlewares')}/${i}`
    ))
  }

  async start() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)
    const {
      host = process.env.HOST || '127.0.0.1',
      port = process.env.PORT || 3006
    } = nuxt.options.server
    // Build in development
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    } else {
      await nuxt.ready()
    }

    this.app.use(ctx => {
      ctx.status = 200
      ctx.respond = false // Bypass Koa's built-in response handling
      ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
      nuxt.render(ctx.req, ctx.res)
    })

    this.app.listen(port, host)
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  }
}

let app = new Server()

app.start()
