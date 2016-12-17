const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memberSchema = new Schema({
  joinedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Member', memberSchema)
