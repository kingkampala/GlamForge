const Category = require('../models/category');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newCategory = new Category({
            name: req.body.name,
            description: req.body.description,
            subcategory: req.body.subcategory
      });

        const savedCategory = await newCategory.save();
        res.json(savedCategory);
    } catch (error) {
        res.status(500).json({ error: 'cannot create category', details: error.message });
    }
});

router.get('/', async (req, res) => {
    try{
        const category = await Category.find();
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'cannot get category', details: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const categoryId = req.params.id;
    try{
        const category = await Category.findById(categoryId);
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'category not found', details: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const categoryId = req.params.id;
    const updatedData = req.body;

    ({
            name: req.body.name,
            description: req.body.description,
            subcategory: req.body.subcategory
    })
    try{
        const category = await Category.findByIdAndUpdate(categoryId, updatedData, { new: true });

        if (!category) {
            return res.status(404).json({ error: 'category not found' });
          }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'server error, category not found', details: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const categoryId = req.params.id;
    try{
        const category = await Category.findByIdAndDelete(categoryId);
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'internal server error', details: error.message });
    }
});

module.exports = router;