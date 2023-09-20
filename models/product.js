const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        default:0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        max: 500
    },
    rating: {
        type: Number,
        default: 0
    },
    reviewsNum: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;