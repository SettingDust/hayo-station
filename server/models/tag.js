const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
  title: {type: String, required: true, unique: true, minlength: 1, maxlength: 20},
  createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Tag', tagSchema)
