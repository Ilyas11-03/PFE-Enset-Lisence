const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE5MzM5OTM2fQ.-2eIr93vj8Lr2t24bN_ylf9Rh878Yd51XZOQ7VWQokY';

// User registration
router.post('/signup', async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.header('Authorization', token).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
