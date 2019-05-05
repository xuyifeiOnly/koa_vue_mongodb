const router = require('koa-router')()
const path = require('path')
const fs = require('fs')


/**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}      
 */
// function render( page ) {
//   return new Promise(( resolve, reject ) => {
//     let viewUrl = `./view/${page}`
//     fs.readFile(viewUrl, "binary", ( err, data ) => {
//       if ( err ) {
//         reject( err )
//       } else {
//         resolve( data )
//       }
//     })
//   })
// }

// 读取文件夹目录
const dirList = fs.readdirSync(path.join(__dirname,'./router'))
dirList.forEach((item) => {
  let name = item.split('.')[0]
  const route = require(path.join(__dirname,'./router/'+name))
  router.use(`/${name}`, route.routes(), route.allowedMethods())
})


// const home = require('./router/home')
// console.log(home)
// const api = require('./router/api')
// const page = require('./router/page')

// router.use('/', home.routes(), home.allowedMethods())
// router.use('/api', api.routes(), api.allowedMethods())
// router.use('/page', page.routes(), page.allowedMethods())

module.exports = router
