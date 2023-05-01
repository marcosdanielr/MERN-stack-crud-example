const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String
})

const Person = mongoose.model('Person', schema)

module.exports = Person
