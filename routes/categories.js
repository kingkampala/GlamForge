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

  module.exports = router;