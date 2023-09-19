const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    try {
        const Category = mongoose.model('Category');

        const newCategory = new Category({
            name: req.body.name,
            description: req.body.description,
            colour: req.body.colour
      });

        const savedCategory = await newCategory.save();
        res.json(savedCategory);
    } catch (error) {
        res.status(500).json({ error: 'cannot create category', details: error.message });
    }
});

router.get('/', async (req, res) => {
    try{
        const Category = mongoose.model('Category');

        const category = await Category.find();
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'cannot get category', details: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try{
        const Category = mongoose.model('Category');

        const category = await Category.findById(userId);
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'category not found', details: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;

    ({
            name: req.body.name,
            description: req.body.description,
            colour: req.body.colour
    })
    try{
        const Category = mongoose.model('Category');

        const category = await Category.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!category) {
            return res.status(404).json({ error: 'category not found' });
          }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'server error, category not found', details: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try{
        const Category = mongoose.model('Category');

        const category = await Category.findByIdAndDelete(userId);
        console.log('category deleted successfully');
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'internal server error', details: error.message });
    }
});

  module.exports = router;