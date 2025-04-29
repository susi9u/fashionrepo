// Import the Express framework
const express = require('express');
// Create an Express application instance
const app = express();
// Define the port the server will listen on
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

// --- Mock Product Data (Replace with Database Later) ---
// In a real application, this data would come from a database (like MongoDB, PostgreSQL, etc.)
const products = [
    {
        id: 'prod_001',
        name: 'Elegant Maxi Dress',
        description: 'A beautiful flowing maxi dress for special occasions.',
        price: 79.99,
        imageUrl: '/images/66c8f9c3bc97e4333e5b5217-frobukio-elegant-women-long-sleeve-maxi.jpg', // Path relative to frontend potentially
        category: 'dresses',
        tags: ['new-arrivals', 'elegant', 'maxi']
    },
    {
        id: 'prod_002',
        name: 'Casual Knit Top',
        description: 'Comfortable and stylish knit top for everyday wear.',
        price: 34.99,
        imageUrl: '/images/placeholder-image.jpg', // Use appropriate image paths
        category: 'tops',
        tags: ['new-arrivals', 'casual', 'knitwear']
    },
    {
        id: 'prod_003',
        name: 'Leather Crossbody Bag',
        description: 'A trendy and practical leather crossbody bag.',
        price: 120.00,
        imageUrl: '/images/placeholder-image.jpg',
        category: 'accessories',
        tags: ['new-arrivals', 'bags', 'leather']
    },
    {
        id: 'prod_004',
        name: 'High-Waisted Jeans',
        description: 'Fashionable high-waisted jeans for a flattering fit.',
        price: 59.99,
        imageUrl: '/images/placeholder-image.jpg',
        category: 'bottoms', // Assuming a category
        tags: ['new-arrivals', 'denim', 'jeans']
    }
    // Add more products as needed
];

// --- Middleware ---
// Enable Express to parse JSON request bodies (useful for POST/PUT requests later)
app.use(express.json());

// Optional: Enable CORS (Cross-Origin Resource Sharing) if your frontend
// and backend run on different origins (domains/ports) during development.
// Install first: npm install cors
// const cors = require('cors');
// app.use(cors()); // Allow all origins (adjust for production)

// --- API Routes ---

// Basic route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Fashion Boutique API!');
});

// GET endpoint to retrieve all products
// Example: GET http://localhost:3000/api/products
// Example with category filter: GET http://localhost:3000/api/products?category=dresses
app.get('/api/products', (req, res) => {
    const { category, tag } = req.query; // Get query parameters like ?category=dresses

    let filteredProducts = products;

    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category.toLowerCase());
    }

    if (tag) {
        filteredProducts = filteredProducts.filter(p => p.tags && p.tags.includes(tag.toLowerCase()));
    }

    res.json(filteredProducts); // Send the product data as JSON
});

// GET endpoint to retrieve a single product by its ID
// Example: GET http://localhost:3000/api/products/prod_001
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = products.find(p => p.id === productId);

    if (product) {
        res.json(product); // Send the found product as JSON
    } else {
        res.status(404).json({ message: 'Product not found' }); // Send a 404 error if not found
    }
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
