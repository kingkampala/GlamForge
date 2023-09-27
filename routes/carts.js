const {Cart} = require('../models/cart');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    const cartId = req.user.id;
    try {
        const Cart = mongoose.model('Cart');

        const cart = new Cart({
            product: req.body.product,
            quantity: req.body.quantity
        })
        const carts = await cart.findById(cartId);

        const existingCartItem = user.cart.find(item => item.product.toString() === product);
        if (existingCartItem) {
            existingCartItem.quantity += quantity || 1;
        } else {
            user.cart.push({ product: product, quantity: quantity || 1 });
        }

        await carts.save();
        res.json(carts.cart);
    } catch {
        res.status(500).json({ error: 'unable to add to cart', details: error.message });
    }
});

module.exports = router;