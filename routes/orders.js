const Order = require('../models/order');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const userId = req.user._id;

        const { orderItems, shippingAddress, city, country, phone, totalAmount, currency, paymentMethod } = req.body;

        const order = new Order({
            orderItems,
            shippingAddress,
            city,
            country,
            phone,
            status: req.body.status,
            totalAmount,
            currency,
            paymentMethod,
            user: userId,
            createdAt: req.body.createdAt
        });
    
        const savedOrder = await order.save();
        res.json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: 'unable to create order', details: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'unable to retrieve orders', details: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const orderId = req.params.id;
    
    try {
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ error: 'order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'unable to retrieve order', details: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const orderId = req.params.id;
    const updatedData = req.body;

    ({
            user: req.body.user,
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            city: req.body.city,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalAmount: req.body.totalAmount,
            paymentMethod: req.body.paymentMethod,
            createdAt: req.body.createdAt
    });

    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedData, { new: true, });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: 'unable to update order', details: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const orderId = req.params.id;

    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) return res.status(404).json({ error: 'order not found' });
        res.json(deletedOrder);
    } catch (error) {
        res.status(500).json({ error: 'unable to delete order', details: error.message });
    }
});

module.exports = router;