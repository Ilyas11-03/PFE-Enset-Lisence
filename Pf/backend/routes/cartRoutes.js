const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Add to cart
router.post('/cart', authenticateToken, async (req, res) => {
  console.log('Request Headers:', req.headers); // Log request headers
  console.log('Authenticated User ID:', req.user.id); // Log authenticated user ID

  const { gameId } = req.body;
  const userId = req.user.id;
 


  try {
    const cartItem = await prisma.cart.create({
      data: {
        userId,
        gameId
      }
    });
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
