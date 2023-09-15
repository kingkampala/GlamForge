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
        res.status(201).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'server error, cannot fetch user.', details: error.message });
    }
})

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const User = mongoose.model('User');

        const users = await User.findById(userId).select('-passwordHash -secret');
        res.status(201).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'server error, user not found.', details: error.message });
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
        console.error(error);
        res.status(500).json({ error: 'server error, cannot create user.', details: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;

    ({
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
    });

    //checks if user provided a new passsword
    if(updatedData.password){
        updatedData.passwordHash = bcrypt.hashSync(updatedData.password, 12);
    } else{
        delete updatedData.password;
    }

    try {
        const User = mongoose.model('User');

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
          }
        res.status(201).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal server error', details: error.message });
    }
});

module.exports = router;