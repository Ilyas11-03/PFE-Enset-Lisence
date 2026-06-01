const express = require('express');
const { PrismaClient } = require('@prisma/client');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Process payment
router.post('/payments', authenticateToken, async (req, res) => {
  const { orderId, paymentMethodId } = req.body;
  const userId = req.user.id;

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true }
    });

    if (order.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100),
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true
    });

    const payment = await prisma.payment.create({
      data: {
        orderId,
        amount: order.totalPrice,
        method: 'stripe',
        status: paymentIntent.status
      }
    });

    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'COMPLETED' }
    });

    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
