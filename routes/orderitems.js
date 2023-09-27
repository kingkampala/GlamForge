const Orderitem = require('../models/orderitem');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const orderitem = new Orderitem({ 
          product: req.body.product,
          quantity: req.body.quantity
        });
        const savedOrderItem = await orderitem.save();
        res.json(savedOrderItem);
    } catch (error) {
        res.status(500).json({ error: 'could not create order item', details: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const orderitems = await Orderitem.find();
        res.json(orderitems);
    } catch (error) {
        res.status(500).json({ error: 'could not retrieve order items', details: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const orderitemId = req.params.id;
    try {
        const orderitem = await Orderitem.findById(orderitemId);
        if (!orderitem) return res.status(404).json({ error: 'order item not found' });
        res.json(orderitem);
    } catch (error) {
        res.status(500).json({ error: 'could not retrieve order item', details: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const orderitemId = req.params.id;
    const updatedData = req.body;

    ({
          product: req.body.product,
          quantity: req.body.quantity
    })
    try {
        const updatedOrderItem = await Orderitem.findByIdAndUpdate(orderitemId, updatedData, { new: true });
        res.json(updatedOrderItem);
    } catch (error) {
        res.status(500).json({ error: 'could not update order item', details: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const orderitemId = req.params.id;

    try {
        await Orderitem.findByIdAndDelete(orderitemId);
        res.json({ message: 'order item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'could not delete order item', details: error.message });
    }
});

module.exports = router;