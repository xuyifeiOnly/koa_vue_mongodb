let mongoose = require('mongoose')
mongoose.Promise = global.Promise

// mongoose.set('debug', true) // 顯示日誌
// remove DeprecationWarning
mongoose.set('useFindAndModify', false)

mongoose.connect('mongodb://localhost:27017/example_demo', {
  useCreateIndex: true,
  useNewUrlParser: true,
  promiseLibrary: global.Promise
})
// 连接错误
mongoose.connection.on('error', error => {
  console.log('数据库连接失败!', error)
})
// 连接成功
mongoose.connection.once('open', () => {
  console.log('数据库连接成功!')
})

const UserSchema = new mongoose.Schema({
  name: String,
  times: {
    type: Number,
    default: 0,
  }
})
UserSchema.pre('save', function(next){
  this.times++
  next()
})
UserSchema.statics = { // 在schame实例上添加方法
  async getUser  (name) {
    const user = await this.findOne({
      name,
    })
    return user
  }
}
UserSchema.methods = {  // 这个方法是在查询到的数据实体中可以调用
  async fetchUser  (name) {
    const user = await this.model('User').findOne({
      name,
    })
  }
}


mongoose.model("User", UserSchema)

const User = mongoose.model('User')
//前端页面脚本压缩可减少脚本数量和脚本大小，为了避免压缩时前一个脚本没有写最后一个分号而导致压缩后脚本不能使用，所以要在开始加一个分号
;
(async () => {
  // console.log(await User.find().exec())

  // const user = new User({
  //   name: 'vue'
  // })
  // await user.save() // 这个就表示在之前的文档中又插入一条
  
  // 修改数据
  // const user = await User.findOne({name:'vue'}).exec()
  // user.name = '徐一飞'
  // await user.save()
  console.log(await User.getUser('徐一飞'))

})()