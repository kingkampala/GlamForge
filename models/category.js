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
  subcategory: {
    type: [String]
  }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;