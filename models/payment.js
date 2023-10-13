const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    chargeId: String,
    amount: Number,
    receipt_email: String,
    currency: String,
    paid: Boolean,
    status: String,
    source: String,
    receiptUrl: String,
    created: Date
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;