const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {type: String, required: true, unique: true, match: [/^[0-9a-zA-Z-_]{3, 18}$/, '用户名必须要由3到18个数字、字母、横杠、下划线组成。']},
  password: {type: String, required: true, minlength: 6, maxlength: 20},
  createdAt: {type: Date, default: Date.now},
  lastLoginedAt: {type: Date}
})

module.exports = mongoose.model('User', userSchema)
