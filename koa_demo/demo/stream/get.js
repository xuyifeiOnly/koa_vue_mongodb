const Koa = require('koa')
var fs = require('fs');
var path = require('path');
const app = new Koa()


function getData(ctx) {
  let res = ctx.res
  return new Promise((resolve, reject) => {
    var fileName = path.resolve(__dirname, 'get.txt');
    var stream = fs.createReadStream(fileName);
    stream.pipe(res);
    // 将一个可读流通过 pipe 输送给res
  })
    
}

app.use(async (ctx) => {
  let method = ctx.method
  if (method === 'GET') {
    await getData(ctx)
    // ctx.body = data

  }
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')