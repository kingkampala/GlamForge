const Cart = require('../models/cart');
const express = require('express');
const router = express.Router();
const verifyToken = require('../wares/verify');

router.post('/', verifyToken, async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    if (!userId) {
        //return res.status(500).json({ error: 'user information not found in request' });
    }
    
    const { product, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, cartItems: [] });
            await cart.save();
        }

        cart.cartItems = cart.cartItems || [];
        
        const existingCartItem = cart.cartItems.find(item => item.product.toString() === product);
        if (existingCartItem) {
            existingCartItem.quantity += quantity || 1;
        } else {
            cart.cartItems.push({ product, quantity: quantity || 1 });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'cannot add to cart', details: error.message });
    }
});

router.get('/', verifyToken, async (req, res) => {
    const userId = req.user ? req.user.userId : null;
  
    try {
      const cart = await Cart.findOne({ user: userId });
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'cannot retrieve cart', details: error.message });
    }
});

router.get('/total', verifyToken, async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    if (!userId) {
        //return res.status(500).json({ error: 'user information not found in request' });
    }

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ error: 'cart not found' });
        }

        let total = 0;
        if (cart.cartItems && Array.isArray(cart.cartItems)) {
            for (const item of cart.cartItems) {
                total += item.quantity * item.product.price;
            }
        }

        res.json({ total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'unable to calculate total', details: error.message });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const productIdToRemove = req.params.productId;
  
    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ error: 'cart not found for this user' });
      }

      cart.cartItems = cart.cartItems || [];
  
      const updatedCartItems = cart.cartItems.filter(item => item.product.toString() !== productIdToRemove);
  
      cart.cartItems = updatedCartItems;
      await cart.save();
  
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'cannot remove item from cart', details: error.message });
    }
});

router.delete('/clear', verifyToken, async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    if (!userId) {
        //return res.status(500).json({ error: 'user information not found in request' });
    }

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ error: 'cart not found' });
        }

        cart.cartItems = [];
        await cart.save();

        res.json({ message: 'cart cleared successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'unable to clear cart', details: error.message });
    }
});

module.exports = router;