const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  colour: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;