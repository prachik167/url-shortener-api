// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const redis = require('redis');

// Initialize the app
const app = express();
app.use(bodyParser.json()); // Parse incoming request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/urlshortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Connect to Redis
const cache = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});
cache.connect()
    .then(() => console.log('Connected to Redis'))
    .catch(err => {
        console.error('Redis connection error:', err);
        process.exit(1); // Exit the application if Redis fails to connect
    });

// Export the cache client for use in other modules
module.exports.cache = cache;

// Rate Limiting for API requests
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
});
app.use('/api/', apiLimiter);

// Import routes
const shortenRoutes = require('./routes/shorten');
const redirectRoutes = require('./routes/redirect');
const analyticsRoutes = require('./routes/analytics');

// Set up routes
app.use('/api', shortenRoutes);     // URL Shortening routes
app.use('/', redirectRoutes);        // URL Redirection routes
app.use('/api/analytics', analyticsRoutes); // Analytics routes

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An error occurred', error: err.message });
});

// Define the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


