const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Create order
router.post('/orders', authenticateToken, async (req, res) => {
  const { gameIds } = req.body;
  const userId = req.user.id;

  try {
    const games = await prisma.game.findMany({
      where: {
        id: { in: gameIds }
      }
    });

    const totalPrice = games.reduce((total, game) => total + game.price, 0);

    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        orderItems: {
          create: gameIds.map(gameId => ({ gameId }))
        }
      },
      include: {
        orderItems: true
      }
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
