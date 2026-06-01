const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Use 'authorization' instead of 'Authorization'
  console.log('Authorization Header:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied' });
  }

  const token = authHeader.split(' ')[1]; // Split by space to get the token
  console.log('Extracted Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    console.log('Verified Token:', verified);
    req.user = verified;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
