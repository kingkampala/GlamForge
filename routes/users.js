const { User } = require('../models/user');
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const User = mongoose.model('User');
        
        const users = await User.find().select('-passwordHash -secret');
        res.json(users);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'server error, cannot fetch user.', details: error.message });
    }
})

router.post('/', async (req, res) => {
    try {
        const User = mongoose.model('User');

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            passwordHash: bcrypt.hashSync(req.body.password, 12),
            secret: req.body.secret,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            address: req.body.address,
            city: req.body.city,
            country: req.body.country
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'server error, cannot create user.', details: error.message });
    }
});

module.exports = router;