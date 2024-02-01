const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Route middleware
const employeeRoutes = require('./Employee/routes'); // Import employee routes
app.use('/api/employees', employeeRoutes); // Mount employee routes at /api/employees

// MongoDB connection
const URI = process.env.MongoDB_URL; // Using MongoDB_URL from .env file
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB is connected");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the application if MongoDB connection fails
});

const port = process.env.PORT || 8000; // Using PORT from .env file or defaulting to 8000
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
