const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;