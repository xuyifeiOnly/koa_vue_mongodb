const Koa = require('koa')
var fs = require('fs');
var path = require('path');
const app = new Koa()


function getData(ctx) {
  let res = ctx.res
  let result = {
    success: true,
    message: '',
    data: null
  }
  return new Promise((resolve, reject) => {
    var fileName = path.resolve(__dirname, 'get.txt');
    var stream = fs.createReadStream(fileName);
    let chun = ''
    stream.on('data', (chunk) => {
      chun+=chunk.toString()
    })
    stream.on('end', function() {
      result.data = JSON.parse(chun)
      resolve(result)
    })
    // stream.pipe(res);
    // 将一个可读流通过 pipe 输送给res
  })

}

app.use(async (ctx) => {
  let method = ctx.method
  if (method === 'GET') {
    const result = await getData(ctx)
    ctx.body = result
  }
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')