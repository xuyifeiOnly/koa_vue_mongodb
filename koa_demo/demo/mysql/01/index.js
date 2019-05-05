const Koa = require('koa')
const app = new Koa()


const { query } = require('./query')
async function selectAllData( ) {
  let sql = 'SELECT * FROM nideshop_collect' // 查询某个表的所有数据
  let dataList = await query( sql )
  return dataList
}

async function getData() {
  let dataList = await selectAllData()
  return dataList
}






app.use( async ( ctx ) => {
  let data = await getData()
  ctx.body = {
    data,
  }
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')