const {Product} = require('../models/product');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    try {
        const Product = mongoose.model('Product');
    
        const product = new Product({
            name: req.body.name,
            brand: req.body.brand,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            quantity: req.body.quantity,
            rating: req.body.rating,
            reviewsNum: req.body.reviewsNum,
            featured: req.body.featured,
            dateCreated: req.body.dateCreated
        });
    
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: 'could not create product', details: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const Product = mongoose.model('Product');

        const products = await Product.find();
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: 'could not retrieve products', details: error.message });
      }
});

router.get('/total', async (req, res) => {
    try {
        const Product = mongoose.model('Product');
        
        const totalProducts = await Product.countDocuments();
        res.status(201).json(totalProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'server error, cannot get total products.', details: error.message });
    }
});

router.get('/total-featured', async (req, res) => {
    try {
        const Product = mongoose.model('Product');

        const totalFeaturedProducts = await Product.countDocuments({ featured: true });
        res.json({ totalFeaturedProducts });
    } catch (error) {
        res.status(500).json({ error: 'could not get the total featured products', details: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const Product = mongoose.model('Product');

        const product = await Product.findById(productId);
        res.json(product);
      } catch (error) {
        res.status(500).json({ error: 'could not retrieve product', details: error.message });
      }
});

router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;

    ({
            name: req.body.name,
            brand: req.body.brand,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            quantity: req.body.quantity,
            rating: req.body.rating,
            reviewsNum: req.body.reviewsNum,
            featured: req.body.featured,
            dateCreated: req.body.dateCreated
    });

    try {
        const Product = mongoose.model('Product');

        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true, });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'could not update product', details: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const Product = mongoose.model('Product');

        await Product.findByIdAndRemove(productId);
        res.json({ message: 'product deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'could not delete product', details: error.message });
      }
});

module.exports = router;