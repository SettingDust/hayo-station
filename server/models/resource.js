const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const resourceSchema = new Schema({
  title: {type: String, required: true, maxlength: [50, '标题不能超过50个字符。']},
  content: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  author: {type: ObjectId, ref: 'User'},
  category: {type: ObjectId, ref: 'Category'},
  tags: [{type: ObjectId, ref: 'Tag'}]
})

module.exports = mongoose.model('Resource', resourceSchema)
