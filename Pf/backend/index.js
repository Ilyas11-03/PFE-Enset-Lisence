const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/user', userRoutes);
app.use('/game', gameRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/payment', paymentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
