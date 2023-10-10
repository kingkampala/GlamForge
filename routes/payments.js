const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const Payment = require('../models/payment');

router.post('/', async (req, res) => {
  const { amount, receipt_email, source, currency } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount,
      currency,
      source,
      receipt_email
    });

    const payment = new Payment({
      chargeId: charge.id,
      amount: charge.amount,
      currency: charge.currency,
      paid: charge.status === 'succeeded',
      status: charge.status,
      source: JSON.stringify(charge.source),
      receiptUrl: charge.receipt_url,
      created: new Date(charge.created * 1000),
    });

    await payment.save();

    res.json({ success: true, charge });
  } catch (error) {
    console.error('payment failed:', error);
    res.json({ success: false, error: error.message });
  }
});

module.exports = router;