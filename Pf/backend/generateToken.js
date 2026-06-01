const jwt = require('jsonwebtoken');
const JWT_SECRET = '6f82cde523f5e5f3ddd91c59cc2355ec58494146b13de930cd9e1798b78a8530d0dee9e966bb1564b4f6bccba875b5a3360d2e19b92bac42751532985051ec20';

// Replace 'your_user_id' with the actual user ID you want to generate a token for
const userId = 1; // Example user ID

const token = jwt.sign({ id: userId }, JWT_SECRET);
console.log('Generated Token:', token);
