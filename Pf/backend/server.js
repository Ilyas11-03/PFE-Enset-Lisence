const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Route to handle the "Add to Cart" button click
app.post('/add-to-cart', (req, res) => {
    const { title, price, quantity } = req.body;
    console.log(`Item: ${title}, Price: ${price}, Quantity: ${quantity}`);
    res.json({ message: 'Item added to cart successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
