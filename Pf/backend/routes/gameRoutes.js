const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Get games
router.get('/games', async (req, res) => {
  const games = await prisma.game.findMany();
  res.json(games);
});

// Get promoted games
router.get('/promotions', async (req, res) => {
  const games = await prisma.game.findMany({ where: { promotion: true } });
  res.json(games);
});

// Get games by genre
router.get('/games/:genre', async (req, res) => {
  const { genre } = req.params;
  const games = await prisma.game.findMany({ where: { genre } });
  res.json(games);
});

module.exports = router;
