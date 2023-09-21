const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    shippingAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;